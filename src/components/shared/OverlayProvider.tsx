'use client';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { overlayState } from '@/recoil/atom';
import { useEffect, useRef } from 'react';
import useOverlay from '@/hooks/useOver';

interface OverlayProviderProps {
  children: React.ReactNode;
}
export default function OverlayProvider({ children }: OverlayProviderProps) {
  const overlay = useRecoilValue(overlayState);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { close } = useOverlay();

  // 오버레이 바깥영역 클릭 -> 오버레이 닫기
  const handleOutClick = (e: MouseEvent) => {
    const target = e.target as Node;
    if (overlayRef.current && !overlayRef.current.contains(target)) {
      close();
    }
  };

  useEffect(() => {
    if (overlay.isOpen) {
      document.addEventListener('click', handleOutClick);
    }
    return () => document.removeEventListener('click', handleOutClick);
  }, [handleOutClick]);

  return (
    <>
      {children}
      {overlay.isOpen &&
        createPortal(<div ref={overlayRef}>{overlay.content}</div>, document.getElementById('overlay') as HTMLElement)}
    </>
  );
}
