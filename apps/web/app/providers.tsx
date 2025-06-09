"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Providers as ChakraProviders } from "./providers/ChakraProvider";
import { Toaster } from "sonner";
interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

export function Providers({ children }: ProvidersProps) {
  return (
    <ChakraProviders>
      <Toaster position="top-right" />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ChakraProviders>
  );
}
