import { useMutation, useQueryClient } from '@tanstack/react-query';
import Dialog from '@/components/shared/ui/Dialog';
import MessageAlert from '@/components/shared/MessageAlert';
// hooks
import useOverlay from './useOverlay';
// remotes
import { createNextStory } from '@/remotes/api/claude';
import { updateStoryLog } from '@/remotes/mongodb/server/story';
// type
import { StoryType } from '@/models';

export default function useContinueStory({ story }: { story: StoryType }) {
  const queryClient = useQueryClient();
  const { open, close } = useOverlay();

  return useMutation({
    //  Optimistic Updates -> 선택한 log 요소.select 필드값 생성
    onMutate: (select: string) => {
      const previousStory = queryClient.getQueryData<StoryType>(['story', story._id]); // 우선 원본 story 데이터 가져오기

      // log 마지막 요소.select에 필드값 생성 -> 이때, story는 참조형 데이터가 중첩 되어있어서(객체 -> 배열 -> 객체) 깊은복사를 사용
      // story 안에 있는 log라는 참조형 데이터까지 깊게 복사 -> 얕은복사하면 previousStory와 updateSelect의 log가 동일한 참조를 가짐;
      const updateSelect = { ...previousStory, log: previousStory?.log.map(item => ({ ...item })) };
      if (updateSelect.log?.length) {
        updateSelect.log[updateSelect.log?.length - 1].select = select;
      }
      queryClient.setQueryData(['story', story._id], { ...updateSelect });

      return { previousStory }; // 원본 story 데이터를 반환(에러발생 백업용)
    },
    mutationFn: async (select: string) => {
      const prompt = {
        genre: story.genre,
        world: story.world,
        userChoice: select,
        previousStory: story.log.map(item => item.text).join(''),
      };
      // Claude API를 사용한 log 데이터 생성
      const nextStory = await createNextStory({ userId: story.userId, prompt });
      // 유저의 선택지 및 생성한 log 데이터로 DB 업데이트
      await updateStoryLog({
        storyId: story._id!,
        select: select,
        nextStory: nextStory,
      });
      // 생성한 log 데이터는 버리지않고 반환
      return nextStory;
    },
    onSuccess: nextStory => {
      // story 데이터 업데이트 (업데이트된 DB 데이터 refetching 없이, 캐시 데이터만 변경)
      queryClient.setQueryData(['story', story._id], (prev: StoryType) => ({
        ...prev,
        log: [...prev.log, nextStory],
      }));
      // 유저 AI 카운트 업데이트 (쿼리키 초기화)
      queryClient.invalidateQueries({ queryKey: ['userAICount'] });
    },
    onError: (err, _, context) => {
      // 에러 발생시, 백업한 previousStory를 사용하여 롤백 처리
      queryClient.setQueryData(['story', story._id], context?.previousStory);

      open(
        <Dialog>
          <MessageAlert onClick={close}>{err.message}</MessageAlert>
        </Dialog>,
      );
    },
  });
}
