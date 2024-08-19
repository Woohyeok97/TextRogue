import { useMutation, useQueryClient } from '@tanstack/react-query';
import Dialog from '@/components/shared/ui/Dialog';
// hooks
import useOverlay from './useOverlay';
// remotes
import { createNextStory } from '@/remotes/api/claude';
// type
import { StoryType } from '@/models';
import MessageAlert from '@/components/shared/MessageAlert';
import { updateStoryLog } from '@/remotes/mongodb/server/story';

export default function useContinueStory({ story }: { story: StoryType }) {
  const queryClient = useQueryClient();
  const { open, close } = useOverlay();

  const { mutate, isPending } = useMutation({
    onMutate: (select: string) => {
      const previousStory = queryClient.getQueryData<StoryType>(['story', story._id]);
      const userSelected = { ...previousStory, log: previousStory?.log.map(item => ({ ...item })) };
      if (userSelected.log?.length) {
        userSelected.log[userSelected.log?.length - 1].select = select;
      }
      queryClient.setQueryData(['story', story._id], userSelected);
      return { previousStory };
    },
    mutationFn: async (select: string) => {
      const prompt = {
        genre: story.genre,
        world: story.world,
        userChoice: select,
        previousStory: story.log.map(item => item.text).join(''),
      };
      const nextStory = await createNextStory({ userId: story.userId, prompt });
      await updateStoryLog({
        storyId: story._id!,
        select: select,
        nextStory: nextStory,
      });
      return nextStory;
    },
    onSuccess: nextStory => {
      // story 데이터 업데이트 (캐시 데이터 변경)
      queryClient.setQueryData(['story', story._id], (prev: StoryType) => ({
        ...prev,
        log: [...prev.log, nextStory],
      }));
      // 유저 AI 카운트 업데이트 (쿼리키 초기화)
      queryClient.invalidateQueries({ queryKey: ['userAICount'] });
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['story', story._id], context?.previousStory);

      open(
        <Dialog>
          <MessageAlert onClick={close}>{err.message}</MessageAlert>
        </Dialog>,
      );
    },
  });

  return { mutate, isPending };
}

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import Dialog from '@/components/shared/ui/Dialog';
// // hooks
// import useOverlay from './useOverlay';
// // remotes
// import { updateStory } from '@/remotes/mongodb/client/story';
// import { createNextStory } from '@/remotes/api/claude';
// // type
// import { StoryType } from '@/models';
// import MessageAlert from '@/components/shared/MessageAlert';

// export default function useContinueStory({ story }: { story: StoryType }) {
//   const queryClient = useQueryClient();
//   const { open, close } = useOverlay();

//   return useMutation({
//     mutationFn: async (choice: string) => {
//       const prompt = {
//         genre: story.genre,
//         world: story.world,
//         userChoice: choice,
//         previousStory: story.log.map(item => item.text).join(''),
//       };
//       const nextStory = await createNextStory({ userId: story.userId, prompt });
//       await updateStory({
//         storyId: story._id!,
//         storyLog: [...story.log, nextStory],
//       });
//       return nextStory;
//     },
//     onSuccess: nextStory => {
//       // story 데이터 업데이트 (캐시 데이터 변경)
//       queryClient.setQueryData(['story', story._id], (prev: StoryType) => ({
//         ...prev,
//         log: [...prev.log, nextStory],
//       }));
//       // 유저 AI 카운트 업데이트 (쿼리키 초기화)
//       queryClient.invalidateQueries({ queryKey: ['userAICount'] });
//     },
//     onError: err => {
//       open(
//         <Dialog>
//           <MessageAlert onClick={close}>{err.message}</MessageAlert>
//         </Dialog>,
//       );
//       // alert(err.message);
//     },
//   });
// }
