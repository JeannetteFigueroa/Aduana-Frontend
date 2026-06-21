import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getToken } from "@/lib/api";
import { getSession, logout as clearLocalSession, type Session } from "@/lib/auth";

interface AuthContextValue {
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setSession: (session: Session | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession() {
  return getSession();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(() => readSession());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSessionState(readSession());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const syncSession = () => setSessionState(readSession());
    window.addEventListener("storage", syncSession);
    return () => window.removeEventListener("storage", syncSession);
  }, []);

  const effectiveSession = session ?? readSession();

  const value = useMemo<AuthContextValue>(
    () => ({
      session: effectiveSession,
      isLoading,
      isAuthenticated: Boolean(effectiveSession && getToken()),
      setSession: setSessionState,
      logout: () => {
        clearLocalSession();
        setSessionState(null);
      },
    }),
    [effectiveSession, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
