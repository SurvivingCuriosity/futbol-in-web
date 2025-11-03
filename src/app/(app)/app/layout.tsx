"use client";

import { AuthProvider, useAuth } from "@/src/client/context/AuthContext";
import { queryClient } from "@/src/client/query/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Protected>{children}</Protected>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function Protected({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) router.replace("/app/login");
  }, [token, router, loading]);

  return <>{children}</>;
}
