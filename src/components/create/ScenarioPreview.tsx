// types
import { ScenarioType } from '@/models';
import { Text } from '../shared/Text';
import { Button } from '../shared/Button';

interface ScenarioPreviewProps {
  scenario: ScenarioType;
  onSubmit: () => void;
  onClose: () => void;
}
export default function ScenarioPreview({ scenario, onSubmit, onClose }: ScenarioPreviewProps) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <Text size="xl">{scenario.title}</Text>
        <div className="flex gap-3">
          <div className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
            {scenario.genre}
          </div>
          <div className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
            {scenario.world}
          </div>
        </div>

        <div className="mt-2">
          <Text color="gray">{scenario.prologue.text}</Text>
        </div>
      </div>
      <div className="flex flex-col mt-5 sm:mt-6 gap-3 sm:flex-row-reverse">
        <Button onClick={onSubmit}>생성하기</Button>
        <Button color="gray" onClick={onClose}>
          다음에
        </Button>
      </div>
    </>
  );
}
