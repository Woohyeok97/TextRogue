import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
// components
import { Text } from './ui/Text';
import { Button } from './ui/Button';
import { Divider } from './ui/Divider';
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
  const queryClient = new QueryClient();

  if (scenario._id && userId) {
    await queryClient.prefetchQuery({
      queryKey: ['bookmark', scenario._id, userId],
      queryFn: () => getUserBookmark({ scenarioId: scenario._id!, userId }),
    });
  }

  return (
    <div className="rounded bg-gray-800">
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-3">
          <Link href={`/scenario/${scenario._id}`} className="hover:underline">
            <Text weigth="bold" size="xl">
              {scenario.title}
            </Text>
          </Link>
          <div className="line-clamp-3">
            <Text color="lightGray">{scenario.prologue.text}</Text>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href="#">
            <Button color="gray" size="sm">
              {scenario.genre}
            </Button>
          </Link>
          <Link href="#">
            <Button color="gray" size="sm">
              {scenario.world}
            </Button>
          </Link>
        </div>
      </div>

      <Divider />
      <div className="flex justify-between items-center px-6 py-3">
        <Link href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
            <Image
              width={100}
              height={100}
              sizes="100%"
              src="/images/방문자.png"
              className="object-cover w-full h-full"
              alt="avatar"
            />
          </div>
          <Text weigth="bold">고나우</Text>
        </Link>
        {userId && scenario._id && (
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Bookmark scenarioId={scenario._id} userId={userId} />
          </HydrationBoundary>
        )}
      </div>
    </div>
  );
}
