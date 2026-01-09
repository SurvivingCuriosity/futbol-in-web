import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function createQueryWrapper() {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };
}

import { GoogleOAuthProvider } from "@react-oauth/google";

export function createGoogleOAuthWrapper() {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>{children}</GoogleOAuthProvider>
    );
  };
}


