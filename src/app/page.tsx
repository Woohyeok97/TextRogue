import { getScenarioList } from '@/remotes/server/scenario';

export default async function Home() {
  const scenarioList = await getScenarioList();
  console.log(scenarioList);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Main</h1>
    </main>
  );
}
