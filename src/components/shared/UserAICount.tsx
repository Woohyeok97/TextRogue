import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
// components
import { Text } from './ui/Text';
// remotes
import { getUserAICall } from '@/remotes/mongodb/client/userAICall';

interface AICallCountProps {
  userId: string;
}
export default function UserAICount({ userId }: AICallCountProps) {
  const { data: userAICount } = useQuery({
    queryKey: ['userAICount', userId],
    queryFn: () => getUserAICall(userId),
  });

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="w-5 h-5">
        <Image src="/펜.png" width={100} height={100} sizes="100%" alt="ai-count" className="object-cover" />
      </div>
      <Text color="gray" size="sm" weigth="bold">
        {userAICount?.todayCount || 0} / 5
      </Text>
    </div>
  );
}
