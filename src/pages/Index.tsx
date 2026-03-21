import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DraftFormData, DocumentType, Language, LANGUAGE_LABELS } from '@/lib/draft-types';
import { translations } from '@/lib/translations';
import { FileText, Globe, LogIn, LogOut, Coins } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useQueryClient } from '@tanstack/react-query';

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
  const { user, isLoading: authLoading, refetch } = useAuth();
  const queryClient = useQueryClient();

  const t = translations[formData.language];
  const isRTL = formData.language === 'arabic';

  const updateField = <K extends keyof DraftFormData>(key: K, value: DraftFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!user) {
      window.location.href = '/api/login';
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.status === 403 && data.error === 'no_credits') {
        setError('');
        queryClient.invalidateQueries({ queryKey: ['/api/me'] });
        return;
      }
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      queryClient.invalidateQueries({ queryKey: ['/api/me'] });
      navigate('/draft', { state: { draft: data.draft, documentType: formData.documentType, language: formData.language } });
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.name && formData.university && formData.fieldOfStudy && formData.background && formData.achievement && formData.motivation;
  const hasNoCredits = user !== undefined && user !== null && user.credits <= 0;
  const isButtonDisabled = !isFormValid || loading || hasNoCredits;

  const docTypeLabels: Record<DocumentType, string> = {
    'personal-statement': t.docTypePersonalStatement,
    scholarship: t.docTypeScholarship,
    erasmus: t.docTypeErasmus,
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-4xl px-5 py-16">

        {/* Top bar: language + auth */}
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-between mb-8`}>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <select
              value={formData.language}
              onChange={e => updateField('language', e.target.value as Language)}
              className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              data-testid="select-language"
            >
              {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Auth area */}
          {!authLoading && (
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  {/* Credits badge */}
                  <div
                    data-testid="credits-badge"
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${
                      user.credits <= 0
                        ? 'bg-destructive/10 border-destructive/30 text-destructive'
                        : user.credits === 1
                        ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400'
                        : 'bg-primary/10 border-primary/20 text-primary'
                    }`}
                  >
                    <Coins className="h-3 w-3" />
                    <span data-testid="credits-count">{user.credits} credit{user.credits !== 1 ? 's' : ''} left</span>
                  </div>

                  {/* User name */}
                  {user.firstName && (
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                      {user.firstName}
                    </span>
                  )}

                  {/* Profile image or initials */}
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt="profile"
                      className="h-7 w-7 rounded-full object-cover"
                      data-testid="img-profile"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary" data-testid="avatar-initials">
                      {user.email?.[0]?.toUpperCase() ?? '?'}
                    </div>
                  )}

                  <a
                    href="/api/logout"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="link-logout"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Sign out</span>
                  </a>
                </>
              ) : (
                <a
                  href="/api/login"
                  className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                  data-testid="link-login"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Sign in
                </a>
              )}
            </div>
          )}
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2.5 mb-3">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">{t.appName}</h1>
          </div>
          <p className="text-muted-foreground text-sm">{t.appTagline}</p>
        </div>

        {/* No-credits banner */}
        {hasNoCredits && (
          <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" data-testid="banner-no-credits">
            You've used all your free credits. Sign up for more — or check back later.
          </div>
        )}

        {/* Not-signed-in nudge */}
        {!authLoading && !user && (
          <div className="mb-6 rounded-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground" data-testid="banner-sign-in">
            <a href="/api/login" className="text-primary underline underline-offset-2 hover:opacity-80">Sign in</a> to generate your draft. New users get <strong className="text-foreground">3 free credits</strong>.
          </div>
        )}

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
              data-testid="input-name"
            />
          </div>

          {/* Document Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{t.labelDocType}</label>
            <select
              value={formData.documentType}
              onChange={e => updateField('documentType', e.target.value as DocumentType)}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
              data-testid="select-doc-type"
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
              data-testid="input-field-of-study"
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
              data-testid="input-university"
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
              data-testid="textarea-background"
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
              data-testid="textarea-achievement"
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
              data-testid="textarea-motivation"
            />
          </div>

          {/* Generate Hint */}
          <p className="text-xs text-muted-foreground text-center">{t.generateHint}</p>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isButtonDisabled}
            className="w-full rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            data-testid="button-generate"
          >
            {loading ? (
              <span className="animate-pulse-gentle">{t.generatingButton}</span>
            ) : hasNoCredits ? (
              'No credits remaining'
            ) : !user && !authLoading ? (
              'Sign in to generate'
            ) : (
              t.generateButton
            )}
          </button>

          {error && (
            <p className="text-sm text-destructive" data-testid="text-error">{error}</p>
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
