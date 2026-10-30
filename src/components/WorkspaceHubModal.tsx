import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  FileText,
  Send,
  Plus,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  LogOut,
  User as UserIcon,
  Search,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { googleSignIn, googleLogout, getAccessToken } from '../services/googleAuth';
import {
  listGmailMessages,
  getGmailMessageDetail,
  sendGmailEmail,
  GmailMessageSummary,
  GmailMessageDetail,
} from '../services/gmailService';
import {
  listGoogleForms,
  getGoogleFormResponses,
  createAgencyIntakeForm,
  GoogleFormSummary,
  GoogleFormResponse,
} from '../services/formsService';

interface WorkspaceHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onAuthChange: (user: User | null, token: string | null) => void;
}

export const WorkspaceHubModal: React.FC<WorkspaceHubModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAuthChange,
}) => {
  const [activeTab, setActiveTab] = useState<'gmail' | 'forms'>('gmail');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Gmail states
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<GmailMessageDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  
  // Gmail Compose states
  const [showCompose, setShowCompose] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  
  // Mandatory confirmation dialog for sending emails (Workspace skill requirement)
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);

  // Forms states
  const [forms, setForms] = useState<GoogleFormSummary[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [formResponses, setFormResponses] = useState<GoogleFormResponse[]>([]);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [isCreatingForm, setIsCreatingForm] = useState(false);
  const [createdFormSuccess, setCreatedFormSuccess] = useState<any | null>(null);

  // Load data when opened and authenticated
  useEffect(() => {
    if (isOpen && currentUser) {
      if (activeTab === 'gmail') {
        loadGmailInbox();
      } else {
        loadFormsList();
      }
    }
  }, [isOpen, currentUser, activeTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !showSendConfirmation) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showSendConfirmation]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        onAuthChange(res.user, res.accessToken);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Google Sign-In was cancelled or failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await googleLogout();
    onAuthChange(null, null);
    setMessages([]);
    setSelectedMessage(null);
    setForms([]);
  };

  const loadGmailInbox = async () => {
    const token = await getAccessToken();
    if (!token) return;
    setLoadingData(true);
    setErrorMessage(null);
    try {
      const msgs = await listGmailMessages(token, 'label:INBOX', 12);
      setMessages(msgs);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load Gmail messages.');
    } finally {
      setLoadingData(false);
    }
  };

  const handleOpenMessage = async (msgId: string) => {
    const token = await getAccessToken();
    if (!token) return;
    setLoadingDetail(true);
    try {
      const detail = await getGmailMessageDetail(token, msgId);
      setSelectedMessage(detail);
    } catch (err: any) {
      setErrorMessage('Failed to read message details.');
    } finally {
      setLoadingDetail(false);
    }
  };

  // Step 1 of send: Trigger mandatory confirmation dialog
  const handleInitiateSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo || !composeSubject || !composeBody) return;
    setShowSendConfirmation(true);
  };

  // Step 2 of send: Explicit confirmation confirmed by user
  const handleConfirmSend = async () => {
    const token = await getAccessToken();
    if (!token) return;
    setIsSendingEmail(true);
    setErrorMessage(null);
    try {
      await sendGmailEmail(token, composeTo, composeSubject, composeBody);
      setEmailSentSuccess(true);
      setShowSendConfirmation(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      setTimeout(() => {
        setEmailSentSuccess(false);
        setShowCompose(false);
      }, 2000);
      loadGmailInbox();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send email through Gmail API.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const loadFormsList = async () => {
    const token = await getAccessToken();
    if (!token) return;
    setLoadingData(true);
    setErrorMessage(null);
    try {
      const list = await listGoogleForms(token);
      setForms(list);
      if (list.length > 0 && !selectedFormId) {
        handleSelectForm(list[0].id);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load Google Forms.');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSelectForm = async (formId: string) => {
    setSelectedFormId(formId);
    const token = await getAccessToken();
    if (!token) return;
    setLoadingResponses(true);
    try {
      const responses = await getGoogleFormResponses(token, formId);
      setFormResponses(responses);
    } catch (err: any) {
      console.warn('Could not load responses for form', err);
      setFormResponses([]);
    } finally {
      setLoadingResponses(false);
    }
  };

  const handleCreateNewIntakeForm = async () => {
    const token = await getAccessToken();
    if (!token) return;
    setIsCreatingForm(true);
    setErrorMessage(null);
    try {
      const created = await createAgencyIntakeForm(token);
      setCreatedFormSuccess(created);
      await loadFormsList();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create Google Form');
    } finally {
      setIsCreatingForm(false);
    }
  };

  const applyEmailTemplate = (templateType: 'proposal' | 'acknowledgment') => {
    if (templateType === 'proposal') {
      setComposeSubject('Your Graphics Agency (YGA) — Project Proposal & Commercial Estimate');
      setComposeBody(
        `Dear Client,\n\nThank you for reaching out to Your Graphics Agency (YGA).\n\nBased on our initial discussion, we have outlined the project scope and creative roadmap below:\n\n1. Scope of Work:\n- Creative Direction & Concept Development\n- Production & Printing Specifications\n- Delivery Schedule & Milestones\n\n2. Next Steps:\nPlease review the attached specifications. Once approved, we will initiate the creative sprint.\n\nWarm regards,\nYour Graphics Agency Team\nPhone: +91 9990742473\nWebsite: yourgraphicsagency.com`
      );
    } else {
      setComposeSubject('Thank you for contacting Your Graphics Agency (YGA)');
      setComposeBody(
        `Hello,\n\nWe have received your project inquiry and brief. Our creative director is currently reviewing your requirements.\n\nWe will get back to you within 12 business hours with an initial consultation time.\n\nBest regards,\nYour Graphics Agency (YGA)\nHelpline: +91 9990742473`
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                {activeTab === 'gmail' ? <Mail className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </span>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
                  Google Workspace Client Portal
                </h2>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Gmail Client Inquiries & Google Forms Intake Hub
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-4 h-4 text-neutral-500" />
                )}
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[140px]">
                  {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-1 text-neutral-400 hover:text-rose-500 transition-colors ml-1 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab selection */}
        {currentUser && (
          <div className="flex items-center justify-between px-6 pt-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('gmail');
                  setSelectedMessage(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'gmail'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Gmail Communications</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('forms');
                  setSelectedMessage(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'forms'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Google Forms & Responses</span>
              </button>
            </div>

            <div className="pb-2">
              <button
                onClick={activeTab === 'gmail' ? loadGmailInbox : loadFormsList}
                disabled={loadingData}
                className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 cursor-pointer disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-xs font-bold hover:underline cursor-pointer ml-2"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* If NOT Authenticated: Show Official Sign-in with Google Button */}
          {!currentUser ? (
            <div className="py-16 px-4 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                  Connect Google Workspace
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                  Sign in with your Google account to read client inquiries, send formatted quotations through Gmail, and view live Google Forms creative briefs.
                </p>
              </div>

              {/* Official Google Sign-In Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-semibold text-xs hover:bg-neutral-50 dark:hover:bg-neutral-750 shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
              >
                {/* Official Google SVG */}
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isLoggingIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
              </button>

              <div className="text-[11px] text-neutral-400">
                Access tokens are stored strictly in-memory during your session.
              </div>
            </div>
          ) : (
            /* If Authenticated: Show Portal Tabs */
            <div>
              {/* TAB 1: GMAIL HUB */}
              {activeTab === 'gmail' && (
                <div className="space-y-6">
                  {/* Actions Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                        Client Messages & Inquiry Threads
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Read inbound emails and send branded quotes directly through your Gmail account.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowCompose(!showCompose);
                        setSelectedMessage(null);
                      }}
                      className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showCompose ? 'Back to Inbox' : 'Compose Email / Quote'}</span>
                    </button>
                  </div>

                  {/* Compose View */}
                  {showCompose ? (
                    <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                          New Message via Gmail
                        </span>
                        
                        {/* Quick Template Fill Buttons */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-neutral-500 mr-1">Templates:</span>
                          <button
                            type="button"
                            onClick={() => applyEmailTemplate('proposal')}
                            className="px-2.5 py-1 text-[11px] font-semibold rounded bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                          >
                            + Proposal
                          </button>
                          <button
                            type="button"
                            onClick={() => applyEmailTemplate('acknowledgment')}
                            className="px-2.5 py-1 text-[11px] font-semibold rounded bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                          >
                            + Welcome
                          </button>
                        </div>
                      </div>

                      {emailSentSuccess && (
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Email successfully delivered through your Gmail account!</span>
                        </div>
                      )}

                      <form onSubmit={handleInitiateSend} className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                            Recipient Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={composeTo}
                            onChange={(e) => setComposeTo(e.target.value)}
                            placeholder="client@company.com"
                            className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                            Subject
                          </label>
                          <input
                            type="text"
                            required
                            value={composeSubject}
                            onChange={(e) => setComposeSubject(e.target.value)}
                            placeholder="Your Graphics Agency — Creative Proposal"
                            className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                            Message Body
                          </label>
                          <textarea
                            rows={8}
                            required
                            value={composeBody}
                            onChange={(e) => setComposeBody(e.target.value)}
                            placeholder="Draft your proposal, deliverable breakdown, or quote details..."
                            className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white resize-none"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setShowCompose(false)}
                            className="px-4 py-2 text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Review & Send Email</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    /* Inbox & Detail Split */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Message List (5 cols) */}
                      <div className="lg:col-span-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 overflow-hidden flex flex-col h-[420px]">
                        <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
                          <span>INBOX ({messages.length})</span>
                          {loadingData && <span className="text-[10px] text-blue-500 animate-pulse">Syncing...</span>}
                        </div>

                        <div className="flex-1 overflow-y-auto divide-y divide-neutral-200 dark:divide-neutral-800">
                          {messages.length === 0 && !loadingData ? (
                            <div className="p-6 text-center text-xs text-neutral-500">
                              No recent inbox messages found.
                            </div>
                          ) : (
                            messages.map((msg) => (
                              <button
                                key={msg.id}
                                onClick={() => handleOpenMessage(msg.id)}
                                className={`w-full p-3.5 text-left transition-colors cursor-pointer block ${
                                  selectedMessage?.id === msg.id
                                    ? 'bg-blue-50 dark:bg-blue-950/60'
                                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-900'
                                }`}
                              >
                                <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-0.5">
                                  <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[140px]">
                                    {msg.from.split('<')[0].replace(/"/g, '')}
                                  </span>
                                  <span className="font-mono text-[10px]">{msg.date}</span>
                                </div>
                                <div className="text-xs font-bold text-neutral-950 dark:text-white truncate">
                                  {msg.subject}
                                </div>
                                <div className="text-[11px] text-neutral-500 truncate mt-0.5">
                                  {msg.snippet}
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Message Reader (7 cols) */}
                      <div className="lg:col-span-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between h-[420px] overflow-y-auto">
                        {loadingDetail ? (
                          <div className="flex-1 flex items-center justify-center text-xs text-neutral-500">
                            Loading message details...
                          </div>
                        ) : selectedMessage ? (
                          <div className="space-y-4">
                            <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800 space-y-1">
                              <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                                {selectedMessage.subject}
                              </h4>
                              <div className="text-xs text-neutral-500 flex justify-between">
                                <span>From: {selectedMessage.from}</span>
                                <span className="font-mono">{selectedMessage.date}</span>
                              </div>
                            </div>

                            <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed font-sans">
                              {selectedMessage.body}
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-400 p-6 space-y-2">
                            <Mail className="w-8 h-8 stroke-1 text-neutral-300 dark:text-neutral-600" />
                            <p className="text-xs">Select any email on the left to read full client correspondence.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: GOOGLE FORMS HUB */}
              {activeTab === 'forms' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                        Client Intake & Brief Forms
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Generate branded client intake questionnaires and view live form responses.
                      </p>
                    </div>

                    <button
                      onClick={handleCreateNewIntakeForm}
                      disabled={isCreatingForm}
                      className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isCreatingForm ? 'Generating Form...' : 'Create YGA Intake Form'}</span>
                    </button>
                  </div>

                  {createdFormSuccess && (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Google Form Created Successfully!</span>
                      </div>
                      <p>
                        Your client intake form has been published to your Google Drive. Send the link to prospective clients:
                      </p>
                      <a
                        href={createdFormSuccess.responderUri || `https://docs.google.com/forms/d/${createdFormSuccess.formId}/viewform`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 underline"
                      >
                        <span>Open Public Client Form</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {/* Forms list & Responses */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Form selector (4 cols) */}
                    <div className="lg:col-span-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4 space-y-3 h-[380px] overflow-y-auto">
                      <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        Available Forms ({forms.length})
                      </div>
                      <div className="space-y-1.5">
                        {forms.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => handleSelectForm(f.id)}
                            className={`w-full p-3 rounded-xl text-left text-xs transition-colors cursor-pointer block border ${
                              selectedFormId === f.id
                                ? 'bg-white dark:bg-neutral-900 border-blue-500 shadow-xs text-blue-600 dark:text-blue-400 font-bold'
                                : 'bg-transparent border-transparent hover:bg-neutral-200/50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300'
                            }`}
                          >
                            <div className="truncate">{f.name}</div>
                            <div className="text-[10px] text-neutral-400 mt-0.5">
                              {f.modifiedTime ? new Date(f.modifiedTime).toLocaleDateString() : 'Form'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Responses viewer (8 cols) */}
                    <div className="lg:col-span-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 h-[380px] overflow-y-auto flex flex-col justify-between">
                      {loadingResponses ? (
                        <div className="flex-1 flex items-center justify-center text-xs text-neutral-500">
                          Fetching form submissions...
                        </div>
                      ) : formResponses.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                            <span className="text-xs font-bold text-neutral-950 dark:text-white">
                              Live Client Submissions ({formResponses.length})
                            </span>
                          </div>

                          <div className="space-y-3">
                            {formResponses.map((resp, idx) => (
                              <div
                                key={resp.responseId || idx}
                                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-2 text-xs"
                              >
                                <div className="flex items-center justify-between text-neutral-500 text-[11px]">
                                  <span>Respondent: {resp.respondentEmail || 'Anonymous Client'}</span>
                                  <span className="font-mono">
                                    {resp.lastSubmittedTime ? new Date(resp.lastSubmittedTime).toLocaleString() : ''}
                                  </span>
                                </div>

                                {resp.answers && (
                                  <div className="space-y-1 pt-1 border-t border-neutral-200/60 dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-300">
                                    {Object.entries(resp.answers).map(([key, val]: any) => (
                                      <div key={key}>
                                        <span className="font-semibold text-neutral-900 dark:text-white">
                                          Response:
                                        </span>{' '}
                                        {val.textAnswers?.answers?.[0]?.value || 'Submitted'}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-400 space-y-2">
                          <FileText className="w-8 h-8 stroke-1 text-neutral-300 dark:text-neutral-600" />
                          <p className="text-xs">No responses received yet for the selected form.</p>
                          <p className="text-[11px] text-neutral-500">Share your form link to collect client project briefs!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 flex items-center justify-between text-xs text-neutral-500">
          <span>Your Graphics Agency · Google Workspace Integration</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-semibold rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 cursor-pointer"
          >
            Close
          </button>
        </div>

        {/* MANDATORY CONFIRMATION DIALOG (Workspace skill requirement for sending emails) */}
        {showSendConfirmation && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm"
            onClick={() => setShowSendConfirmation(false)}
          >
            <div
              className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <Mail className="w-6 h-6" />
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                  Confirm Sending Email
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Are you sure you want to send this email from your connected Gmail account?
              </p>

              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs space-y-1">
                <div>
                  <span className="font-bold text-neutral-900 dark:text-white">To:</span> {composeTo}
                </div>
                <div>
                  <span className="font-bold text-neutral-900 dark:text-white">Subject:</span> {composeSubject}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSendConfirmation(false)}
                  disabled={isSendingEmail}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSend}
                  disabled={isSendingEmail}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSendingEmail ? 'Sending...' : 'Confirm & Send'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
