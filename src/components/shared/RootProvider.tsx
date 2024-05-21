'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OverlayContextProvider } from '@/context/OverlayContext';

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

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayContextProvider>{children}</OverlayContextProvider>
    </QueryClientProvider>
  );
}
