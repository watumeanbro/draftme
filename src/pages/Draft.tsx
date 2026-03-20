import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Download, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { DocumentType, Language } from '@/lib/draft-types';
import { translations } from '@/lib/translations';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Draft = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { draft, documentType, language = 'english' } = (location.state || {}) as {
    draft: string;
    documentType: DocumentType;
    language: Language;
  };
  const [copied, setCopied] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const draftRef = useRef<HTMLDivElement>(null);

  const t = translations[language];
  const tips = t.tips[documentType] || t.tips['personal-statement'];
  const isRTL = language === 'arabic';
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = async () => {
    setDownloadOpen(false);
    if (!draftRef.current) return;
    const canvas = await html2canvas(draftRef.current, { scale: 2, backgroundColor: '#1a1a1a' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('draft.pdf');
  };

  const handleDownloadImage = async () => {
    setDownloadOpen(false);
    if (!draftRef.current) return;
    const canvas = await html2canvas(draftRef.current, { scale: 2, backgroundColor: '#1a1a1a' });
    const link = document.createElement('a');
    link.download = 'draft.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!draft) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-4xl px-5 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <BackArrow className="h-4 w-4" />
          {t.backToForm}
        </button>

        {/* Draft + Tips side by side */}
        <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-300">
          {/* Draft */}
          <div className="flex-1 min-w-0 rounded-lg border border-border bg-card p-6 relative">
            {/* Action buttons */}
            <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex items-center gap-2`}>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t.copied : t.copy}
              </button>

              {/* Download dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDownloadOpen(!downloadOpen)}
                  className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <ChevronDown className="h-3 w-3" />
                </button>
                {downloadOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDownloadOpen(false)} />
                    <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-1 z-20 min-w-[140px] rounded-md border border-border bg-card shadow-lg`}>
                      <button
                        onClick={handleDownloadPdf}
                        className="w-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 text-start transition-colors"
                      >
                        {t.downloadPdf}
                      </button>
                      <button
                        onClick={handleDownloadImage}
                        className="w-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 text-start transition-colors"
                      >
                        {t.downloadImage}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div
              ref={draftRef}
              className={`font-serif-output text-foreground leading-relaxed whitespace-pre-wrap ${isRTL ? 'pl-24' : 'pr-24'} text-[15px]`}
            >
              {draft}
            </div>
          </div>

          {/* Tips sidebar */}
          <div className="lg:w-64 shrink-0 space-y-5">
            <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase opacity-60">
              {t.tipsHeading}
            </h2>
            <div className="h-px bg-border" />
            <div className="space-y-5">
              {tips.map((tip, i) => (
                <div key={i} className="space-y-1.5">
                  <h3 className="text-sm font-medium text-primary">{tip.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
