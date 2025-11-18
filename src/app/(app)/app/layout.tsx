"use client";

import { AuthProvider, useAuth } from "@/src/features/auth/context/AuthContext";
import { queryClient } from "@/src/shared/client/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UIProvider } from "@/src/shared/context/UIProvider/components/UIProviders";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      >
        <AuthProvider>
          <UIProvider>
            <Protected>{children}</Protected>
          </UIProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
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
