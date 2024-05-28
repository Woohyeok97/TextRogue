import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
// components
import StoryAdvancer from '@/components/story/StoryAdvancer';
// remotes
import { getStoryById } from '@/remotes/mongodb/server/story';
// types
import { StoryType } from '@/models';

interface ScenarioPlayProps {
  params: { id: string };
}
export default async function StoryPage({ params }: ScenarioPlayProps) {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<StoryType>({
    queryKey: ['story', params.id],
    queryFn: () => getStoryById(params.id),
  });

  const story = queryClient.getQueryData<StoryType>(['story', params.id]);

  if (!session?.user.id || session.user.id !== story?.userId) {
    return redirect('/');
  }

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StoryAdvancer storyId={params.id} />
      </HydrationBoundary>
    </main>
  );
}

// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { redirect } from 'next/navigation';
// // components
// import StoryAdvancer from '@/components/story/StoryAdvancer';
// // remotes
// import { getStoryById } from '@/remotes/mongodb/server/story';

// interface ScenarioPlayProps {
//   params: { id: string };
// }
// export default async function StoryPage({ params }: ScenarioPlayProps) {
//   const session = await getServerSession(authOptions);
//   const story = await getStoryById(params.id);

//   if (!session?.user && session?.user.id !== story.userId) {
//     return redirect('/login');
//   }

//   return (
//     <main>
//       <StoryAdvancer story={story} />
//     </main>
//   );
// }
