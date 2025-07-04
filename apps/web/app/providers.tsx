"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "sonner/dist/styles.css";
import { Providers as ChakraProviders } from "./providers/ChakraProvider";
import { Toaster } from "sonner";
interface ProvidersProps {
  children: any;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    },
  },
});

export function Providers({ children }: ProvidersProps) {
  return (
    <ChakraProviders>
      <Toaster position="top-right" richColors />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ChakraProviders>
  );
}
