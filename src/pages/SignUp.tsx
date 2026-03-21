import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/` },
      });
      if (error) throw error;
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
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              data-testid="input-email"
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              data-testid="input-password"
            />
            {error && (
              <p className="text-xs text-destructive" data-testid="text-error">{error}</p>
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
