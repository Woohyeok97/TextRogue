import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
// components
import ScenarioItem from '@/components/shared/ScenarioItem';
import StoryItem from '@/components/shared/StoryItem';
import { Text } from '@/components/shared/ui/Text';
// remotes
import { getUserBookmarkList, getUserScenarioList } from '@/remotes/mongodb/server/scenario';
import { getUserStoryList } from '@/remotes/mongodb/server/story';

export default async function DashBoardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return redirect('/');
  }

  const userScenarioList = await getUserScenarioList(session.user.id);
  const userBookmarkList = await getUserBookmarkList(session.user.id);
  const userStoryList = await getUserStoryList(session.user.id);

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
      <div className="flex flex-col gap-3 my-8">
        <Text size="xl">진행중인 스토리</Text>
        {userStoryList.length ? (
          userStoryList.map(item => <StoryItem key={item._id} story={item} />)
        ) : (
          <Text color="gray">진행중인 스토리가 없습니다.</Text>
        )}
      </div>
      <div className="flex flex-col gap-3 my-8">
        <Text size="xl">나의 시나리오</Text>
        {userScenarioList.length ? (
          userScenarioList.map(item => <ScenarioItem key={item._id} scenario={item} />)
        ) : (
          <Text color="gray">생성한 시나리오가 없습니다.</Text>
        )}
      </div>
      <div className="flex flex-col gap-3 my-8">
        <Text size="xl">나의 북마크</Text>
        {userBookmarkList.length ? (
          userBookmarkList.map(item => <ScenarioItem key={item._id} scenario={item} />)
        ) : (
          <Text color="gray">북마크한 시나리오가 없습니다.</Text>
        )}
      </div>
    </main>
  );
}
