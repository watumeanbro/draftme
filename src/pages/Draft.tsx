import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { DocumentType, TIPS } from '@/lib/draft-types';

const Draft = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { draft, documentType } = (location.state || {}) as { draft: string; documentType: DocumentType };
  const [copied, setCopied] = useState(false);

  const tips = TIPS[documentType] || TIPS['personal-statement'];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!draft) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to form
        </button>

        {/* Draft + Tips side by side */}
        <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-300">
          {/* Draft */}
          <div className="flex-1 min-w-0 rounded-lg border border-border bg-card p-6 relative">
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <div className="font-serif-output text-foreground leading-relaxed whitespace-pre-wrap pr-20 text-[15px]">
              {draft}
            </div>
          </div>

          {/* Tips sidebar */}
          <div className="lg:w-64 shrink-0 space-y-5">
            <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase opacity-60">
              Tips to strengthen your application
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
