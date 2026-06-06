import { useState, useRef, useEffect, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Upload,
  X,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  DollarSign,
  MapPin,
  Trash2,
  User,
  Mail,
  Phone,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { addApplication } from '../utils/db';

/* ──────────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────────── */
interface DocumentField {
  id: string;
  label: string;
  description: string;
  file: File | null;
  optional?: boolean;
}

type StepType = 'contact' | 'documents' | 'budget' | 'country';

const WHATSAPP_NUMBER = '2347059461257';

/* ──────────────────────────────────────────────────────────────────
   Configuration Mapping for Services
   ────────────────────────────────────────────────────────────────── */
const BUDGET_OPTIONS = [
  { id: 'below-5k', label: 'Below €5,000', range: '< €5K' },
  { id: '5k-10k', label: '€5,000 – €10,000', range: '€5K–10K' },
  { id: '10k-20k', label: '€10,000 – €20,000', range: '€10K–20K' },
  { id: '20k-50k', label: '€20,000 – €50,000', range: '€20K–50K' },
  { id: 'above-50k', label: 'Above €50,000', range: '> €50K' },
];

const EUROPEAN_COUNTRIES = [
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Finland', flag: '🇫🇮' },
  { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Czech Republic', flag: '🇨🇿' },
  { name: 'Norway', flag: '🇳🇴' },
];

const SERVICES_CONFIG: Record<
  string,
  {
    title: string;
    documentFields: { id: string; label: string; description: string; optional?: boolean }[];
  }
> = {
  'study-europe': {
    title: 'Study in Europe',
    documentFields: [
      { id: 'transcript', label: 'Academic Transcript', description: 'Your university or high school transcripts' },
      { id: 'certificate', label: 'Degree Certificate', description: 'Your diploma or degree certificate' },
      { id: 'cv', label: 'CV / Resume', description: 'Your up-to-date professional curriculum vitae' },
      { id: 'waec', label: 'WAEC / O-Level result', description: 'West African Senior School Certificate result (if applicable)', optional: true },
      { id: 'english', label: 'English Exam', description: 'IELTS, TOEFL, or Duolingo certificate (if available)', optional: true },
    ],
  },
  'study-uk': {
    title: 'Study in UK',
    documentFields: [
      { id: 'transcript', label: 'Academic Transcript', description: 'Your university or high school transcripts' },
      { id: 'certificate', label: 'Degree Certificate', description: 'Your diploma or degree certificate' },
      { id: 'cv', label: 'CV / Resume', description: 'Your up-to-date professional curriculum vitae' },
      { id: 'waec', label: 'WAEC Result', description: 'WAEC Scratch card or result sheet', optional: true },
      { id: 'english', label: 'English Proficiency', description: 'IELTS Academic or school waiver letter', optional: true },
    ],
  },
  'study-canada': {
    title: 'Study in Canada',
    documentFields: [
      { id: 'transcript', label: 'Academic Transcript', description: 'Your university or high school transcripts' },
      { id: 'certificate', label: 'Degree Certificate', description: 'Your diploma or degree certificate' },
      { id: 'cv', label: 'CV / Resume', description: 'Your up-to-date professional curriculum vitae' },
      { id: 'waec', label: 'WAEC / High School Result', description: 'Secondary school examination results', optional: true },
    ],
  },
  'citizen-brazil': {
    title: 'Citizen by Birth Brazil',
    documentFields: [
      { id: 'birth_cert', label: 'Applicant Birth Certificate', description: 'Your official birth certificate' },
      { id: 'parent_id', label: "Parent's Brazilian ID/Passport", description: 'Identity document showing parent\'s Brazilian nationality' },
      { id: 'passport', label: 'Current Passport Data Page', description: 'Bio-data page of your current valid passport' },
    ],
  },
  'proof-of-funds': {
    title: 'Proof of Funds',
    documentFields: [
      { id: 'bank_statement', label: 'Bank Statement', description: 'Recent 3-6 months statement with sufficient balances' },
      { id: 'sponsor_letter', label: 'Sponsorship Letter', description: 'Letter from sponsor showing relationship and funding commitment', optional: true },
      { id: 'id_card', label: 'ID Card / Passport', description: 'Your government-issued identity card' },
    ],
  },
  'school-excursions': {
    title: 'Excursions & Tourism for Schools',
    documentFields: [
      { id: 'request_letter', label: 'School Request Letter', description: 'Official letter signed by school principal/proprietor' },
      { id: 'student_list', label: 'Participant List', description: 'List of traveling students and staff members' },
      { id: 'admin_id', label: 'Representative ID', description: 'National ID or Passport of the excursion leader' },
    ],
  },
  'travel-insurance': {
    title: 'Travel Insurance',
    documentFields: [
      { id: 'passport', label: 'Passport Bio Page', description: 'Biodata page of your international passport' },
      { id: 'itinerary', label: 'Flight Itinerary / Booking', description: 'Confirmed or draft flight reservation' },
    ],
  },
};

// Default configurations
const TRAVEL_SERVICES_DOCS = [
  { id: 'passport', label: 'Passport Bio Page', description: 'Biodata page of your international passport' },
  { id: 'photo', label: 'Passport Photograph', description: 'White background digital passport photograph' },
  { id: 'bank_statement', label: 'Bank Statement', description: 'Recent bank statement showing travel funds', optional: true },
];

const TUTORIAL_SERVICES_DOCS = [
  { id: 'id_card', label: 'ID Card / Passport', description: 'National identity card or international passport' },
  { id: 'diagnostic', label: 'Diagnostic / Past Results', description: 'Any previous exam result or diagnostic score sheet', optional: true },
];

const GENERAL_SERVICES_DOCS = [
  { id: 'id_card', label: 'ID Card / Passport', description: 'Your valid identification document' },
  { id: 'supporting_doc', label: 'Supporting Documents', description: 'Any relevant files supporting your service request', optional: true },
];

/* ──────────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────────── */
export default function ServiceApplicationModal({
  open,
  onOpenChange,
  serviceSlug,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceSlug: string;
}) {
  // Determine service configuration details
  const config = SERVICES_CONFIG[serviceSlug];
  const serviceTitle = config?.title ?? serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Determine dynamic documents required
  const getInitialDocs = useCallback((): DocumentField[] => {
    let fields = config?.documentFields;
    if (!fields) {
      if (serviceSlug.startsWith('visit-') || serviceSlug === 'group-trip-kigali') {
        fields = TRAVEL_SERVICES_DOCS;
      } else if (
        ['ielts', 'celpip-tutorial', 'french-language', 'chinese-language', 'pre-tutorial'].includes(serviceSlug)
      ) {
        fields = TUTORIAL_SERVICES_DOCS;
      } else {
        fields = GENERAL_SERVICES_DOCS;
      }
    }
    return fields.map(f => ({ ...f, file: null }));
  }, [config, serviceSlug]);

  // Determine dynamic steps
  const showBudget = serviceSlug.startsWith('study-');
  const showCountry =
    serviceSlug.startsWith('study-') ||
    serviceSlug.startsWith('visit-') ||
    ['proof-of-funds', 'travel-insurance'].includes(serviceSlug);

  const steps: StepType[] = ['contact', 'documents'];
  if (showBudget) steps.push('budget');
  if (showCountry) steps.push('country');

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const currentStep = steps[currentStepIdx];

  // Contact Info states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Documents state
  const [documents, setDocuments] = useState<DocumentField[]>([]);

  // Budget/Country states
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [customCountry, setCustomCountry] = useState('');

  // App states
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize documents when modal opens or slug changes
  useEffect(() => {
    if (open) {
      setDocuments(getInitialDocs());
    }
  }, [open, getInitialDocs]);

  // Reset state on close
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setCurrentStepIdx(0);
        setName('');
        setEmail('');
        setPhone('');
        setDocuments([]);
        setSelectedBudget(null);
        setSelectedCountry(null);
        setCustomCountry('');
        setIsComplete(false);
        setIsSubmitting(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Cleanup redirect timer
  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, []);

  // Fire confetti and handle redirect on completion
  useEffect(() => {
    if (isComplete) {
      const duration = 2500;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#e8400c', '#f97316', '#FAF8F4', '#0D1117'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#e8400c', '#f97316', '#FAF8F4', '#0D1117'],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();

      // Auto-redirect to WhatsApp after 4.5s
      // We skip auto-redirect for 'study-europe' to make the dedicated modal popup more interactive and prevent browser popup blocking
      if (serviceSlug !== 'study-europe') {
        redirectTimerRef.current = setTimeout(() => {
          handleWhatsApp();
        }, 4500);
      }
    }
  }, [isComplete, serviceSlug]);

  /* ── File handling ─────────────────────────────────────────────── */
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileSelect = useCallback((docId: string, file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      alert(`"${file.name}" is too large. Maximum file size is 5MB. Please compress or choose a smaller file.`);
      return;
    }
    setDocuments(prev => prev.map(d => (d.id === docId ? { ...d, file } : d)));
  }, []);

  const handleFileRemove = useCallback((docId: string) => {
    setDocuments(prev => prev.map(d => (d.id === docId ? { ...d, file: null } : d)));
  }, []);

  const handleDrop = useCallback(
    (docId: string, e: React.DragEvent) => {
      e.preventDefault();
      setDragOverId(null);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFileSelect(docId, file);
    },
    [handleFileSelect]
  );

  /* ── Validation ────────────────────────────────────────────────── */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isContactValid = name.trim().length > 1 && emailRegex.test(email) && phone.trim().length > 6;

  const areDocsValid = documents.every(d => d.optional || d.file !== null);

  const budgetSelected = selectedBudget !== null;

  const finalCountry =
    selectedCountry === '__custom' || (selectedCountry === null && customCountry.trim())
      ? customCountry.trim()
      : selectedCountry;
  const countrySelected = showCountry ? (finalCountry !== null && finalCountry.length > 0) : true;

  const isStepValid = () => {
    if (currentStep === 'contact') return isContactValid;
    if (currentStep === 'documents') return areDocsValid;
    if (currentStep === 'budget') return budgetSelected;
    if (currentStep === 'country') return countrySelected;
    return false;
  };

  /* ── Navigation & Submission ───────────────────────────────────── */
  const goNext = async () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      // Final step submit application
      await handleSubmit();
    }
  };

  const goBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Gather files
      const filesToSave = documents
        .filter(d => d.file !== null)
        .map(d => ({
          name: d.file!.name,
          type: d.file!.type,
          size: d.file!.size,
          data: d.file!,
        }));

      // Save to IndexedDB
      await addApplication({
        name,
        email,
        phone,
        serviceSlug,
        serviceTitle,
        budget: showBudget ? (BUDGET_OPTIONS.find(b => b.id === selectedBudget)?.range ?? null) : null,
        country: showCountry ? finalCountry : null,
        files: filesToSave,
      });

      setIsComplete(true);
    } catch (err) {
      console.error('Failed to submit application:', err);
      alert('An error occurred while saving your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello Boss Academy, my name is ${name}. I just submitted my application for "${serviceTitle}" on the website. Please review it!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  /* ── Helpers ───────────────────────────────────────────────────── */
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Human-readable titles for steps
  const getStepTitle = () => {
    if (currentStep === 'contact') return 'Your Contact Details';
    if (currentStep === 'documents') return 'Upload Required Documents';
    if (currentStep === 'budget') return 'Your Estimated Budget';
    if (currentStep === 'country') return 'Choose Target Country';
    return '';
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay
          className="fixed inset-0 z-[9998]"
          style={{
            background: 'rgba(13,17,23,0.72)',
            backdropFilter: 'blur(6px)',
            animation: 'overlayFadeIn 0.25s ease',
          }}
        />

        {/* Content */}
        <Dialog.Content
          className="fixed z-[9999] flex flex-col"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(94vw, 640px)',
            maxHeight: '90vh',
            background: '#FAF8F4',
            borderRadius: '12px',
            boxShadow: '0 24px 80px rgba(13,17,23,0.3), 0 0 0 1px rgba(13,17,23,0.06)',
            animation: 'modalSlideIn 0.35s cubic-bezier(0.16,1,0.3,1)',
            overflow: 'hidden',
          }}
          onOpenAutoFocus={e => e.preventDefault()}
        >
          <style>{`
            @keyframes overlayFadeIn {
              from { opacity: 0; } to { opacity: 1; }
            }
            @keyframes modalSlideIn {
              from { opacity: 0; transform: translate(-50%, -46%) scale(0.97); }
              to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes checkPop {
              0% { transform: scale(0); opacity: 0; }
              60% { transform: scale(1.2); }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes pulseGlow {
              0%, 100% { box-shadow: 0 0 0 0 rgba(232,64,12,0.25); }
              50% { box-shadow: 0 0 0 14px rgba(232,64,12,0); }
            }
            @keyframes pulseWaGlow {
              0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
              50% { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
            }
            .wa-btn-pulse {
              animation: pulseWaGlow 2s infinite;
            }
            .input-group {
              position: relative;
              background: #fff;
              border: 2px solid rgba(13,17,23,0.08);
              border-radius: 8px;
              transition: all 0.25s ease;
            }
            .input-group:focus-within {
              border-color: #e8400c;
              box-shadow: 0 0 0 4px rgba(232,64,12,0.1);
            }
            .upload-zone {
              border: 2px dashed rgba(13,17,23,0.15);
              transition: border-color 0.2s, background 0.2s;
              cursor: pointer;
            }
            .upload-zone:hover, .upload-zone.drag-over {
              border-color: #e8400c;
              background: rgba(232,64,12,0.03);
            }
            .upload-zone.has-file {
              border: 2px solid rgba(232,64,12,0.25);
              background: rgba(232,64,12,0.03);
              cursor: default;
            }
            .budget-card {
              border: 2px solid rgba(13,17,23,0.08);
              transition: all 0.2s;
              cursor: pointer;
            }
            .budget-card:hover {
              border-color: rgba(232,64,12,0.4);
              background: rgba(232,64,12,0.03);
            }
            .budget-card.selected {
              border-color: #e8400c;
              background: rgba(232,64,12,0.06);
            }
            .country-card {
              border: 2px solid rgba(13,17,23,0.08);
              transition: all 0.2s;
              cursor: pointer;
            }
            .country-card:hover {
              border-color: rgba(232,64,12,0.4);
              background: rgba(232,64,12,0.03);
            }
            .country-card.selected {
              border-color: #e8400c;
              background: rgba(232,64,12,0.06);
            }
            .modal-next-btn {
              background: #e8400c;
              color: #FAF8F4;
              border: none;
              transition: background 0.2s, opacity 0.2s, transform 0.15s;
            }
            .modal-next-btn:not(:disabled):hover {
              background: #d03a0a;
              transform: translateY(-1px);
            }
            .modal-next-btn:disabled {
              opacity: 0.35;
              cursor: not-allowed;
            }
            .modal-back-btn {
              background: transparent;
              color: #6B6760;
              border: 2px solid rgba(13,17,23,0.1);
              transition: all 0.2s;
            }
            .modal-back-btn:hover {
              border-color: rgba(13,17,23,0.25);
              color: #0D1117;
            }
            .wa-btn {
              background: #25D366;
              color: #fff;
              border: none;
              transition: background 0.2s, transform 0.15s;
            }
            .wa-btn:hover {
              background: #1fb855;
              transform: translateY(-1px);
            }
          `}</style>

          {!isComplete && (
            <>
              {/* ── Header ──────────────────────────────────────────── */}
              <div
                style={{
                  padding: '24px 28px 20px',
                  borderBottom: '1px solid rgba(13,17,23,0.06)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: '#e8400c', fontWeight: 600 }}
                    >
                      {serviceTitle} Application
                    </p>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: '#0D1117',
                        lineHeight: 1.2,
                      }}
                    >
                      {getStepTitle()}
                    </h2>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      className="flex items-center justify-center w-9 h-9 rounded-full"
                      style={{
                        background: 'rgba(13,17,23,0.05)',
                        color: '#6B6760',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(13,17,23,0.1)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(13,17,23,0.05)')}
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Dynamic Step indicator */}
                <div className="flex items-center gap-2">
                  {steps.map((stepName, i) => {
                    const isActive = currentStepIdx === i;
                    const isCompleted = currentStepIdx > i;
                    return (
                      <div key={stepName} className="flex items-center gap-2 flex-1">
                        <div className="flex items-center gap-1.5 flex-1">
                          <div
                            className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0"
                            style={{
                              background: isCompleted || isActive ? '#e8400c' : 'rgba(13,17,23,0.06)',
                              color: isCompleted || isActive ? '#FAF8F4' : '#6B6760',
                              transition: 'all 0.3s',
                            }}
                          >
                            {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                          </div>
                          <span
                            className="text-xs font-medium capitalize hidden sm:block truncate"
                            style={{
                              color: isActive ? '#0D1117' : '#6B6760',
                              transition: 'color 0.3s',
                            }}
                          >
                            {stepName === 'contact' ? 'Contact' : stepName}
                          </span>
                        </div>
                        {i < steps.length - 1 && (
                          <div
                            className="flex-1 h-px"
                            style={{
                              background: isCompleted ? '#e8400c' : 'rgba(13,17,23,0.1)',
                              transition: 'background 0.3s',
                              minWidth: '15px',
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ── Body (scrollable) ─────────────────────────────────── */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: isComplete ? '0' : '24px 28px',
            }}
          >
            {/* ═══ STEP: Contact Info ═══ */}
            {currentStep === 'contact' && (
              <div className="space-y-4">
                <p className="text-sm mb-4" style={{ color: '#6B6760', fontWeight: 300, lineHeight: 1.6 }}>
                  Please enter your contact details. This allows us to review your files and get in touch with you.
                </p>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-foreground/80">
                    Full Name
                  </label>
                  <div className="input-group flex items-center px-3 py-3">
                    <User className="w-4 h-4 mr-3 text-muted-foreground" />
                    <input
                      type="text"
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 text-foreground"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-foreground/80">
                    Email Address
                  </label>
                  <div className="input-group flex items-center px-3 py-3">
                    <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                    <input
                      type="email"
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 text-foreground"
                      placeholder="e.g. john@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-foreground/80">
                    Phone Number (WhatsApp)
                  </label>
                  <div className="input-group flex items-center px-3 py-3">
                    <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
                    <input
                      type="tel"
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 text-foreground"
                      placeholder="e.g. +234 803 123 4567"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ═══ STEP: Documents ═══ */}
            {currentStep === 'documents' && (
              <div className="space-y-3">
                <p className="text-sm mb-4" style={{ color: '#6B6760', fontWeight: 300, lineHeight: 1.6 }}>
                  Upload the following documents. Accepted formats: PDF, JPG, PNG, DOC (max <strong>5MB</strong> each).
                </p>
                {documents.map(doc => (
                  <div key={doc.id}>
                    {doc.file ? (
                      /* File uploaded state */
                      <div
                        className="upload-zone has-file flex items-center gap-3 px-4 py-3"
                        style={{ borderRadius: '8px' }}
                      >
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                          style={{ background: 'rgba(232,64,12,0.08)' }}
                        >
                          <FileText className="w-5 h-5" style={{ color: '#e8400c' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: '#0D1117' }}>
                            {doc.label}
                          </p>
                          <p className="text-xs truncate" style={{ color: '#6B6760' }}>
                            {doc.file.name} • {formatFileSize(doc.file.size)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5" style={{ color: '#16a34a' }} />
                          <button
                            onClick={() => handleFileRemove(doc.id)}
                            className="p-1.5 rounded-md"
                            style={{
                              color: '#6B6760',
                              transition: 'color 0.15s, background 0.15s',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.color = '#dc2626';
                              e.currentTarget.style.background = 'rgba(220,38,38,0.06)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.color = '#6B6760';
                              e.currentTarget.style.background = 'transparent';
                            }}
                            aria-label={`Remove ${doc.label}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Upload zone */
                      <label
                        className={`upload-zone flex items-center gap-3 px-4 py-3 ${
                          dragOverId === doc.id ? 'drag-over' : ''
                        }`}
                        style={{ borderRadius: '8px', display: 'flex' }}
                        onDragOver={e => {
                          e.preventDefault();
                          setDragOverId(doc.id);
                        }}
                        onDragLeave={() => setDragOverId(null)}
                        onDrop={e => handleDrop(doc.id, e)}
                      >
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                          style={{ background: 'rgba(13,17,23,0.04)' }}
                        >
                          <Upload className="w-5 h-5" style={{ color: '#6B6760' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold" style={{ color: '#0D1117' }}>
                            {doc.label} {doc.optional && <span className="text-xs text-muted-foreground/75 font-normal">(Optional)</span>}
                          </p>
                          <p className="text-xs" style={{ color: '#9a9590' }}>
                            {doc.description}
                          </p>
                        </div>
                        <span
                          className="text-xs font-medium flex-shrink-0 px-3 py-1.5 rounded-md"
                          style={{
                            color: '#e8400c',
                            background: 'rgba(232,64,12,0.06)',
                          }}
                        >
                          Browse
                        </span>
                        <input
                          type="file"
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(doc.id, file);
                            e.target.value = '';
                          }}
                        />
                      </label>
                    )}
                  </div>
                ))}

                {/* Upload progress summary */}
                <div
                  className="flex items-center justify-between mt-2 pt-3"
                  style={{ borderTop: '1px solid rgba(13,17,23,0.06)' }}
                >
                  <p className="text-xs" style={{ color: '#6B6760' }}>
                    {documents.filter(d => d.file).length} of {documents.length} files uploaded
                  </p>
                  <div className="flex gap-1">
                    {documents.map(d => (
                      <div
                        key={d.id}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: d.file ? '#e8400c' : d.optional ? 'rgba(13,17,23,0.08)' : 'rgba(232,64,12,0.25)',
                          transition: 'background 0.3s',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ STEP: Budget ═══ */}
            {currentStep === 'budget' && (
              <div>
                <p className="text-sm mb-5" style={{ color: '#6B6760', fontWeight: 300, lineHeight: 1.6 }}>
                  How much do you have available for your study abroad? This helps us recommend matching options.
                </p>
                <div className="space-y-2.5">
                  {BUDGET_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      className={`budget-card w-full flex items-center gap-4 px-4 py-4 text-left ${
                        selectedBudget === opt.id ? 'selected' : ''
                      }`}
                      style={{ borderRadius: '10px' }}
                      onClick={() => setSelectedBudget(opt.id)}
                    >
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                        style={{
                          background: selectedBudget === opt.id ? '#e8400c' : 'rgba(13,17,23,0.04)',
                          transition: 'background 0.2s',
                        }}
                      >
                        <DollarSign
                          className="w-5 h-5"
                          style={{
                            color: selectedBudget === opt.id ? '#FAF8F4' : '#6B6760',
                            transition: 'color 0.2s',
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-sm font-semibold"
                          style={{
                            color: selectedBudget === opt.id ? '#e8400c' : '#0D1117',
                            transition: 'color 0.2s',
                          }}
                        >
                          {opt.label}
                        </p>
                      </div>
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: selectedBudget === opt.id ? '#e8400c' : 'rgba(13,17,23,0.15)',
                          transition: 'border-color 0.2s',
                        }}
                      >
                        {selectedBudget === opt.id && (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#e8400c' }} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ STEP: Country ═══ */}
            {currentStep === 'country' && (
              <div>
                <p className="text-sm mb-5" style={{ color: '#6B6760', fontWeight: 300, lineHeight: 1.6 }}>
                  Which country is your target destination? Select your preferred destination below.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                  {EUROPEAN_COUNTRIES.map(c => (
                    <button
                      key={c.name}
                      className={`country-card flex items-center gap-2.5 px-3 py-3 text-left ${
                        selectedCountry === c.name ? 'selected' : ''
                      }`}
                      style={{ borderRadius: '10px' }}
                      onClick={() => {
                        setSelectedCountry(c.name);
                        setCustomCountry('');
                      }}
                    >
                      <span className="text-xl leading-none">{c.flag}</span>
                      <span
                        className="text-sm font-medium truncate"
                        style={{
                          color: selectedCountry === c.name ? '#e8400c' : '#0D1117',
                          transition: 'color 0.2s',
                        }}
                      >
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom input */}
                <div
                  className="flex items-center gap-3 px-4 py-3"
                  style={{
                    borderRadius: '10px',
                    border: `2px solid ${selectedCountry === '__custom' ? '#e8400c' : 'rgba(13,17,23,0.08)'}`,
                    background: selectedCountry === '__custom' ? 'rgba(232,64,12,0.03)' : 'transparent',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#6B6760' }} />
                  <input
                    type="text"
                    placeholder="Or type another target country..."
                    value={customCountry}
                    onChange={e => {
                      setCustomCountry(e.target.value);
                      if (e.target.value.trim()) {
                        setSelectedCountry('__custom');
                      } else {
                        setSelectedCountry(null);
                      }
                    }}
                    onFocus={() => {
                      if (customCountry.trim()) setSelectedCountry('__custom');
                    }}
                    className="flex-1 text-sm bg-transparent outline-none"
                    style={{
                      color: '#0D1117',
                      fontWeight: 400,
                    }}
                  />
                </div>
              </div>
            )}

            {/* ═══ COMPLETE ═══ */}
            {isComplete && (
              <div className="flex flex-col items-center animate-fadeUp overflow-hidden w-full">
                {serviceSlug === 'study-europe' ? (
                  /* Custom Gorgeous WhatsApp Modal Popup for Study in Europe */
                  <div className="w-full flex flex-col items-center">
                    <div
                      className="w-full py-7 px-6 flex flex-col items-center justify-center text-center relative"
                      style={{
                        background: 'linear-gradient(135deg, #128c7e 0%, #075e54 100%)',
                        borderTopLeftRadius: '12px',
                        borderTopRightRadius: '12px',
                      }}
                    >
                      {/* Floating pattern effect */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)',
                          backgroundSize: '16px 16px',
                        }}
                      />
                      
                      {/* Glowing, pulsing WhatsApp Icon Container */}
                      <div
                        className="flex items-center justify-center w-16 h-16 rounded-full bg-white mb-3 shadow-lg relative z-10"
                        style={{
                          animation: 'pulseWaGlow 2s infinite',
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="#25D366" className="w-10 h-10">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 z-10"
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          color: '#fff',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                        }}
                      >
                        Application Saved
                      </span>
                      
                      <h2
                        className="z-10"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '1.6rem',
                          fontWeight: 800,
                          color: '#FAF8F4',
                          lineHeight: 1.2,
                        }}
                      >
                        Action Required: Continue to WhatsApp
                      </h2>
                    </div>

                    <div className="w-full px-8 pt-6 pb-8 flex flex-col items-center">
                      <p
                        className="text-sm text-center mb-6"
                        style={{
                          color: '#6B6760',
                          lineHeight: 1.6,
                          maxWidth: '460px',
                        }}
                      >
                        We have successfully saved your Study in Europe application. To{' '}
                        <strong style={{ color: '#0D1117', fontWeight: 700 }}>verify your documents</strong>{' '}
                        and assign you to an admissions counselor,{' '}
                        <span className="font-bold" style={{ color: '#128c7e' }}>you must continue to WhatsApp</span>.
                      </p>

                      {/* Summary Card */}
                      <div
                        className="w-full p-4 mb-6 rounded-lg text-left"
                        style={{
                          background: '#fff',
                          border: '1.5px solid rgba(18, 140, 126, 0.15)',
                          boxShadow: '0 4px 12px rgba(18, 140, 126, 0.04)',
                        }}
                      >
                        <div className="flex items-center justify-between border-b pb-2.5 mb-3" style={{ borderColor: 'rgba(18, 140, 126, 0.08)' }}>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#075e54]">
                            Application Summary
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Submitted
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                          <div>
                            <span className="text-gray-400 block mb-0.5">Applicant Name</span>
                            <span className="font-semibold text-gray-800">{name}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block mb-0.5">Chosen Service</span>
                            <span className="font-semibold text-gray-800">{serviceTitle}</span>
                          </div>
                          {showCountry && (
                            <div>
                              <span className="text-gray-400 block mb-0.5">Target Country</span>
                              <span className="font-semibold text-gray-800">{finalCountry || '—'}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-400 block mb-0.5">Documents Uploaded</span>
                            <span className="font-semibold text-[#128c7e] flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5" /> {documents.filter(d => d.file).length} files
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Simple, clean instruction steps */}
                      <div className="w-full flex flex-col gap-2.5 mb-7">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: '#128c7e' }}>
                            1
                          </div>
                          <p className="text-xs text-gray-600 leading-normal">
                            Click the pulsing green button below to open WhatsApp.
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: '#128c7e' }}>
                            2
                          </div>
                          <p className="text-xs text-gray-600 leading-normal">
                            Send the pre-filled message that is generated for you.
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: '#128c7e' }}>
                            3
                          </div>
                          <p className="text-xs text-gray-600 leading-normal">
                            Our counselor will verify your transcripts & start processing your admission.
                          </p>
                        </div>
                      </div>

                      {/* Large pulsing green button */}
                      <button
                        onClick={handleWhatsApp}
                        className="wa-btn wa-btn-pulse w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold rounded-xl cursor-pointer shadow-md text-white transition-all"
                        style={{
                          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-bounce">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Continue to WhatsApp Chat
                      </button>

                      <button
                        onClick={() => onOpenChange(false)}
                        className="mt-5 text-xs font-semibold cursor-pointer py-1.5 px-3 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
                      >
                        Close window
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Standard Completion Screen for Other Services */
                  <div
                    className="flex flex-col items-center justify-center text-center animate-fadeUp"
                    style={{ padding: '56px 28px 48px' }}
                  >
                    {/* Animated check circle */}
                    <div
                      className="relative mb-6"
                      style={{
                        animation: 'checkPop 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
                      }}
                    >
                      <div
                        className="flex items-center justify-center w-20 h-20 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #e8400c 0%, #f97316 100%)',
                          animation: 'pulseGlow 2s ease infinite',
                        }}
                      >
                        <CheckCircle2 className="w-10 h-10" style={{ color: '#FAF8F4' }} />
                      </div>
                    </div>

                    <h2
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: '#0D1117',
                        lineHeight: 1.2,
                        marginBottom: '12px',
                      }}
                    >
                      Application Complete!
                    </h2>
                    <p
                      className="text-sm mb-2"
                      style={{
                        color: '#6B6760',
                        fontWeight: 300,
                        lineHeight: 1.6,
                        maxWidth: '360px',
                      }}
                    >
                      Your application for {serviceTitle} has been submitted successfully. Connect with us on WhatsApp to speak with our counselors.
                    </p>
                    <p className="text-xs mb-8" style={{ color: '#9a9590' }}>
                      Redirecting to WhatsApp in a moment...
                    </p>

                    {/* Summary pills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full"
                        style={{
                          background: 'rgba(232,64,12,0.06)',
                          color: '#e8400c',
                        }}
                      >
                        <FileText className="w-3 h-3" /> {documents.filter(d => d.file).length} Docs
                      </span>
                      {showBudget && (
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full"
                          style={{
                            background: 'rgba(232,64,12,0.06)',
                            color: '#e8400c',
                          }}
                        >
                          <DollarSign className="w-3 h-3" />{' '}
                          {BUDGET_OPTIONS.find(b => b.id === selectedBudget)?.range ?? '—'}
                        </span>
                      )}
                      {showCountry && (
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full"
                          style={{
                            background: 'rgba(232,64,12,0.06)',
                            color: '#e8400c',
                          }}
                        >
                          <MapPin className="w-3 h-3" /> {finalCountry || '—'}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleWhatsApp}
                      className="wa-btn inline-flex items-center gap-2.5 px-8 py-4 text-sm font-bold rounded-lg cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Connect on WhatsApp
                    </button>

                    <button
                      onClick={() => onOpenChange(false)}
                      className="mt-4 text-xs font-medium cursor-pointer"
                      style={{ color: '#9a9590', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#0D1117')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#9a9590')}
                    >
                      Close window
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Footer nav (steps 1 to final only) ───────────────────────── */}
          {!isComplete && (
            <div
              className="flex items-center justify-between gap-3"
              style={{
                padding: '16px 28px 20px',
                borderTop: '1px solid rgba(13,17,23,0.06)',
              }}
            >
              {currentStepIdx === 0 ? (
                <div />
              ) : (
                <button
                  className="modal-back-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold cursor-pointer"
                  style={{ borderRadius: '8px' }}
                  onClick={goBack}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}

              <button
                className="modal-next-btn inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold cursor-pointer"
                style={{ borderRadius: '8px' }}
                disabled={!isStepValid() || isSubmitting}
                onClick={goNext}
              >
                {isSubmitting ? (
                  <>
                    Submitting... <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : currentStepIdx === steps.length - 1 ? (
                  <>
                    Submit Application <Sparkles className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
