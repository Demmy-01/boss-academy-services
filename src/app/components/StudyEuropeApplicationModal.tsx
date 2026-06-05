import { useState, useRef, useEffect, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Upload,
  X,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  DollarSign,
  MapPin,
  Trash2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

/* ──────────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────────── */
interface DocumentField {
  id: string;
  label: string;
  description: string;
  file: File | null;
}

type Step = 1 | 2 | 3 | 'complete';

const WHATSAPP_NUMBER = '2347059461257';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'I just completed the study in europe application'
);

/* ──────────────────────────────────────────────────────────────────
   European countries
   ────────────────────────────────────────────────────────────────── */
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
  { name: 'Hungary', flag: '🇭🇺' },
  { name: 'Norway', flag: '🇳🇴' },
];

const BUDGET_OPTIONS = [
  { id: 'below-5k', label: 'Below €5,000', range: '< €5K' },
  { id: '5k-10k', label: '€5,000 – €10,000', range: '€5K–10K' },
  { id: '10k-20k', label: '€10,000 – €20,000', range: '€10K–20K' },
  { id: '20k-50k', label: '€20,000 – €50,000', range: '€20K–50K' },
  { id: 'above-50k', label: 'Above €50,000', range: '> €50K' },
];

/* ──────────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────────── */
export default function StudyEuropeApplicationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<Step>(1);
  const [documents, setDocuments] = useState<DocumentField[]>([
    { id: 'transcript', label: 'Transcript', description: 'Academic transcript from your institution', file: null },
    { id: 'certificate', label: 'Certificate', description: 'Your degree or diploma certificate', file: null },
    { id: 'cv', label: 'CV / Resume', description: 'Your up-to-date curriculum vitae', file: null },
    { id: 'waec', label: 'WAEC Certificate', description: 'West African Examinations Council result', file: null },
    { id: 'english', label: 'English Proficiency', description: 'IELTS, TOEFL, or equivalent certificate', file: null },
  ]);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [customCountry, setCustomCountry] = useState('');
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset on close
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setStep(1);
        setDocuments(prev => prev.map(d => ({ ...d, file: null })));
        setSelectedBudget(null);
        setSelectedCountry(null);
        setCustomCountry('');
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

  // Fire confetti on completion
  useEffect(() => {
    if (step === 'complete') {
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

      // Auto-redirect after 4s
      redirectTimerRef.current = setTimeout(() => {
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
          '_blank'
        );
      }, 4000);
    }
  }, [step]);

  /* ── File handling ─────────────────────────────────────────────── */
  const handleFileSelect = useCallback(
    (docId: string, file: File) => {
      setDocuments(prev =>
        prev.map(d => (d.id === docId ? { ...d, file } : d))
      );
    },
    []
  );

  const handleFileRemove = useCallback((docId: string) => {
    setDocuments(prev =>
      prev.map(d => (d.id === docId ? { ...d, file: null } : d))
    );
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
  const allDocsUploaded = documents.every(d => d.file !== null);
  const budgetSelected = selectedBudget !== null;
  const countrySelected =
    selectedCountry !== null ||
    (selectedCountry === '__custom' && customCountry.trim().length > 0) ||
    customCountry.trim().length > 0;
  const finalCountry =
    selectedCountry === '__custom' || (selectedCountry === null && customCountry.trim())
      ? customCountry.trim()
      : selectedCountry;

  /* ── Navigation ────────────────────────────────────────────────── */
  const goNext = () => {
    if (step === 1 && allDocsUploaded) setStep(2);
    else if (step === 2 && budgetSelected) setStep(3);
    else if (step === 3 && (selectedCountry || customCountry.trim())) setStep('complete');
  };

  const goBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
      '_blank'
    );
  };

  /* ── Helpers ───────────────────────────────────────────────────── */
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const stepLabels = ['Documents', 'Budget', 'Country'];

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

          {step !== 'complete' && (
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
                      Study in Europe Application
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
                      {step === 1 && 'Upload Your Documents'}
                      {step === 2 && 'Your Study Budget'}
                      {step === 3 && 'Choose Your Country'}
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
                      onMouseEnter={e =>
                        (e.currentTarget.style.background = 'rgba(13,17,23,0.1)')
                      }
                      onMouseLeave={e =>
                        (e.currentTarget.style.background = 'rgba(13,17,23,0.05)')
                      }
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-2">
                  {stepLabels.map((label, i) => {
                    const stepNum = (i + 1) as 1 | 2 | 3;
                    const isActive = step === stepNum;
                    const isCompleted =
                      typeof step === 'number' ? stepNum < step : true;
                    return (
                      <div key={label} className="flex items-center gap-2 flex-1">
                        <div className="flex items-center gap-1.5 flex-1">
                          <div
                            className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0"
                            style={{
                              background: isCompleted
                                ? '#e8400c'
                                : isActive
                                ? '#e8400c'
                                : 'rgba(13,17,23,0.06)',
                              color: isCompleted || isActive ? '#FAF8F4' : '#6B6760',
                              transition: 'all 0.3s',
                            }}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              stepNum
                            )}
                          </div>
                          <span
                            className="text-xs font-medium hidden sm:block"
                            style={{
                              color: isActive ? '#0D1117' : '#6B6760',
                              transition: 'color 0.3s',
                            }}
                          >
                            {label}
                          </span>
                        </div>
                        {i < 2 && (
                          <div
                            className="flex-1 h-px"
                            style={{
                              background: isCompleted
                                ? '#e8400c'
                                : 'rgba(13,17,23,0.1)',
                              transition: 'background 0.3s',
                              minWidth: '20px',
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
              padding: step === 'complete' ? '0' : '24px 28px',
            }}
          >
            {/* ═══ STEP 1: Documents ═══ */}
            {step === 1 && (
              <div className="space-y-3">
                <p
                  className="text-sm mb-4"
                  style={{ color: '#6B6760', fontWeight: 300, lineHeight: 1.6 }}
                >
                  Upload the following documents to begin your application. Accepted
                  formats: PDF, JPG, PNG (max 10MB each).
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
                          <FileText
                            className="w-5 h-5"
                            style={{ color: '#e8400c' }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-semibold truncate"
                            style={{ color: '#0D1117' }}
                          >
                            {doc.label}
                          </p>
                          <p
                            className="text-xs truncate"
                            style={{ color: '#6B6760' }}
                          >
                            {doc.file.name} •{' '}
                            {formatFileSize(doc.file.size)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <CheckCircle2
                            className="w-5 h-5"
                            style={{ color: '#16a34a' }}
                          />
                          <button
                            onClick={() => handleFileRemove(doc.id)}
                            className="p-1.5 rounded-md"
                            style={{
                              color: '#6B6760',
                              transition: 'color 0.15s, background 0.15s',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.color = '#dc2626';
                              e.currentTarget.style.background =
                                'rgba(220,38,38,0.06)';
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
                          <Upload
                            className="w-5 h-5"
                            style={{ color: '#6B6760' }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-semibold"
                            style={{ color: '#0D1117' }}
                          >
                            {doc.label}
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
                    {documents.filter(d => d.file).length} of{' '}
                    {documents.length} documents uploaded
                  </p>
                  <div className="flex gap-1">
                    {documents.map(d => (
                      <div
                        key={d.id}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: d.file
                            ? '#e8400c'
                            : 'rgba(13,17,23,0.1)',
                          transition: 'background 0.3s',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ STEP 2: Budget ═══ */}
            {step === 2 && (
              <div>
                <p
                  className="text-sm mb-5"
                  style={{ color: '#6B6760', fontWeight: 300, lineHeight: 1.6 }}
                >
                  How much do you have available for your study abroad? This helps
                  us recommend universities and countries that match your financial
                  plan.
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
                          background:
                            selectedBudget === opt.id
                              ? '#e8400c'
                              : 'rgba(13,17,23,0.04)',
                          transition: 'background 0.2s',
                        }}
                      >
                        <DollarSign
                          className="w-5 h-5"
                          style={{
                            color:
                              selectedBudget === opt.id
                                ? '#FAF8F4'
                                : '#6B6760',
                            transition: 'color 0.2s',
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-sm font-semibold"
                          style={{
                            color:
                              selectedBudget === opt.id
                                ? '#e8400c'
                                : '#0D1117',
                            transition: 'color 0.2s',
                          }}
                        >
                          {opt.label}
                        </p>
                      </div>
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor:
                            selectedBudget === opt.id
                              ? '#e8400c'
                              : 'rgba(13,17,23,0.15)',
                          transition: 'border-color 0.2s',
                        }}
                      >
                        {selectedBudget === opt.id && (
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: '#e8400c' }}
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ STEP 3: Country ═══ */}
            {step === 3 && (
              <div>
                <p
                  className="text-sm mb-5"
                  style={{ color: '#6B6760', fontWeight: 300, lineHeight: 1.6 }}
                >
                  Which European country would you like to study in? Select your
                  preferred destination below.
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
                          color:
                            selectedCountry === c.name
                              ? '#e8400c'
                              : '#0D1117',
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
                    border: `2px solid ${
                      selectedCountry === '__custom'
                        ? '#e8400c'
                        : 'rgba(13,17,23,0.08)'
                    }`,
                    background:
                      selectedCountry === '__custom'
                        ? 'rgba(232,64,12,0.03)'
                        : 'transparent',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                >
                  <MapPin
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: '#6B6760' }}
                  />
                  <input
                    type="text"
                    placeholder="Or type another European country..."
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
            {step === 'complete' && (
              <div
                className="flex flex-col items-center justify-center text-center"
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
                      background:
                        'linear-gradient(135deg, #e8400c 0%, #f97316 100%)',
                      animation: 'pulseGlow 2s ease infinite',
                    }}
                  >
                    <CheckCircle2
                      className="w-10 h-10"
                      style={{ color: '#FAF8F4' }}
                    />
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
                  Your Study in Europe application has been submitted
                  successfully. Continue on WhatsApp to speak with our
                  counselors.
                </p>
                <p
                  className="text-xs mb-8"
                  style={{ color: '#9a9590' }}
                >
                  Redirecting to WhatsApp in a moment...
                </p>

                {/* Summary pills */}
                <div
                  className="flex flex-wrap justify-center gap-2 mb-8"
                >
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full"
                    style={{
                      background: 'rgba(232,64,12,0.06)',
                      color: '#e8400c',
                    }}
                  >
                    <FileText className="w-3 h-3" /> {documents.filter(d => d.file).length} Docs
                  </span>
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
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full"
                    style={{
                      background: 'rgba(232,64,12,0.06)',
                      color: '#e8400c',
                    }}
                  >
                    <MapPin className="w-3 h-3" /> {finalCountry || '—'}
                  </span>
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="wa-btn inline-flex items-center gap-2.5 px-8 py-4 text-sm font-bold rounded-lg"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Continue on WhatsApp
                </button>

                <button
                  onClick={() => onOpenChange(false)}
                  className="mt-4 text-xs font-medium"
                  style={{ color: '#9a9590', transition: 'color 0.15s' }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.color = '#0D1117')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.color = '#9a9590')
                  }
                >
                  Close this window
                </button>
              </div>
            )}
          </div>

          {/* ── Footer nav (steps 1-3 only) ───────────────────────── */}
          {step !== 'complete' && (
            <div
              className="flex items-center justify-between gap-3"
              style={{
                padding: '16px 28px 20px',
                borderTop: '1px solid rgba(13,17,23,0.06)',
              }}
            >
              {step === 1 ? (
                <div />
              ) : (
                <button
                  className="modal-back-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
                  style={{ borderRadius: '8px' }}
                  onClick={goBack}
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}

              <button
                className="modal-next-btn inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold"
                style={{ borderRadius: '8px' }}
                disabled={
                  (step === 1 && !allDocsUploaded) ||
                  (step === 2 && !budgetSelected) ||
                  (step === 3 && !selectedCountry && !customCountry.trim())
                }
                onClick={goNext}
              >
                {step === 3 ? (
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
