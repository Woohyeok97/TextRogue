// components
import StoryAdvancer from '@/components/story/StoryAdvancer';
import { Spacing } from '@/components/shared/Spacing';
// remotes
import { getScenarioById } from '@/remotes/mongodb/server/scenario';

interface ScenarioPlayProps {
  params: { id: string };
}
export default async function StoryPage({ params }: ScenarioPlayProps) {
  const scenario = await getScenarioById(params.id);
  // console.log(scenario);
  return (
    <main>
      <h1>ScenarioPlay</h1>
      <Spacing size="lg" />
      <StoryAdvancer scenario={scenario} />
      <Spacing size="lg" />
    </main>
  );
}
