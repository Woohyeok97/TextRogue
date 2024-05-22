import type { Metadata } from 'next';
import './globals.css';
import RootProvider from '../components/shared/RootProvider';
import NavigationBar from '@/components/shared/NavigationBar';

export const metadata: Metadata = {
  title: 'prototype',
  description: 'ai text prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <RootProvider>
          <main className="max-w-6xl min-h-screen mx-auto">
            <NavigationBar />
            {children}
          </main>
        </RootProvider>
        <div id="overlay" />
      </body>
    </html>
  );
}
