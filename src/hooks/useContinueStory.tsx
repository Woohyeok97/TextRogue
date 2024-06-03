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
      // story 데이터 업데이트 (캐시 데이터 변경)
      queryClient.setQueryData(['story', story._id], (prev: StoryType) => ({ ...prev, log: [...prev.log, nextStory] }));
      // 유저 AI 카운트 업데이트 (쿼리키 초기화)
      queryClient.invalidateQueries({ queryKey: ['userAICount'] });
    },
    onError: err => {
      console.log(err);
      // alert(`Story 진행 에러발생, 다시 시도해주세요. : ${err.message}`);
    },
  });
}
