'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import UserAICount from './UserAICount';
import { Text } from './ui/Text';
import useOverlay from '@/hooks/useOverlay';
import Dialog from './ui/Dialog';
import Login from './Login';

export default function NavigationBar() {
  const { data: session, status } = useSession();
  const { open } = useOverlay();
  const [isOpen, setIsOpen] = useState(false);
  const navigationRef = useRef<HTMLDivElement>(null);

  // 메뉴 바깥 클릭 이벤트 처리
  useEffect(() => {
    const handleOut = (e: MouseEvent) => {
      const target = e.target as Node;
      if (navigationRef.current && !navigationRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOut);
    }
    return () => document.removeEventListener('click', handleOut);
  }, [isOpen]);

  // 토글 핸들러
  const handleToggleClick = () => {
    if (status === 'unauthenticated') {
      return open(
        <Dialog>
          <Login />
        </Dialog>,
      );
    }
    setIsOpen(prev => !prev);
  };

  // 메뉴 핸들러
  const handleMenuClick = () => {
    isOpen && setIsOpen(false);
  };

  return (
    <nav className="relative bg-gray-800" ref={navigationRef}>
      <div className="flex flex-col justify-between px-6 py-4 md:max-w-[80%] mx-auto">
        <div className="flex items-center justify-between w-full">
          <Link href="/" onClick={handleMenuClick} className="flex items-center gap-2">
            <Image src="/images/로고_화이트.png" alt="Logo" width={120} height={120} />
          </Link>
          <div className="flex items-center gap-5">
            {session?.user.id && <UserAICount userId={session.user.id} />}
            <button onClick={handleToggleClick} className="flex items-center gap-3">
              <Text className="hidden sm:block">{session?.user?.name}</Text>
              <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                {status !== 'loading' && (
                  <Image
                    width={100}
                    height={100}
                    sizes="100%"
                    src={session ? `${session.user?.image}` : `/images/방문자.png`}
                    className="object-cover w-full h-full"
                    alt="avatar"
                  />
                )}
              </div>
            </button>
          </div>
        </div>
        {session?.user.id && (
          <div
            className={`transition-all duration-300 ease-in-out ${
              isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
            } overflow-hidden`}
          >
            <div
              className={`flex flex-col justify-between mt-7 sm:flex-row sm:items-center sm:space-x-4`}
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`/dashboard/${session.user.id}`} onClick={handleMenuClick}>
                  <Text>대시보드</Text>
                </Link>
                <Link href="/scenario/create" onClick={handleMenuClick}>
                  <Text>시나리오 생성</Text>
                </Link>
              </div>
              <button className="mt-3 sm:mt-0">
                <Text onClick={() => signOut()}>로그아웃</Text>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
