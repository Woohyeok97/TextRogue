import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
// components
import StoryAdvancer from '@/components/story/StoryAdvancer';
// remotes
import { getStoryById } from '@/remotes/mongodb/server/story';

interface ScenarioPlayProps {
  params: { id: string };
}
export default async function StoryPage({ params }: ScenarioPlayProps) {
  const session = await getServerSession(authOptions);
  const storyLog = await getStoryById(params.id);

  if (!session?.user && session?.user.id !== storyLog.userId) {
    return redirect('/login');
  }

  return (
    <main>
      <StoryAdvancer story={storyLog} />
    </main>
  );
}
