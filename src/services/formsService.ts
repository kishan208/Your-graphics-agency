export interface GoogleFormSummary {
  id: string;
  name: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
}

export interface GoogleFormResponse {
  responseId: string;
  createTime: string;
  lastSubmittedTime: string;
  respondentEmail?: string;
  answers?: Record<string, { questionId: string; textAnswers?: { answers: { value: string }[] } }>;
}

export const listGoogleForms = async (accessToken: string): Promise<GoogleFormSummary[]> => {
  const query = "mimeType='application/vnd.google-apps.form' and trashed=false";
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,createdTime,modifiedTime,webViewLink)&pageSize=20`;
  
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch Google Forms (${res.status})`);
  }

  const data = await res.json();
  return data.files || [];
};

export const getGoogleForm = async (accessToken: string, formId: string): Promise<any> => {
  const safeId = encodeURIComponent(formId.trim());
  const res = await fetch(`https://forms.googleapis.com/v1/forms/${safeId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to fetch form details');
  }

  return await res.json();
};

export const getGoogleFormResponses = async (
  accessToken: string,
  formId: string
): Promise<GoogleFormResponse[]> => {
  const safeId = encodeURIComponent(formId.trim());
  const res = await fetch(`https://forms.googleapis.com/v1/forms/${safeId}/responses`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to fetch form responses');
  }

  const data = await res.json();
  return data.responses || [];
};

export const createAgencyIntakeForm = async (
  accessToken: string,
  title = 'Your Graphics Agency (YGA) - Client Project Intake & Brief'
): Promise<any> => {
  // Step 1: Create empty form
  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      info: {
        title,
        documentTitle: title,
      },
    }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to initialize Google Form');
  }

  const newForm = await createRes.json();
  const formId = newForm.formId;

  // Step 2: Batch add standard agency intake questions
  const updatePayload = {
    requests: [
      {
        updateFormInfo: {
          info: {
            description:
              'Thank you for reaching out to Your Graphics Agency (YGA). Please complete this creative & production brief so our team can prepare an accurate strategy, timeline, and quote.',
          },
          updateMask: 'description',
        },
      },
      {
        createItem: {
          item: {
            title: 'Company / Brand Name',
            description: 'What is your organization or venture called?',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: false },
              },
            },
          },
          location: { index: 0 },
        },
      },
      {
        createItem: {
          item: {
            title: 'Primary Service Required',
            description: 'Select the primary marketing or creative discipline needed for your campaign.',
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: '01. Branding & Creative Design (Logo, Corporate, Retail, Signage)' },
                    { value: '02. Printing & Production (Offset, Large Format, Standees, Merchandise)' },
                    { value: '03. Offline Events & Activations (Launches, Mall Activations, Stalls)' },
                    { value: '04. Digital Marketing & Advertising (Meta Ads, Lead Gen, Reels)' },
                    { value: 'Complete 360 Marketing Package (All Services Under One Roof)' },
                  ],
                },
              },
            },
          },
          location: { index: 1 },
        },
      },
      {
        createItem: {
          item: {
            title: 'Target Completion Date or Event Timeline',
            description: 'When do you require delivery or event launch?',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: false },
              },
            },
          },
          location: { index: 2 },
        },
      },
      {
        createItem: {
          item: {
            title: 'Project Scope & Brief Overview',
            description: 'Share any details regarding quantities, size specs, visual preferences, or key milestones.',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: true },
              },
            },
          },
          location: { index: 3 },
        },
      },
    ],
  };

  const updateRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatePayload),
  });

  if (!updateRes.ok) {
    console.warn('Form created but questions update encountered a warning.');
  }

  // Fetch updated form to get responderUri (public link)
  const fullForm = await getGoogleForm(accessToken, formId);
  return fullForm;
};
