'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// components
import Theme from '@/components/Theme';
import Prologue from '@/components/Prologue';
import Overview from '@/components/Overview';
// hooks
import useStep from '@/hooks/useStep';
// type & schema
import { ScenarioType } from '@/models';
import { ScenarioSchema } from '@/remotes/schema';

export default function Home() {
  const { StepProvider, setStep } = useStep<'theme' | 'prologue' | 'overview'>();
  const methods = useForm<ScenarioType>({ resolver: zodResolver(ScenarioSchema), mode: 'onChange' });

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
      </FormProvider>
    </main>
  );
}
