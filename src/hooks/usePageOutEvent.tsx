import { useEffect } from 'react';

export default function usePageOutEvent() {
  const beforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnload);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, []);
}
