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
  const { data: claudePrologue, isFetchedAfterMount, isFetching } = useScenarioStory({ genre, world });

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
