import type { Metadata } from 'next';
import './globals.css';
import RootProvider from './RootProvider';

export const metadata: Metadata = {
  title: 'prototype',
  description: 'ai text prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
