import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
// components
import { Input } from '../shared/ui/Input';
import { Button } from '../shared/ui/Button';
import { TextArea } from '../shared/ui/TextArea';
import { Text } from '../shared/ui/Text';
import { Skeleton } from '../shared/ui/Skeleton';
// type
import { ScenarioType, StoryFormatType } from '@/models';
// hooks
import useScenarioStory from '@/hooks/useScenarioStory';

interface ScenarioStoryProps {
  onNext: () => void;
  onPrev: () => void;
}
export default function ScenarioStory({ onNext, onPrev }: ScenarioStoryProps) {
  const {
    getValues,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ScenarioType>();
  const { genre, world } = getValues();
  const queryClient = useQueryClient();

  const { data: claudePrologue, isFetchedAfterMount, isFetching } = useScenarioStory({ genre, world });

  // 1. 컴포넌트 마운트 & useQuery 실행 -> 쿼리데이터로 prologue 필드값 변경
  useEffect(() => {
    if (isFetchedAfterMount && claudePrologue) {
      setValue('prologue', claudePrologue);
    }
  }, [claudePrologue, isFetchedAfterMount, setValue]);

  useEffect(() => {
    // 2-2. 컴포넌트 마운트 -> 언마운트로 캐싱된 쿼리데이터로 prologue 필드값 변경
    const cached = queryClient.getQueryData<StoryFormatType>(['claudePrologue', genre, world]);
    // 2-3. 1번 실행때 동작x -> 왜? * 의존성 배열에 claudePrologue 안넣음 *(중복 실행 방지)
    if (cached) {
      setValue('prologue', cached);
    }
    // 2-1. 컴포넌트 언마운트 -> 현재 prologue 필드값을 쿼리데이터에 저장
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
        <div className="flex-1 flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-5">
                <TextArea {...register('prologue.text', { required: true })} label="프롤로그" />
                {errors.prologue?.text && (
                  <div className="mt-4">
                    <Text color="orangered">{errors.prologue.text.message}</Text>
                  </div>
                )}
              </div>
              <div>
                {claudePrologue?.choices.map((item, i) => (
                  <div className="py-3" key={item}>
                    <Input {...register(`prologue.choices.${i}`, { required: true })} label={`선택지${i + 1}`} />
                  </div>
                ))}
                {errors.prologue?.choices && (
                  <div className="mt-4">
                    <Text color="orangered">{errors.prologue.choices.message}</Text>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <div className="cursor-pointer p-2">
                  <Text
                    color="gray"
                    align="right"
                    size="sm"
                    onClick={() => queryClient.invalidateQueries({ queryKey: ['claudePrologue', genre, world] })}
                  >
                    Refetching?
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <Button onClick={onPrev} color="gray" width="full">
              이전
            </Button>
            <Button onClick={onNext} width="full">
              다음
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
