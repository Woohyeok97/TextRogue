import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// components
import { Text } from './Text';
import Bookmark from './Bookmark';
// type
import { ScenarioType } from '@/models';
// remotes
import { getUserBookmark } from '@/remotes/mongodb/server/bookmark';

interface ScenarioItemProps {
  scenario: ScenarioType;
}
export default async function ScenarioItem({ scenario }: ScenarioItemProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  // const bookmark = session?.user.id
  //   ? await getUserBookmark({ scenarioId: scenario._id!, userId: session.user.id })
  //   : null;

  return (
    <div className="max-w-2xl px-8 py-5 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-3">
          <Link
            href="#"
            className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
          >
            {scenario.genre}
          </Link>
          <Link
            href="#"
            className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
          >
            {scenario.world}
          </Link>
        </div>
        <Text color="gray">2024.8.15</Text>
      </div>
      <div className="mt-2">
        <Link href={`/scenario/${scenario._id}`} className="hover:underline">
          <Text weigth="bold" size="xl">
            {scenario.title}
          </Text>
        </Link>
        <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">{scenario.prologue.text}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Link href="#" className="flex items-center gap-4">
          <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
            <Image
              width={100}
              height={100}
              sizes="100%"
              src="/방문자_아바타.jpeg"
              className="object-cover w-full h-full"
              alt="avatar"
            />
          </div>
          <Text weigth="bold">고나우</Text>
        </Link>
        {userId && scenario._id && <Bookmark scenarioId={scenario._id} userId={userId} />}
      </div>
    </div>
  );
}
