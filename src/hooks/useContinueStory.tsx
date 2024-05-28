import { useMutation, useQueryClient } from '@tanstack/react-query';
// remotes
import { continueStory } from '@/remotes/claude/claude';
import { updateStory } from '@/remotes/mongodb/client/story';
// type
import { StoryType } from '@/models';

export default function useContinueStory({ story }: { story: StoryType }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (choice: string) => {
      const nextStory = await continueStory({
        genre: story.genre,
        world: story.world,
        userChoice: choice,
        previousStory: story.log.map(item => item.text).join(''),
      });
      await updateStory({
        storyId: story._id!,
        storyLog: [...story.log, nextStory],
      });
      return nextStory;
    },
    onSuccess: nextStory => {
      queryClient.setQueryData(['story', story._id], (prev: StoryType) => ({ ...prev, log: [...prev.log, nextStory] }));
    },
    onError: error => {
      console.log(error);
    },
  });
}
