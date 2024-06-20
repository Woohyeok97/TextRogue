import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
// remotes
import { createScenarioStory } from '@/remotes/api/claude';
// type
import { StoryFormatType } from '@/models';

export default function useScenarioStory({ genre, world }: { genre: string; world: string }) {
  const session = useSession();

  const query = useQuery<StoryFormatType>({
    queryKey: ['claudePrologue', genre, world],
    queryFn: () => createScenarioStory({ userId: session.data?.user.id!, genre, world }),
    staleTime: Infinity,
    retry: 0,
  });

  // 유저 AI count 체크
  useEffect(() => {
    if (query.isError) {
      alert(query.error.message);
    }
  }, [query.isError]);

  return query;
}
