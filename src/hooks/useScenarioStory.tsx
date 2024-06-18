import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// remotes
import { generatePrologue } from '@/remotes/claude/claude';
// type
import { StoryFormatType } from '@/models';

export default function useScenarioStory({ genre, world }: { genre: string; world: string }) {
  const query = useQuery<StoryFormatType>({
    queryKey: ['claudePrologue', genre, world],
    queryFn: () => generatePrologue({ genre, world }),
    staleTime: Infinity,
  });

  // useQuery 실행시, AICallCount 업데이트
  useEffect(() => {
    if (query.isFetchedAfterMount) {
      console.log('AI Call 호출');
    }
  }, [query.isFetchedAfterMount]);

  return query;
}
