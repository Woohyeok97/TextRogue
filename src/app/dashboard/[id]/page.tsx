import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
// components
import UserBookmarkList from '@/components/dashboard/UserBookmarkList';
import UserStoryList from '@/components/dashboard/UserStoryList';
import UserScenarioList from '@/components/dashboard/UserScenarioList';
import { Skeleton } from '@/components/shared/ui/Skeleton';
import { Text } from '@/components/shared/ui/Text';

export default async function DashBoardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return redirect('/');
  }

  return (
    <main className="max-w-2xl w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <Image
            width={100}
            height={100}
            sizes="100%"
            src={session ? `${session.user?.image}` : '/방문자_아바타.jpeg'}
            className="object-cover w-full h-full"
            alt="avatar"
          />
        </div>
        <Text size="xl" weigth="bold">
          {session?.user.name}
        </Text>
      </div>

      <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
        <button className="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none">
          My Menu 1
        </button>
        <button className="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap focus:outline-none hover:border-gray-400">
          My Menu 2
        </button>
        <button className="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap focus:outline-none hover:border-gray-400">
          My Menu 3
        </button>
      </div>
      <div>
        <Suspense fallback={<Skeleton />}>
          <UserStoryList userId={session.user.id} />
        </Suspense>
        <Suspense fallback={<Skeleton />}>
          <UserScenarioList userId={session.user.id} />
        </Suspense>
        <Suspense fallback={<Skeleton />}>
          <UserBookmarkList userId={session.user.id} />
        </Suspense>
      </div>
    </main>
  );
}
