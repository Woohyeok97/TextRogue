import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function usePageExitEvent() {
  const router = useRouter();

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = false;
  };

  // router.push, Link 태그 이탈 방지
  useEffect(() => {
    const originPush = router.push;
    const newPush = (href: string, options?: NavigateOptions | undefined): void => {
      if (window.confirm('page exit?')) {
        originPush(href, options);
      }
    };
    router.push = newPush;

    return () => {
      router.push = originPush;
    };
  }, []);

  // beforeunload 이벤트 부착
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}
