import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
// components
import { Input } from '../shared/ui/Input';
import { Button } from '../shared/ui/Button';
import { TextArea } from '../shared/ui/TextArea';
import { Text } from '../shared/ui/Text';
import { Skeleton } from '../shared/ui/Skeleton';
// type
import { ScenarioType } from '@/models';
// remotes
import { generatePrologue } from '@/remotes/claude/claude';

interface ScenarioPrologueProps {
  onNext: () => void;
}
export default function ScenarioPrologue({ onNext }: ScenarioPrologueProps) {
  const {
    getValues,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ScenarioType>();
  const { genre, world } = getValues();

  const { data: prologue, isLoading } = useQuery({
    queryKey: ['scenarioPrologue'],
    queryFn: () => generatePrologue({ genre, world }),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (prologue) {
      setValue('prologue', prologue);
    }
  }, [prologue, setValue]);

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <div className="flex flex-col justify-between">
          <div className="mb-8">
            <div className="mb-8">
              <TextArea {...register('prologue.text', { required: true })} label="프롤로그" />
              {errors.prologue?.text && <Text color="orangered">{errors.prologue.text.message}</Text>}
            </div>
            <div>
              {prologue?.choices.map((item, i) => (
                <Input
                  key={item}
                  disabled
                  {...register(`prologue.choices.${i}`, { required: true })}
                  label={`선택지${i + 1}`}
                />
              ))}
              {errors.prologue?.choices && <Text color="orangered">{errors.prologue.choices.message}</Text>}
            </div>
          </div>

          <Button onClick={onNext}>다음</Button>
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
