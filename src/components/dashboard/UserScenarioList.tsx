// components
import ScenarioItem from '@/components/shared/ScenarioItem';
import { Text } from '@/components/shared/ui/Text';
// remotes
import { getUserScenarioList } from '@/remotes/mongodb/server/scenario';

interface UserScenarioListProps {
  userId: string;
}
export default async function UserScenarioList({ userId }: UserScenarioListProps) {
  const userScenarioList = await getUserScenarioList(userId);

  return (
    <div className="flex flex-col gap-3 my-8">
      <Text size="xl">나의 시나리오</Text>
      {userScenarioList.length ? (
        userScenarioList.map(item => <ScenarioItem key={item._id} scenario={item} />)
      ) : (
        <Text color="gray">생성한 시나리오가 없습니다.</Text>
      )}
    </div>
  );
}
