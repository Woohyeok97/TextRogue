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
// import { useCallback, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// interface StepProviderProps<T> {
//   children: React.ReactNode;
//   name: T;
//   isDefault?: boolean;
//   isValid?: () => void;
// }
// export default function useStep<T extends string>() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const currentStep = searchParams.get('step');

//   // 스텝변경 함수
//   const setStep = (step: T) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('step', step);
//     router.push(`?${params.toString()}`);
//   };

//   // 스텝 컴포넌트(메모이징)
//   const StepProvider = useCallback(
//     ({ children, name, isDefault, isValid }: StepProviderProps<T>) => {
//       if (isValid) isValid()
//       if (currentStep === null && isDefault) {
//         return <>{children}</>;
//       }
//       if (currentStep === name) {
//         return <>{children}</>;
//       } else {
//         return null;
//       }
//     },
//     [currentStep]
//   );

//   return { currentStep, StepProvider, setStep };
// }
