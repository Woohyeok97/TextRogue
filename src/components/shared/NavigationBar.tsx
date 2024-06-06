'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import UserAICount from './UserAICount';
import { Text } from './ui/Text';

export default function NavigationBar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (status === 'authenticated' && session) {
      return signOut();
    }
    return signIn();
  };

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                className="w-auto h-6 sm:h-7"
                src="https://merakiui.com/images/full-logo.svg"
                alt="Logo"
                width={100}
                height={24}
              />
            </Link>

            {/* 모바일 버전 햄버거 */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(prev => !prev)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
            }`}
          >
            <div className="flex gap-5 items-center">
              {session?.user.id && (
                <div className="flex gap-5 items-center">
                  <Link href={`/dashboard/${session.user.id}`}>
                    <Text size="xl">Dashboard</Text>
                  </Link>
                  <UserAICount userId={session.user.id} />
                </div>
              )}
              <button onClick={handleClick} className="flex items-center">
                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                  {status !== 'loading' && (
                    <Image
                      width={100}
                      height={100}
                      sizes="100%"
                      src={session ? `${session.user?.image}` : '/방문자_아바타.jpeg'}
                      className="object-cover w-full h-full"
                      alt="avatar"
                    />
                  )}
                </div>
                <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">{session?.user?.name}</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
