import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function usePageExitEvent() {
  const router = useRouter();
  const originPushRef = useRef(router.push);

  // beforeunload 이벤트 핸들러
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = false;
  };

  useEffect(() => {
    const originPush = originPushRef.current;
    const newPush = (href: string, options?: NavigateOptions | undefined): void => {
      if (window.confirm('페이지를 나가시겠습니까?')) {
        originPush(href, options);
      }
    };
    console.log('useEffect 실헹함!!');
    router.push = newPush;

    return () => {
      console.log('useEffect 종료!!');
      router.push = originPush;
    };
  }, [router]);

  // beforeunload 이벤트 부착
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { originPush: originPushRef.current };
}

// import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function usePageExitEvent() {
//   const router = useRouter();
//   const originPush = router.push;

//   // beforeunload 이벤트 핸들러
//   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//     e.preventDefault();
//     e.returnValue = false;
//   };

//   // router.push, Link 태그 이탈 방지
//   useEffect(() => {
//     const newPush = (href: string, options?: NavigateOptions | undefined): void => {
//       if (window.confirm('페이지를 나가시겠습니까?')) {
//         originPush(href, options);
//       }
//     };
//     router.push = newPush;

//     return () => {
//       router.push = originPush;
//     };
//   }, [originPush, router]);

//   // beforeunload 이벤트 부착
//   useEffect(() => {
//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);

//   return { originPush };
// }
