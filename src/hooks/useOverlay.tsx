import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { overlayState } from '@/recoil/atom';

export default function useOverlay() {
  // 오버레이 열기 : open 전, 기존 오버레이 isOpen을 확인해서 OverlayProvider(overlayState 변경에 따라 리렌더링 되는 컴포넌트) 리렌더링 최소화
  const open = useRecoilCallback(({ set, snapshot }) => async (content: React.ReactNode) => {
    const current = await snapshot.getPromise(overlayState);
    if (!current.isOpen) {
      set(overlayState, { isOpen: true, content: content });
    }
  });

  // 오버레이 닫기
  const close = useRecoilCallback(({ reset, snapshot }) => async () => {
    const current = await snapshot.getPromise(overlayState);
    if (current.isOpen) {
      reset(overlayState);
    }
  });

  // umount 시, 오버레이 닫기
  useEffect(() => {
    return () => {
      close();
    };
  }, [close]);

  return { open, close };
}
