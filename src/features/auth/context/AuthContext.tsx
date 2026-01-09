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
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        setToken(parsed.token);
        setUser(parsed.user);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (token: string, user: AuthUser) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("auth", JSON.stringify({ token, user }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth");
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
