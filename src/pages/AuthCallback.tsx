import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      // New Supabase flow: token_hash + type in query params (PKCE)
      const params = new URLSearchParams(window.location.search);
      const tokenHash = params.get("token_hash");
      const type = params.get("type") as "email" | "recovery" | "invite" | null;

      if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
        if (error) {
          setError(error.message || "Verification failed. Please try signing up again.");
        } else {
          navigate("/", { replace: true });
        }
        return;
      }

      // Legacy flow: tokens in URL hash fragment
      const hash = window.location.hash;
      if (hash.includes("error=")) {
        const hashParams = new URLSearchParams(hash.substring(1));
        setError(
          hashParams.get("error_description") ||
          "Verification failed. Please try signing up again."
        );
        return;
      }

      // If tokens are in hash, Supabase client auto-detects them
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" && session) {
          navigate("/", { replace: true });
        }
      });

      // Fallback: if no recognisable params, go home (already logged in or stale link)
      const timeout = setTimeout(() => navigate("/", { replace: true }), 5000);

      return () => {
        subscription.unsubscribe();
        clearTimeout(timeout);
      };
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="flex items-center gap-2 justify-center mb-8">
          <FileText className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold tracking-tight">DraftMe</span>
        </div>

        {error ? (
          <div className="space-y-4">
            <p className="text-sm text-destructive" data-testid="text-callback-error">{error}</p>
            <a
              href="/signup"
              className="inline-block text-sm text-primary hover:underline underline-offset-2"
            >
              Try signing up again
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Confirming your email…</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
