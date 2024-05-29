'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OverlayContextProvider } from '@/context/OverlayContext';
import { SessionProvider } from 'next-auth/react';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

interface RootProviderProps {
  children: React.ReactNode;
}
export default function RootProvider({ children }: RootProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <OverlayContextProvider>{children}</OverlayContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

// 'use client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { OverlayContextProvider } from '@/context/OverlayContext';
// import { SessionProvider } from 'next-auth/react';

// interface RootProviderProps {
//   children: React.ReactNode;
// }
// export default function RootProvider({ children }: RootProviderProps) {
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       staleTime: Infinity,
//     },
//   },
// });

//   return (
//     <QueryClientProvider client={queryClient}>
//       <SessionProvider>
//         <OverlayContextProvider>{children}</OverlayContextProvider>
//       </SessionProvider>
//     </QueryClientProvider>
//   );
// }
