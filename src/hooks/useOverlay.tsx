import { useContext, useEffect } from 'react';
import { OverlayContext } from '@/context/OverlayContext';

export default function useOverlay() {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('OverlayContext Error!');
  }

  // unmount 시, 오버레이 닫기
  useEffect(() => {
    return () => {
      if (context.isOpen) {
        context.close();
      }
    };
  }, [context]);

  return context;
}
