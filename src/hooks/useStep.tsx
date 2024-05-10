import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface StepProviderProps<T> {
  children: React.ReactNode;
  name: T;
  isDefault?: boolean;
}
export default function useStep<T extends string>() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentStep = searchParams.get('step');

  // 스텝변경 함수
  const setStep = (step: T) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', step);
    router.push(`?${params.toString()}`);
  };

  // 스텝 컴포넌트(메모이징)
  const StepProvider = useCallback(
    ({ children, name, isDefault }: StepProviderProps<T>) => {
      if (currentStep === null && isDefault) {
        return <>{children}</>;
      }
      if (currentStep === name) {
        return <>{children}</>;
      } else {
        return null;
      }
    },
    [currentStep]
  );

  return { currentStep, StepProvider, setStep };
}
