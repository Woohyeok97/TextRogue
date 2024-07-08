import Image from 'next/image';
import penImg from '@/../public/펜.png';
import { useQuery } from '@tanstack/react-query';
// components
import { Text } from './ui/Text';
// remotes
import { getUserAICount } from '@/remotes/mongodb/userAICount';

interface UserAICountProps {
  userId: string;
}
export default function UserAICount({ userId }: UserAICountProps) {
  const { data: userAICount } = useQuery({
    queryKey: ['userAICount'],
    queryFn: () => getUserAICount(userId),
  });

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="w-5 h-5">
        <Image src={penImg} width={100} height={100} sizes="100%" alt="ai-count" className="object-cover" />
      </div>
      <Text color="gray" size="sm" weigth="bold">
        {userAICount?.todayCount} / 5
      </Text>
    </div>
  );
}
