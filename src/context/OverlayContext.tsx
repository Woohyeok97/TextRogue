import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type RenderType = (close: () => void) => React.ReactNode;

interface OverlayContextProps {
  isOpen: boolean;
  open: (render: RenderType) => void;
  close: () => void;
}
export const OverlayContext = createContext<OverlayContextProps | null>(null);

// 오버레이 컨텍스트 프로바이더
interface ProviderProps {
  children: React.ReactNode;
}
export function OverlayContextProvider({ children }: ProviderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState<{ isOpen: boolean; render: RenderType | null }>({
    isOpen: false,
    render: null,
  });

  // 오버레이 열기
  const open = useCallback((render: RenderType) => {
    setOverlay({ isOpen: true, render: render });
  }, []);

  // 오버레이 닫기
  const close = useCallback(() => {
    setOverlay({ isOpen: false, render: null });
  }, []);

  // 바깥영역 클릭 시, 오버레이 닫기
  const handleOutClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Node;
      if (overlayRef.current && !overlayRef.current.contains(target)) {
        close();
      }
    },
    [close]
  );

  // 핸들러 부착
  useEffect(() => {
    if (overlay.isOpen) {
      document.addEventListener('click', handleOutClick);
    }
    return () => document.removeEventListener('click', handleOutClick);
  }, [handleOutClick, overlay.isOpen]);

  return (
    <OverlayContext.Provider value={{ isOpen: overlay.isOpen, open, close }}>
      {children}
      {overlay.isOpen &&
        overlay.render &&
        createPortal(
          <div className="w-full h-full fixed top-0 left-0 bg-black/50">
            <div ref={overlayRef}>{overlay.render(close)}</div>
          </div>,
          document.getElementById('overlay') as HTMLElement
        )}
    </OverlayContext.Provider>
  );
}
