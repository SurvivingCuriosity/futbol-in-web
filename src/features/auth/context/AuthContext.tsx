"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type JwtPayload = {
  id: string;
  email: string;
  name: string;
  role: string[];
  status: string;
  provider?: string;
  imagen?: string;
  exp: number;
};
export type AuthUser = Omit<JwtPayload, "exp">;

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // Migration: transparently move old localStorage token to httpOnly cookie
        const stored = localStorage.getItem("auth");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed?.token) {
              await fetch("/api/auth/set-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: parsed.token }),
              });
            }
          } finally {
            localStorage.removeItem("auth");
          }
        }

        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.token && data.user) {
          setToken(data.token);
          setUser(data.user);
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (token: string, user: AuthUser) => {
    await fetch("/api/auth/set-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await fetch("/api/auth/set-token", { method: "DELETE" });
  };

  return (
    <AuthContext.Provider value={{ loading, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
