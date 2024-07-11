import type { Metadata } from 'next';
import './globals.css';
// components
import RootProvider from '../components/shared/RootProvider';
import NavigationBar from '@/components/shared/NavigationBar';
import OverlayProvider from '@/components/shared/OverlayProvider';

export const metadata: Metadata = {
  title: 'TextRogue',
  description: 'AI TextRogue',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <RootProvider>
          <OverlayProvider>
            <div className="flex flex-col min-h-screen mx-auto">
              <NavigationBar />
              <div className="flex-1 flex justify-center box-border py-8 sm:py-12">{children}</div>
            </div>
          </OverlayProvider>
        </RootProvider>
        <div id="overlay" />
      </body>
    </html>
  );
}
