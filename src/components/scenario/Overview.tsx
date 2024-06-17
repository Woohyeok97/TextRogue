import { useRouter } from 'next/navigation';
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
// reomotes
import { createScenario } from '@/remotes/mongodb/client/scenario';

export default function Overview() {
  const { open } = useOverlay();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ScenarioType>();

  // 시나리오 생성 핸들러
  const handleClick = handleSubmit(async formData => {
    await createScenario(formData);
    alert('시나리오가 생성되었습니다.');
    router.push('/');
  });

  // 미리보기 핸들러
  const handlePreview = handleSubmit(scenario => {
    open(close => (
      <BottomSheet>
        <ScenarioPreview scenario={scenario} onClose={close} onSubmit={handleClick} />
      </BottomSheet>
    ));
  });

  return (
    <div className="flex flex-col gap-10">
      <Text align="center" size="xl">
        시나리오 오버뷰
      </Text>
      <>
        <Input {...register('title', { required: true })} label="타이틀" />
        {errors.title && <Text color="orangered">{errors.title.message}</Text>}
        <TextArea {...register('description', { required: true })} label="시나리오 설명" />
        {errors.description && <Text color="orangered">{errors.description.message}</Text>}
        <Button onClick={handlePreview}>미리보기</Button>
      </>
    </div>
  );
}
