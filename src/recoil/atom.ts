import { atom } from 'recoil';

interface OverlayStateType {
  isOpen: boolean;
  content?: React.ReactNode;
}
export const overlayState = atom<OverlayStateType>({
  key: 'overlayState',
  default: {
    isOpen: false,
    content: null,
  },
});
