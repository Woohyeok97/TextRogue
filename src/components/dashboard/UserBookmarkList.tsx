// components
import ScenarioItem from '@/components/shared/ScenarioItem';
import { Text } from '@/components/shared/ui/Text';
// remotes
import { getUserBookmarkList } from '@/remotes/mongodb/server/scenario';

interface UserBookmarkListProps {
  userId: string;
}
export default async function UserBookmarkList({ userId }: UserBookmarkListProps) {
  const userBookmarkList = await getUserBookmarkList(userId);

  return (
    <div className="flex flex-col gap-3 my-8">
      <Text size="xl">나의 북마크</Text>
      {userBookmarkList.length ? (
        userBookmarkList.map(item => <ScenarioItem key={item._id} scenario={item} />)
      ) : (
        <Text color="gray">북마크한 시나리오가 없습니다.</Text>
      )}
    </div>
  );
}
