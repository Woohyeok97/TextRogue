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
    <div className="flex flex-col justify-between">
      <div className="mb-8">
        <div className="mb-5">
          <Input {...register('title', { required: true })} label="타이틀" />
          {errors.title && <Text color="orangered">{errors.title.message}</Text>}
        </div>
        <div>
          <TextArea {...register('description', { required: true })} label="소개" />
          {errors.description && <Text color="orangered">{errors.description.message}</Text>}
        </div>
      </div>
      <div className="flex justify-between gap-3">
        <Button onClick={onPrev} color="gray">
          이전
        </Button>
        <Button onClick={handlePreview}>미리보기</Button>
      </div>
    </div>
  );
}
