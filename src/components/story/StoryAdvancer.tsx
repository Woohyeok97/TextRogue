'use client';
import { useQuery } from '@tanstack/react-query';
// components
import StoryFormat from './StoryFormat';
import { Skeleton } from '../shared/ui/Skeleton';
// types
import { StoryType } from '@/models';
// hooks
import useContinueStory from '@/hooks/useContinueStory';
// remotes
import { getStoryById } from '@/remotes/mongodb/server/story';

interface StoryAdvancerProps {
  storyId: string;
}
export default function StoryAdvancer({ storyId }: StoryAdvancerProps) {
  const { data: story } = useQuery<StoryType>({
    queryKey: ['story', storyId],
    queryFn: () => getStoryById(storyId),
    staleTime: Infinity,
  });

  const continueStory = useContinueStory({ story } as { story: StoryType });
  // 스토리 진행 핸들러
  const handleClick = (choice: string) => {
    continueStory.mutate(choice);
  };

  return (
    <div className="flex flex-col justify-between gap-10">
      {story?.log.map((item, i) => <StoryFormat key={i} story={item} onClick={handleClick} />)}
      {continueStory.isPending && <Skeleton />}
    </div>
  );
}
