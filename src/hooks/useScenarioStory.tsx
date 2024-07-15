import { useEffect } from 'react';
import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
// hooks
import useOverlay from './useOverlay';
// remotes
import { createScenarioStory } from '@/remotes/api/claude';
// type
import { StoryFormatType } from '@/models';
import Dialog from '@/components/shared/ui/Dialog';

export default function useScenarioStory({ genre, world }: { genre: string; world: string }) {
  const queryClient = useQueryClient();
  const { open, close } = useOverlay();
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
      open(<Dialog onClose={close}>{query.error.message}</Dialog>);
    }
  }, [query.isError]);

  useEffect(() => {
    if (query.isFetchedAfterMount) {
      queryClient.invalidateQueries({ queryKey: ['userAICount'] });
    }
  }, [query.isFetchedAfterMount, query.data]);

  return query;
}
