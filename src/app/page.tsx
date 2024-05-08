'use client';
import { FormProvider, useForm } from 'react-hook-form';
// components
import Theme from '@/components/Theme';
import Prologue from '@/components/Prologue';
import Overview from '@/components/Overview';
// hooks
import useStep from '@/hooks/useStep';
import { ScenarioType } from '@/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScenarioSchema } from '@/remotes/schema';

export default function Home() {
  const { StepProvider, setStep } = useStep<'theme' | 'prologue' | 'overview'>();
  const methods = useForm<ScenarioType>({ resolver: zodResolver(ScenarioSchema) });
  const view = methods.handleSubmit(data => console.log(data));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
        <button onClick={view}>data</button>
      </FormProvider>
    </main>
  );
}
