import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validate = (): string => {
    if (!isValidEmail(email)) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });

      if (error) {
        if (
          error.message.toLowerCase().includes("already registered") ||
          error.message.toLowerCase().includes("already exists") ||
          error.message.toLowerCase().includes("user already") ||
          error.status === 422
        ) {
          setError("An account with this email already exists. Please log in instead.");
        } else {
          setError(error.message);
        }
        return;
      }

      // Supabase sometimes returns a user with identities=[] for existing emails
      // (when email confirmation is on) instead of throwing an error
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError("An account with this email already exists. Please log in instead.");
        return;
      }

      setSuccess("Check your email for a confirmation link to complete sign up.");
    } catch (e: any) {
      setError(e.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex items-center gap-2 justify-center mb-8">
          <FileText className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold tracking-tight">DraftMe</span>
        </div>

        <h1 className="text-xl font-semibold text-center mb-1">Create your account</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Get 3 free credits when you sign up
        </p>

        {success ? (
          <div className="rounded-md border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary text-center" data-testid="text-success">
            {success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              required
              autoComplete="email"
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              data-testid="input-email"
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              data-testid="input-password"
            />
            {error && (
              <p className="text-xs text-destructive leading-relaxed" data-testid="text-error">
                {error}
                {error.includes("already exists") && (
                  <>
                    {" "}
                    <Link to="/login" className="underline underline-offset-2 hover:opacity-80">
                      Log in
                    </Link>
                  </>
                )}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              data-testid="button-submit-signup"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline underline-offset-2" data-testid="link-login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
