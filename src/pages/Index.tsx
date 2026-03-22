import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DraftFormData, DocumentType, Language, LANGUAGE_LABELS } from '@/lib/draft-types';
import { translations } from '@/lib/translations';
import { FileText, Globe, LogIn, LogOut, Coins, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading: authLoading, isAuthenticated, session, refreshCredits } = useAuth();

  const t = translations[formData.language];
  const isRTL = formData.language === 'arabic';

  const updateField = <K extends keyof DraftFormData>(key: K, value: DraftFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleDeleteAccount = async () => {
    if (!session) return;
    setDeleting(true);
    try {
      const res = await fetch('/api/delete-account', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete account');
      }
      await supabase.auth.signOut();
    } catch (e: any) {
      setError(e.message || 'Failed to delete account. Please try again.');
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleGenerate = async () => {
    if (!isAuthenticated || !session) {
      navigate('/signup');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.status === 403 && data.error === 'no_credits') {
        refreshCredits();
        return;
      }
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      await refreshCredits();
      navigate('/draft', { state: { draft: data.draft, documentType: formData.documentType, language: formData.language } });
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.name && formData.university && formData.fieldOfStudy && formData.background && formData.achievement && formData.motivation;
  const hasNoCredits = user !== null && user !== undefined && user.credits <= 0;
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

                  {/* Avatar dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="focus:outline-none rounded-full"
                        data-testid="button-avatar-menu"
                        aria-label="Account menu"
                      >
                        {user.profileImageUrl ? (
                          <img
                            src={user.profileImageUrl}
                            alt="profile"
                            className="h-7 w-7 rounded-full object-cover hover:ring-2 hover:ring-primary/50 transition-all"
                            data-testid="img-profile"
                          />
                        ) : (
                          <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary hover:ring-2 hover:ring-primary/50 transition-all" data-testid="avatar-initials">
                            {user.email?.[0]?.toUpperCase() ?? '?'}
                          </div>
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="flex items-center gap-2 cursor-pointer"
                        data-testid="menu-item-signout"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign out
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setShowDeleteDialog(true)}
                        className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                        data-testid="menu-item-delete-account"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                  data-testid="link-signup"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Sign in
                </Link>
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
            You've used all your free credits.
          </div>
        )}

        {/* Not-signed-in nudge */}
        {!authLoading && !user && (
          <div className="mb-6 rounded-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground" data-testid="banner-sign-in">
            <Link to="/signup" className="text-primary underline underline-offset-2 hover:opacity-80">Sign up</Link> to generate your draft. New users get <strong className="text-foreground">3 free credits</strong>.
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
              'Sign up to generate'
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

      {/* Delete account confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account and all your credits. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting} data-testid="button-cancel-delete">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              {deleting ? 'Deleting…' : 'Yes, delete my account'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
