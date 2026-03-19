import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DraftFormData, DocumentType, DOCUMENT_TYPE_LABELS } from '@/lib/draft-types';
import { supabase } from '@/integrations/supabase/client';
import { FileText } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState<DraftFormData>({
    name: '',
    documentType: 'personal-statement',
    university: '',
    background: '',
    achievement: '',
    motivation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const updateField = <K extends keyof DraftFormData>(key: K, value: DraftFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setDraft('');

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-draft', {
        body: formData,
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);
      setDraft(data.draft);
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = formData.name && formData.university && formData.background && formData.achievement && formData.motivation;
  const tips = TIPS[formData.documentType];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2.5 mb-3">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">DraftMe</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Generate a first draft for your application in seconds.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Your name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => updateField('name', e.target.value)}
              placeholder="e.g. Maria Gonzalez"
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Document Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Document type</label>
            <select
              value={formData.documentType}
              onChange={e => updateField('documentType', e.target.value as DocumentType)}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
            >
              {Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* University */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">University or program</label>
            <input
              type="text"
              value={formData.university}
              onChange={e => updateField('university', e.target.value)}
              placeholder="e.g. MSc Computer Science at TU Munich"
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Background */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Your background in 2–3 sentences</label>
            <textarea
              value={formData.background}
              onChange={e => updateField('background', e.target.value)}
              placeholder="e.g. I'm a final-year student in Electrical Engineering at the University of Lisbon. I've been involved in robotics research since my second year..."
              rows={3}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Achievement */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Your biggest achievement</label>
            <textarea
              value={formData.achievement}
              onChange={e => updateField('achievement', e.target.value)}
              placeholder="e.g. I led a team that won the national robotics competition, designing a robot that could navigate disaster scenarios..."
              rows={3}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Motivation */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Why you want this opportunity</label>
            <textarea
              value={formData.motivation}
              onChange={e => updateField('motivation', e.target.value)}
              placeholder="e.g. This program's focus on autonomous systems aligns perfectly with my research interests. I want to work with Prof. Weber's lab..."
              rows={3}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!isFormValid || loading}
            className="w-full rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-pulse-gentle">Writing your draft...</span>
            ) : (
              'Generate Draft'
            )}
          </button>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        {/* Output + Tips side by side */}
        {draft && (
          <div className="mt-10 flex flex-col lg:flex-row gap-8 animate-in fade-in duration-300">
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
                    <h3 className="text-sm font-medium text-foreground">{tip.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-xs text-muted-foreground">
            DraftMe generates a starting point — always personalize before submitting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
