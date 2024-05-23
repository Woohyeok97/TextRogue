// components
import ScenarioItem from '@/components/shared/ScenarioItem';
// remotes
import { getScenarioList } from '@/remotes/mongodb/server/scenario';

export default async function Home() {
  const scenarioList = await getScenarioList();

  return (
    <main>
      <div className="flex flex-col justify-between gap-5">
        {scenarioList.map(item => (
          <ScenarioItem key={item._id} scenario={item} />
        ))}
      </div>
    </main>
  );
}
