import { memo } from 'react';
import Image from 'next/image';
// components
import { Spacing } from '../shared/ui/Spacing';
// type
import { StoryFormatType } from '@/models';

interface StoryFormatProps {
  story: StoryFormatType;
  onClick: (choice: string) => void;
}
// 핸들러 실행시, 다른 형제 StoryFormat 컴포넌트의 리렌더링을 막기위해 memo 메모이징
const StoryFormat = memo(function StoryFormat({ story, onClick }: StoryFormatProps) {
  // 선택하지 않은 상태에서만 핸들러 실행
  const handleClick = (item: string) => {
    if (story.select) {
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
          alt="master"
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
              ${story.select ? 'dark:bg-gray-900' : 'cursor-pointer dark:bg-gray-800 duration-300 hover:bg-gray-700'}
              ${story.select === item && 'border border-blue-500'}
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
