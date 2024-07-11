import { overlayState } from '@/recoil/atom';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export default function useOverlay() {
  const setOverlayState = useSetRecoilState(overlayState);

  // 오버레이 열기
  const open = (content: React.ReactNode) => {
    setOverlayState({
      isOpen: true,
      content: content,
    });
  };

  // 오버레이 닫기
  const close = () => {
    setOverlayState({ isOpen: false });
  };

  // umount 시, 오버레이 닫기
  useEffect(() => {
    return () => {
      setOverlayState({ isOpen: false });
    };
  }, []);

  return { open, close };
}
