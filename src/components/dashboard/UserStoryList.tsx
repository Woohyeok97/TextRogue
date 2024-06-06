// components
import StoryItem from '../shared/StoryItem';
import { Text } from '@/components/shared/ui/Text';
// remotes
import { getUserStoryList } from '@/remotes/mongodb/server/story';

interface UserStoryListProps {
  userId: string;
}
export default async function UserStoryList({ userId }: UserStoryListProps) {
  const userStoryList = await getUserStoryList(userId);

  return (
    <div className="flex flex-col gap-3 my-8">
      <Text size="xl">진행중인 스토리</Text>
      {userStoryList.length ? (
        userStoryList.map(item => <StoryItem key={item._id} story={item} />)
      ) : (
        <Text color="gray">진행중인 스토리가 없습니다.</Text>
      )}
    </div>
  );
}
