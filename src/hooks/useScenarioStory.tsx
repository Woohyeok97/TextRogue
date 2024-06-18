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

  // const handleRefetch = () => {
  //   queryClient.invalidateQueries({ queryKey: ['claudePrologue', genre, world] });
  // };

  // const queryData = queryClient.getQueryData<StoryFormatType>(['claudePrologue', genre, world]);

  // const handleSetQueryData = (value: StoryFormatType) => {
  //   queryClient.setQueryData(['claudePrologue', genre, world], value);
  // };

  useEffect(() => {
    if (query.isFetchedAfterMount) {
      console.log('AI Call 호출');
    }
  }, [query.isFetchedAfterMount]);

  return query;
}
