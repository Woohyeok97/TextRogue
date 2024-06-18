import { useCallback, useState } from 'react';

interface StepProiverProps<T> {
  children: React.ReactNode;
  name: T;
}
export default function useStep<T extends string>(defaultStep: T) {
  const [currentStep, setCurrentStep] = useState<T>(defaultStep);

  // 스텝변경 함수
  const setStep = (step: T) => {
    setCurrentStep(step);
  };

  // 스텝 프로바이더
  const StepProvider = useCallback(
    ({ children, name }: StepProiverProps<T>) => {
      if (currentStep === name) {
        return <>{children}</>;
      }
    },
    [currentStep]
  );

  return { currentStep, setStep, StepProvider };
}
