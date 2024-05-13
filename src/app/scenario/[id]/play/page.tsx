import { Metadata } from 'next';
// components
import ScenarioPlay from '@/components/play/ScenarioPlay';
import { Spacing } from '@/components/shared/Spacing';
// remotes
import { getScenarioById } from '@/remotes/server/scenario';

export const metadata: Metadata = {
  title: '',
  description: '',
};

interface ScenarioPlayProps {
  params: { id: string };
}
export default async function PlayPage({ params }: ScenarioPlayProps) {
  const scenario = await getScenarioById(params.id);
  // console.log(scenario);
  return (
    <main>
      <h1>ScenarioPlay</h1>
      <Spacing size="lg" />
      <ScenarioPlay scenario={scenario} />
      <Spacing size="lg" />
    </main>
  );
}
