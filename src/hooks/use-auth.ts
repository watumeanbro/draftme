import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export interface AuthUser {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  credits: number;
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session);
      else setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session);
      else {
        setUser(null);
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ["/api/me"] });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(session: Session) {
    try {
      const res = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshCredits() {
    if (!session) return;
    await fetchProfile(session);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return {
    session,
    user,
    isLoading,
    isAuthenticated: !!session,
    refreshCredits,
    signOut,
  };
}
