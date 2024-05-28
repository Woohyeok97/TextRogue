'use client';
import { useQuery } from '@tanstack/react-query';
// components
import StoryFormat from './StoryFormat';
// types
import { StoryType } from '@/models';
// hooks
import useContinueStory from '@/hooks/useContinueStory';

interface StoryAdvancerProps {
  storyId: string;
}
export default function StoryAdvancer({ storyId }: StoryAdvancerProps) {
  const { data: story } = useQuery<StoryType>({ queryKey: ['story', storyId] });
  const continueStory = useContinueStory({ story } as { story: StoryType });

  // 스토리 진행 핸들러
  const handleClick = (choice: string) => {
    continueStory.mutate(choice);
  };

  return (
    <div className="flex flex-col justify-between gap-10">
      {story?.log.map((item, i) => <StoryFormat key={i} story={item} onClick={handleClick} />)}
    </div>
  );
}

// 'use client';
// import { useRouter } from 'next/navigation';
// // components
// import StoryFormat from './StoryFormat';
// // types
// import { StoryType } from '@/models';
// // remotes
// import { continueStory } from '@/remotes/claude/claude';
// import { updateStory } from '@/remotes/mongodb/client/story';

// interface StoryAdvancerProps {
//   story: StoryType;
// }
// export default function StoryAdvancer({ story }: StoryAdvancerProps) {
//   const router = useRouter();
//   const handleClick = async (choice: string) => {
//     const nextStory = await continueStory({
//       genre: story.genre,
//       world: story.world,
//       previousStory: story.log.map(item => item.text).join(''),
//       userChoice: choice,
//     });
//     if (story._id) {
//       const response = await updateStory(story._id, [...story.log, nextStory]);
//       console.log(response);
//       router.refresh();
//     }
//   };

//   return (
//     <div className="flex flex-col justify-between gap-10">
//       {story.log.map((item, i) => (
//         <StoryFormat key={i} story={item} onClick={handleClick} />
//       ))}
//     </div>
//   );
// }
