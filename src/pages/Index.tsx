import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DraftFormData, DocumentType, Language, LANGUAGE_LABELS } from '@/lib/draft-types';
import { translations } from '@/lib/translations';
import { FileText, Globe } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState<DraftFormData>({
    name: '',
    documentType: 'personal-statement',
    language: 'english',
    fieldOfStudy: '',
    university: '',
    background: '',
    achievement: '',
    motivation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const t = translations[formData.language];
  const isRTL = formData.language === 'arabic';

  const updateField = <K extends keyof DraftFormData>(key: K, value: DraftFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      navigate('/draft', { state: { draft: data.draft, documentType: formData.documentType, language: formData.language } });
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.name && formData.university && formData.fieldOfStudy && formData.background && formData.achievement && formData.motivation;

  const docTypeLabels: Record<DocumentType, string> = {
    'personal-statement': t.docTypePersonalStatement,
    scholarship: t.docTypeScholarship,
    erasmus: t.docTypeErasmus,
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-4xl px-5 py-16">
        {/* Language selector — top right */}
        <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} mb-8`}>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <select
              value={formData.language}
              onChange={e => updateField('language', e.target.value as Language)}
              className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
            >
              {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2.5 mb-3">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">{t.appName}</h1>
          </div>
          <p className="text-muted-foreground text-sm">{t.appTagline}</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{t.labelName}</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => updateField('name', e.target.value)}
              placeholder={t.placeholderName}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Document Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{t.labelDocType}</label>
            <select
              value={formData.documentType}
              onChange={e => updateField('documentType', e.target.value as DocumentType)}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
            >
              {Object.entries(docTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Field of Study */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{t.labelFieldOfStudy}</label>
            <input
              type="text"
              value={formData.fieldOfStudy}
              onChange={e => updateField('fieldOfStudy', e.target.value)}
              placeholder={t.placeholderFieldOfStudy}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* University */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{t.labelUniversity}</label>
            <input
              type="text"
              value={formData.university}
              onChange={e => updateField('university', e.target.value)}
              placeholder={t.placeholderUniversity}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Background */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{t.labelBackground}</label>
            <textarea
              value={formData.background}
              onChange={e => updateField('background', e.target.value)}
              placeholder={t.placeholderBackground}
              rows={3}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Achievement */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{t.labelAchievement}</label>
            <textarea
              value={formData.achievement}
              onChange={e => updateField('achievement', e.target.value)}
              placeholder={t.placeholderAchievement}
              rows={3}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Motivation */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{t.labelMotivation}</label>
            <textarea
              value={formData.motivation}
              onChange={e => updateField('motivation', e.target.value)}
              placeholder={t.placeholderMotivation}
              rows={3}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Generate Hint */}
          <p className="text-xs text-muted-foreground text-center">{t.generateHint}</p>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!isFormValid || loading}
            className="w-full rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-pulse-gentle">{t.generatingButton}</span>
            ) : (
              t.generateButton
            )}
          </button>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-xs text-muted-foreground">{t.footer}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
