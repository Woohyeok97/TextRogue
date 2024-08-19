// import Image from 'next/image';
// // components
// import { Spacing } from '../shared/ui/Spacing';
// // type
// import { StoryFormatType } from '@/models';
// import { memo } from 'react';

// interface StoryFormatProps {
//   story: StoryFormatType;
//   onClick: (choice: string) => void;
// }
// export default function StoryFormat({ story, onClick }: StoryFormatProps) {
//   console.log(story.select);
//   // 선택지 핸들러: 선택하지 않은 상태에서만 실행(story.selected 체크)
//   const handleClick = (item: string) => {
//     if (story.select) {
//       return;
//     }
//     onClick(item);
//   };

//   return (
//     <div>
//       <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
//         <Image
//           width={100}
//           height={100}
//           sizes="100%"
//           src="/images/올라프.webp"
//           className="object-cover w-full h-full"
//           alt="avatar"
//         />
//       </div>

//       <Spacing />
//       <div>{story.text}</div>
//       <Spacing size="sm" />
//       <div className="flex flex-col gap-4">
//         {story.choices.map(item => (
//           <div
//             key={item}
//             onClick={() => handleClick(item)}
//             className={`px-8 py-4 rounded-lg
//               ${story.select ? 'dark:bg-gray-900' : 'cursor-pointer dark:bg-gray-800 duration-300 hover:bg-gray-700'}
//               ${story.select === item && 'border border-blue-500'}
//             `}
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import Image from 'next/image';
// components
import { Spacing } from '../shared/ui/Spacing';
// type
import { StoryFormatType } from '@/models';
import { memo } from 'react';

interface StoryFormatProps {
  story: StoryFormatType;
  onClick: (choice: string) => void;
  select?: string;
}
const StoryFormat = memo(function StoryFormat({ story, onClick, select }: StoryFormatProps) {
  console.log(select);
  // 선택지 핸들러: 선택하지 않은 상태에서만 실행(story.selected 체크)
  const handleClick = (item: string) => {
    if (select) {
      return;
    }
    onClick(item);
  };

  return (
    <div>
      <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
        <Image
          width={100}
          height={100}
          sizes="100%"
          src="/images/올라프.webp"
          className="object-cover w-full h-full"
          alt="avatar"
        />
      </div>

      <Spacing />
      <div>{story.text}</div>
      <Spacing size="sm" />
      <div className="flex flex-col gap-4">
        {story.choices.map(item => (
          <div
            key={item}
            onClick={() => handleClick(item)}
            className={`px-8 py-4 rounded-lg
              ${select ? 'dark:bg-gray-900' : 'cursor-pointer dark:bg-gray-800 duration-300 hover:bg-gray-700'}
              ${select === item && 'border border-blue-500'}
            `}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
});

export default StoryFormat;

// import Image from 'next/image';
// // components
// import { Spacing } from '../shared/ui/Spacing';
// // type
// import { StoryFormatType } from '@/models';

// interface StoryFormatProps {
//   story: StoryFormatType;
//   onClick: (choice: string) => void;
//   isLast: boolean;
// }
// export default function StoryFormat({ story, onClick, isLast }: StoryFormatProps) {
//   console.log('storyFormat render!', story.text);
//   return (
//     <div>
//       <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
//         <Image
//           width={100}
//           height={100}
//           sizes="100%"
//           src="/images/올라프.webp"
//           className="object-cover w-full h-full"
//           alt="avatar"
//         />
//       </div>

//       <Spacing />
//       <div>{story.text}</div>
//       <Spacing size="sm" />
//       <div className="flex flex-col gap-4">
//         {story.choices.map((item, i) => (
//           <div
//             key={i}
//             onClick={() => onClick(item)}
//             className={`px-8 py-4 bg-white rounded-lg cursor-pointer ${isLast ? 'dark:bg-gray-800 duration-300 hover:bg-gray-700' : 'dark:bg-gray-900'} `}
//           >
//             {i + 1}. {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
