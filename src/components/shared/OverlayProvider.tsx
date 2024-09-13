'use client';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { overlayState } from '@/recoil/atom';
import { useCallback, useEffect, useRef } from 'react';
import useOverlay from '@/hooks/useOverlay';

interface OverlayProviderProps {
  children: React.ReactNode;
}
export default function OverlayProvider({ children }: OverlayProviderProps) {
  const overlay = useRecoilValue(overlayState);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { close } = useOverlay();
  // console.log('provder!');
  // 오버레이 바깥영역 클릭 -> 오버레이 닫기
  const handleOutClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Node;
      if (overlayRef.current && !overlayRef.current.contains(target)) {
        close();
      }
    },
    [close],
  );
  // handleOutClick 메모이징 -> 메모이징을 안하면 handleOutClick 함수가 '먼저' 정의 되어서 ref 감지를 못함 -> opne 버튼 클릭

  useEffect(() => {
    if (overlay.isOpen) {
      document.addEventListener('click', handleOutClick);
    }
    return () => document.removeEventListener('click', handleOutClick);
  }, [handleOutClick, overlay.isOpen]);
  // 일반 handleOutClick 함수 -> OverlayProvider 리렌더링(오버레이 열기) 마다 handleOutClick 함수가 재정의 되어서 useEffect를 실행
  // 메모이징 handleOutClick 함수 -> OverlayProvider 리렌더링(오버레이 열기) 할때 handleOutClick 함수가 메모이징 되어 useEffect 실행 x (최초 1회만)
  // -> 이때는 의존성 배열에 overlay.isOpen를 넣어서 최초 마운트 이후에도 이벤트가 등록되게 함

  return (
    <>
      {children}
      {overlay.isOpen &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div ref={overlayRef}>{overlay.content}</div>
          </div>,
          document.getElementById('overlay') as HTMLElement,
        )}
    </>
  );
}
