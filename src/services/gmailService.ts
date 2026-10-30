export interface GmailMessageSummary {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
}

export interface GmailMessageDetail extends GmailMessageSummary {
  body: string;
}

export const listGmailMessages = async (
  accessToken: string,
  query = 'label:INBOX',
  maxResults = 10
): Promise<GmailMessageSummary[]> => {
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}&maxResults=${maxResults}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch Gmail messages (${res.status})`);
  }

  const data = await res.json();
  if (!data.messages || !Array.isArray(data.messages)) {
    return [];
  }

  // Fetch headers for each message concurrently
  const messagePromises = data.messages.slice(0, maxResults).map(async (msg: { id: string; threadId: string }) => {
    try {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!msgRes.ok) return null;
      const msgData = await msgRes.json();
      
      const headers = msgData.payload?.headers || [];
      const subjectHeader = headers.find((h: any) => h.name.toLowerCase() === 'subject');
      const fromHeader = headers.find((h: any) => h.name.toLowerCase() === 'from');
      const dateHeader = headers.find((h: any) => h.name.toLowerCase() === 'date');

      return {
        id: msg.id,
        threadId: msg.threadId,
        subject: subjectHeader?.value || '(No Subject)',
        from: fromHeader?.value || '(Unknown Sender)',
        date: dateHeader?.value ? new Date(dateHeader.value).toLocaleDateString() : 'Recent',
        snippet: msgData.snippet || '',
      };
    } catch {
      return null;
    }
  });

  const results = await Promise.all(messagePromises);
  return results.filter((item): item is GmailMessageSummary => item !== null);
};

export const getGmailMessageDetail = async (
  accessToken: string,
  messageId: string
): Promise<GmailMessageDetail> => {
  const safeId = encodeURIComponent(messageId.trim());
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${safeId}?format=full`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to fetch email details');
  }

  const data = await res.json();
  const headers = data.payload?.headers || [];
  const subject = headers.find((h: any) => h.name.toLowerCase() === 'subject')?.value || '(No Subject)';
  const from = headers.find((h: any) => h.name.toLowerCase() === 'from')?.value || '(Unknown)';
  const date = headers.find((h: any) => h.name.toLowerCase() === 'date')?.value || '';

  // Extract body
  let body = data.snippet || '';
  if (data.payload?.parts && data.payload.parts.length > 0) {
    const textPart = data.payload.parts.find((p: any) => p.mimeType === 'text/plain');
    if (textPart?.body?.data) {
      try {
        body = decodeURIComponent(escape(atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'))));
      } catch {
        body = data.snippet || '';
      }
    }
  } else if (data.payload?.body?.data) {
    try {
      body = decodeURIComponent(escape(atob(data.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'))));
    } catch {
      body = data.snippet || '';
    }
  }

  return {
    id: data.id,
    threadId: data.threadId,
    subject,
    from,
    date: date ? new Date(date).toLocaleString() : '',
    snippet: data.snippet || '',
    body,
  };
};

export const sendGmailEmail = async (
  accessToken: string,
  to: string,
  subject: string,
  bodyText: string
): Promise<any> => {
  const emailLines = [
    `To: ${to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    bodyText,
  ];

  const rawMessage = emailLines.join('\r\n');
  const base64Encoded = btoa(unescape(encodeURIComponent(rawMessage)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: base64Encoded }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to send email (${res.status})`);
  }

  return await res.json();
};
