import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Download, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { DocumentType, Language } from '@/lib/draft-types';
import { translations } from '@/lib/translations';
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
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    const lineHeight = 7;
    const fontSize = 12;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fontSize);
    pdf.setTextColor(0, 0, 0);

    const lines = pdf.splitTextToSize(draft, maxWidth);
    let y = margin;

    for (let i = 0; i < lines.length; i++) {
      if (y + lineHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(lines[i], margin, y);
      y += lineHeight;
    }

    pdf.save('draft.pdf');
  };

  const handleDownloadImage = async () => {
    setDownloadOpen(false);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 60;
    const fontSize = 28;
    const lineHeight = 42;
    const maxWidth = 1000;

    ctx.font = `${fontSize}px Georgia, serif`;

    // Split by newlines first, then wrap each line
    const paragraphs = draft.split('\n');
    const finalLines: string[] = [];
    for (const para of paragraphs) {
      if (para.trim() === '') {
        finalLines.push('');
        continue;
      }
      const words = para.split(' ');
      let currentLine = '';
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (ctx.measureText(testLine).width > maxWidth) {
          if (currentLine) finalLines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) finalLines.push(currentLine);
    }

    const canvasWidth = maxWidth + padding * 2;
    const canvasHeight = finalLines.length * lineHeight + padding * 2;

    canvas.width = canvasWidth * 2;
    canvas.height = canvasHeight * 2;
    ctx.scale(2, 2);

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Black text
    ctx.fillStyle = '#000000';
    ctx.font = `${fontSize}px Georgia, serif`;
    ctx.textAlign = 'left';

    let y = padding + fontSize;
    for (const line of finalLines) {
      ctx.fillText(line, padding, y);
      y += lineHeight;
    }

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
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <BackArrow className="h-4 w-4" />
          {t.backToForm}
        </button>

        <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-300">
          <div className="flex-1 min-w-0 rounded-lg border border-border bg-card p-6">
            {/* Action buttons above text */}
            <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'justify-start' : 'justify-end'}`}>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t.copied : t.copy}
              </button>

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

            <div className="h-px bg-border mb-4" />

            <div
              ref={draftRef}
              className="font-serif-output text-foreground leading-relaxed whitespace-pre-wrap text-[15px]"
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