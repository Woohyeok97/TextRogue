import type { Metadata } from 'next';
import './globals.css';
import RootProvider from '../components/shared/RootProvider';

export const metadata: Metadata = {
  title: 'prototype',
  description: 'ai text prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <main className="max-w-3xl min-h-screen mx-auto">
          <RootProvider>{children}</RootProvider>
        </main>
        <div id="overlay" />
      </body>
    </html>
  );
}
