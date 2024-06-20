'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
// components
import ScenarioTheme from './ScenarioTheme';
import ScenarioStory from './ScenarioStory';
import ScenarioOverview from './ScenarioOverview';
// hooks
import useStep from '@/hooks/useStep';
// type & schema
import { ScenarioType } from '@/models';
import { ScenarioSchema } from '@/remotes/schema';
// remotes
import { createScenario } from '@/remotes/mongodb/client/scenario';
import { Text } from '../shared/ui/Text';

type StepType = 'theme' | 'prologue' | 'overview';

interface CreateScenarioProps {
  userId: string;
}
export default function CreateScenario({ userId }: CreateScenarioProps) {
  const { setStep, StepProvider } = useStep<StepType>('theme');
  const methods = useForm<ScenarioType>({
    resolver: zodResolver(ScenarioSchema),
    mode: 'onChange',
    defaultValues: {
      userId: userId,
    },
  });
  const route = useRouter();

  // 다음 단계 핸들러
  const handleNext = async (fields: (keyof ScenarioType)[], step: StepType) => {
    const isValid = await methods.trigger(fields);
    if (isValid) {
      setStep(step);
    }
  };

  // 시나리오 생성 핸들러
  const handleCreate = methods.handleSubmit(async data => {
    const createdId = await createScenario(data);
    alert('시나리오 생성 완료');
    route.push(`/scenario/${createdId}`);
  });

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <Text size="max">Create Scenario</Text>
      </div>
      <FormProvider {...methods}>
        <StepProvider name="theme">
          <ScenarioTheme onNext={() => handleNext(['genre', 'world'], 'prologue')} />
        </StepProvider>
        <StepProvider name="prologue">
          <ScenarioStory onNext={() => handleNext(['prologue'], 'overview')} onPrev={() => setStep('theme')} />
        </StepProvider>
        <StepProvider name="overview">
          <ScenarioOverview onSubmit={handleCreate} onPrev={() => setStep('prologue')} />
        </StepProvider>
      </FormProvider>
    </div>
  );
}
