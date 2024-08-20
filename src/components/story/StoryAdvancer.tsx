'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
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
  const { data: story } = useSuspenseQuery<StoryType>({
    queryKey: ['story', storyId],
    queryFn: () => getStoryById(storyId),
    staleTime: Infinity,
  });
  const { mutate, isPending } = useContinueStory({ story });

  return (
    <div className="flex flex-col justify-between gap-10">
      {story.log.map((item, i) => (
        <StoryFormat key={i} story={item} onClick={mutate} />
      ))}
      {isPending && <Skeleton />}
    </div>
  );
}
