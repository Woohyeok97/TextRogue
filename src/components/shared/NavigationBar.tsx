'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function NavigationBar() {
  const { data: sesstion, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (status === 'authenticated' && sesstion) {
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
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              <Link
                href="/scenario/create"
                className="px-3 py-2 mx-3 mt-2 duration-300 rounded-md lg:mt-0 text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                시나리오 생성
              </Link>
            </div>
            <button onClick={handleClick} className="flex items-center">
              <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                {status !== 'loading' && (
                  <Image
                    width={100}
                    height={100}
                    sizes="100%"
                    src={sesstion ? `${sesstion.user?.image}` : '/방문자_아바타.jpeg'}
                    className="object-cover w-full h-full"
                    alt="avatar"
                  />
                )}
              </div>
              <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">{sesstion?.user?.name}</h3>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
