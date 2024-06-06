import { useQuery } from '@tanstack/react-query';
// remotes
import { getUserAICall } from '@/remotes/mongodb/client/userAICall';
import { Text } from './ui/Text';

interface AICallCountProps {
  userId: string;
}
export default function UserAICount({ userId }: AICallCountProps) {
  const { data: userAICount } = useQuery({
    queryKey: ['userAICount', userId],
    queryFn: () => getUserAICall(userId),
  });

  return (
    <div className="flex gap-1">
      <Text size="xl" weigth="bold">
        AI
      </Text>
      <Text size="xl">{userAICount?.todayCount || 0} / 2</Text>
    </div>
  );
}
