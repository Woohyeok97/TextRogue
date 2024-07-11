import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
// components
import PageLayout from '@/components/shared/ui/PageLayout';
import ScenarioItem from '@/components/shared/ScenarioItem';
import StoryItem from '@/components/shared/StoryItem';
import { Text } from '@/components/shared/ui/Text';
import { Spacing } from '@/components/shared/ui/Spacing';
// remotes
import { getScenarioList } from '@/remotes/mongodb/server/scenario';
import { getUserStoryList } from '@/remotes/mongodb/server/story';
import OverlayTest from './OverlayTest';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const scenarioList = await getScenarioList();
  const userStoryList = session?.user.id ? await getUserStoryList(session.user.id) : null;

  return (
    <PageLayout>
      <OverlayTest />
      {userStoryList && userStoryList.length !== 0 && (
        <div className="flex flex-col justify-between gap-5">
          <Text size="xl">이어서 하기</Text>
          {userStoryList.map(item => (
            <StoryItem key={item._id} story={item} />
          ))}
          <Spacing size="xl" />
        </div>
      )}
      <div className="flex flex-col justify-between gap-5">
        <Text size="xl">시나리오 둘러보기</Text>
        {scenarioList.map(item => (
          <ScenarioItem key={item._id} scenario={item} />
        ))}
      </div>
    </PageLayout>
  );
}
