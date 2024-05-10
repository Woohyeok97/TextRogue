import ScenarioItem from '@/components/shared/ScenarioItem';
import { getScenarioList } from '@/remotes/server/scenario';

export default async function Home() {
  const scenarioList = await getScenarioList();

  return (
    <main>
      <h1>Main</h1>
      <div className="flex flex-col justify-between gap-5">
        {scenarioList.map(item => (
          <ScenarioItem key={item._id} scenario={item} />
        ))}
      </div>
    </main>
  );
}
