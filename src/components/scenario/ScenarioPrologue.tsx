import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
// components
import { Input } from '../shared/ui/Input';
import { Button } from '../shared/ui/Button';
import { TextArea } from '../shared/ui/TextArea';
import { Text } from '../shared/ui/Text';
import { Skeleton } from '../shared/ui/Skeleton';
// type
import { ScenarioType, StoryFormatType } from '@/models';
// remotes
import { generatePrologue } from '@/remotes/claude/claude';

interface ScenarioPrologueProps {
  onNext: () => void;
  onPrev: () => void;
}
export default function ScenarioPrologue({ onNext, onPrev }: ScenarioPrologueProps) {
  const {
    getValues,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ScenarioType>();
  const { genre, world } = getValues();
  const queryClient = useQueryClient();

  const {
    data: claudePrologue,
    isFetching,
    isFetchedAfterMount,
  } = useQuery<StoryFormatType>({
    queryKey: ['claudePrologue', genre, world],
    queryFn: () => generatePrologue({ genre, world }),
    staleTime: Infinity,
  });

  // 1. 컴포넌트 마운트 & useQuery 실행 -> 쿼리데이터로 prologue 필드값 변경
  useEffect(() => {
    if (isFetchedAfterMount && claudePrologue) {
      setValue('prologue', claudePrologue);
    }
  }, [claudePrologue, isFetchedAfterMount, setValue]);

  // 2-1. 컴포넌트 언마운트 -> 현재 prologue 필드값을 쿼리데이터에 저장
  // 2-2. 컴포넌트 마운트 -> 언마운트로 캐싱된 쿼리데이터로 prologue 필드값 변경
  // 2-3. 1번 실행때 동작x -> 왜? * 의존성 배열에 claudePrologue 안넣음 *(중복 실행 방지)
  useEffect(() => {
    const cached = queryClient.getQueryData<StoryFormatType>(['claudePrologue', genre, world]);
    if (cached) {
      setValue('prologue', cached);
    }
    return () => {
      const prologue = getValues('prologue');
      queryClient.setQueryData(['claudePrologue', genre, world], prologue);
    };
  }, [genre, getValues, queryClient, setValue, world]);

  return (
    <>
      {isFetching ? (
        <>
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <div className="flex flex-col justify-between">
          <div className="mb-5">
            <div className="mb-5">
              <TextArea {...register('prologue.text', { required: true })} label="프롤로그" />
              {errors.prologue?.text && <Text color="orangered">{errors.prologue.text.message}</Text>}
            </div>
            <div>
              {claudePrologue?.choices.map((item, i) => (
                <Input key={item} {...register(`prologue.choices.${i}`, { required: true })} label={`선택지${i + 1}`} />
              ))}
              {errors.prologue?.choices && <Text color="orangered">{errors.prologue.choices.message}</Text>}
            </div>
          </div>
          <div className="mb-8 cursor-pointer">
            <Text
              color="gray"
              align="right"
              onClick={() => queryClient.invalidateQueries({ queryKey: ['claudePrologue', genre, world] })}
            >
              Refetching?
            </Text>
          </div>

          <div className="flex justify-between gap-3">
            <Button onClick={onPrev} color="gray">
              이전
            </Button>
            <Button onClick={onNext}>다음</Button>
          </div>
        </div>
      )}
    </>
  );
}

// import { useEffect } from 'react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useFormContext } from 'react-hook-form';
// // components
// import { Input } from '../shared/ui/Input';
// import { Button } from '../shared/ui/Button';
// import { TextArea } from '../shared/ui/TextArea';
// import { Text } from '../shared/ui/Text';
// // type
// import { ScenarioType } from '@/models';
// // remotes
// import { generatePrologue } from '@/remotes/claude/claude';

// interface ScenarioPrologueProps {
//   onNext: () => void;
// }
// export default function ScenarioPrologue({ onNext }: ScenarioPrologueProps) {
//   const {
//     getValues,
//     register,
//     setValue,
//     trigger,
//     formState: { errors },
//   } = useFormContext<ScenarioType>();
//   const queryClient = useQueryClient();

//   const { mutate } = useMutation({
//     mutationFn: async () => {
//       const prologue = await generatePrologue({ genre: getValues('genre'), world: getValues('world') });
//       return prologue;
//     },
//     onSuccess: prologue => {
//       setValue('prologue', prologue);
//       // 유저 AI 카운트 업데이트 (쿼리키 초기화)
//       queryClient.invalidateQueries({ queryKey: ['userAICount'] });
//     },
//     onError: err => {
//       console.log(err);
//     },
//   });

//   useEffect(() => {
//     if (getValues('genre') && getValues('world') && !getValues('prologue.text')) {
//       // mutate();
//     }
//   }, [getValues, mutate]);

//   const handleClick = async () => {
//     const isValid = await trigger(['prologue.text']);
//     if (isValid) {
//       onNext();
//     }
//   };

//   return (
//     <div className="flex flex-col gap-10">
//       <Text align="center" size="xl">
//         시나리오 프롤로그
//       </Text>
//       {!getValues('prologue.text') ? (
//         <div>생성중...</div>
//       ) : (
//         <>
// <TextArea {...register('prologue.text', { required: true })} />
// {errors.prologue?.text && <Text color="orangered">{errors.prologue.text.message}</Text>}
//           <div className="flex flex-col gap-3">
//             {getValues('prologue').choices.map((item, i) => (
//               <Input key={item} disabled {...register(`prologue.choices.${i}`, { required: true })} />
//             ))}
//             {errors.prologue?.choices && <Text color="orangered">{errors.prologue.choices.message}</Text>}
//           </div>
//         </>
//       )}
//       <Button onClick={handleClick}>다음</Button>
//     </div>
//   );
// }
