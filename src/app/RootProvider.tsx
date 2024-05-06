'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface RootProviderProps {
  children: React.ReactNode;
}
export default function RootProvider({ children }: RootProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
