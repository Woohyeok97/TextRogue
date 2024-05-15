// components
import { Spacing } from '../shared/Spacing';
// type
import { StoryType } from '@/models';

interface StoryItemProps {
  story: StoryType;
  onClick: (choice: string) => void;
}
export default function StoryItem({ story, onClick }: StoryItemProps) {
  return (
    <div>
      <div className="bg-gray-500 rounded-full w-10 h-10" />
      <Spacing />
      <div>{story.text}</div>
      <Spacing size="sm" />
      <div className="flex flex-col gap-4">
        {story.choices.map((item, i) => (
          <div
            key={i}
            onClick={() => onClick(item)}
            className="px-8 py-4 bg-white rounded-lg cursor-pointer dark:bg-gray-800 duration-300 hover:bg-gray-700"
          >
            {i + 1}. {item}
          </div>
        ))}
      </div>
    </div>
  );
}
