'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// components
import ScenarioTheme from './ScenarioTheme';
import Prologue from './Prologue';
import Overview from './Overview';
// hooks
import useStep from '@/hooks/useStep';
// type & schema
import { ScenarioType } from '@/models';
import { ScenarioSchema } from '@/remotes/schema';

type StepType = 'theme' | 'prologue' | 'overview';

export default function CreateScenario() {
  const { setStep, StepProvider } = useStep<StepType>('theme');
  const methods = useForm<ScenarioType>({ resolver: zodResolver(ScenarioSchema), mode: 'onChange' });

  const handleNext = async (fields: (keyof ScenarioType)[], step: StepType) => {
    const isValid = await methods.trigger(fields);
    if (isValid) {
      setStep(step);
    }
  };

  console.log('parent render!');
  return (
    <>
      <FormProvider {...methods}>
        <StepProvider name="theme">
          <ScenarioTheme onNext={() => handleNext(['genre', 'world'], 'prologue')} />
        </StepProvider>
        <StepProvider name="prologue">
          <Prologue onNext={() => handleNext(['prologue'], 'overview')} />
        </StepProvider>
        <StepProvider name="overview">
          <Overview />
        </StepProvider>
      </FormProvider>
      <button className="mt-7" onClick={() => console.log(methods.formState.errors)}>
        Value
      </button>
    </>
  );
}

// 'use client';
// import { FormProvider, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// // components
// import ScenarioTheme from './ScenarioTheme';
// import Prologue from './Prologue';
// import Overview from './Overview';
// // hooks
// import useStep from '@/hooks/useStep';
// // type & schema
// import { ScenarioType } from '@/models';
// import { ScenarioSchema } from '@/remotes/schema';

// export default function CreateScenario() {
//   const { StepProvider, setStep } = useStep<'theme' | 'prologue' | 'overview'>();
//   const methods = useForm<ScenarioType>({ resolver: zodResolver(ScenarioSchema), mode: 'onChange' });
//   // 예시)
//   // 3단계 -> 1단계 입력있음 (2단계 입력없음) -> 2단계로 페이지 이동
//   // 3단계 -> (1단계 없음) 2단계 입력있음 -> 1단계로 페이지 이동
//   // ~ 값이 false면 ~스텝으로 변경해
//   // 장르, 테마
//   // 프롤로그
//   // [] => 1
//   // [[장르, 테마]] => 2
//   // [[장르, 테마], [프롤로그], [제목, 설명]]
//   // 제목, 설명
//   const valid = async (step: 'theme' | 'prologue' | 'overview') => {
//     const v = await methods.trigger(['genre', 'world']);
//     if (!v) {
//       setStep(step);
//     }
//   };
//   return (
//     <>
//       <FormProvider {...methods}>
//         <StepProvider name="theme" isDefault={true}>
//           <ScenarioTheme onNext={() => setStep('prologue')} />
//         </StepProvider>
//         <StepProvider name="prologue" isValid={() => valid('theme')}>
//           <Prologue onNext={() => setStep('overview')} />
//         </StepProvider>
//         <StepProvider name="overview">
//           <Overview />
//         </StepProvider>
//       </FormProvider>
//     </>
//   );
// }
