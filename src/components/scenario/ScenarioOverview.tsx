import { useFormContext } from 'react-hook-form';
// components
import { Input } from '../shared/ui/Input';
import { Text } from '../shared/ui/Text';
import { TextArea } from '../shared/ui/TextArea';
import { Button } from '../shared/ui/Button';
import BottomSheet from '../shared/ui/Bottomsheet';
import ScenarioPreview from './ScenarioPreview';
// hooks
import useOverlay from '@/hooks/useOverlay';
// type
import { ScenarioType } from '@/models';

interface ScenarioOverviewProps {
  onSubmit: () => void;
  onPrev: () => void;
}
export default function ScenarioOverview({ onSubmit, onPrev }: ScenarioOverviewProps) {
  const { open } = useOverlay();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ScenarioType>();

  // 미리보기 핸들러
  const handlePreview = handleSubmit(scenario => {
    open(close => (
      <BottomSheet>
        <ScenarioPreview scenario={scenario} onClose={close} onSubmit={onSubmit} />
      </BottomSheet>
    ));
  });

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <div>
          <Input {...register('title', { required: true })} label="타이틀" />
          {errors.title && (
            <div className="mt-4">
              <Text color="orangered">{errors.title.message}</Text>
            </div>
          )}
        </div>
        <div>
          <TextArea {...register('description', { required: true })} label="소개" />
          {errors.description && (
            <div className="mt-4">
              <Text color="orangered">{errors.description.message}</Text>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <Button onClick={onPrev} color="gray" width="full">
          이전
        </Button>
        <Button onClick={handlePreview} width="full">
          미리보기
        </Button>
      </div>
    </div>
  );
}
