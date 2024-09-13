import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function usePageExitEvent() {
  const router = useRouter();
  const isFirstRender = useRef(true);
  const originPushRef = useRef(router.push);

  // router.push 변경
  useEffect(() => {
    const originPush = originPushRef.current;
    const newPush = (href: string, options?: NavigateOptions | undefined): void => {
      if (window.confirm('페이지를 나가시겠습니까?')) {
        originPush(href, options);
      }
    };
    router.push = newPush;

    return () => {
      router.push = originPush;
    };
  }, [router]);

  // 브라우저 History 이벤트 핸들러
  const handlePopState = () => {
    if (window.confirm('popstate! 페이지를 나가시겠습니까?')) {
      history.go(-1);
    } else {
      history.pushState(null, '', '');
    }
  };

  // 브라우저 History 이벤트 부착
  useEffect(() => {
    if (isFirstRender.current) {
      history.pushState(null, '', '');
      isFirstRender.current = false;
    }
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // beforeunload 이벤트 핸들러
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = false;
  };

  // beforeunload 이벤트 부착
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { originPush: originPushRef.current };
}
