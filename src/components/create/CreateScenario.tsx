'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// components
import Theme from './Theme';
import Prologue from './Prologue';
import Overview from './Overview';
// hooks
import useStep from '@/hooks/useStep';
// type & schema
import { ScenarioType } from '@/models';
import { ScenarioSchema } from '@/remotes/schema';

export default function CreateScenario() {
  const methods = useForm<ScenarioType>({ resolver: zodResolver(ScenarioSchema), mode: 'onChange' });
  const { StepProvider, setStep } = useStep<'theme' | 'prologue' | 'overview'>();

  return (
    <>
      <FormProvider {...methods}>
        <StepProvider name="theme" isDefault={true}>
          <Theme onNext={() => setStep('prologue')} />
        </StepProvider>
        <StepProvider name="prologue">
          <Prologue onNext={() => setStep('overview')} />
        </StepProvider>
        <StepProvider name="overview">
          <Overview />
        </StepProvider>
      </FormProvider>
      <button onClick={() => console.log(methods.getValues())}>veiw</button>
    </>
  );
}
