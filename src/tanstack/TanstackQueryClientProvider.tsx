"use client";

import { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TanstackQueryClientProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const TanstackQueryClientProvider: React.FC<
  TanstackQueryClientProviderProps
> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackQueryClientProvider;
