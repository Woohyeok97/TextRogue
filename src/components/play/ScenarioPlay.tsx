'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
// components
import { Spacing } from '../shared/Spacing';
// type
import { ScenarioType } from '@/models';

interface ScenarioPlayProps {
  scenario: ScenarioType;
}
export default function ScenarioPlay({ scenario }: ScenarioPlayProps) {
  const { data: choices } = useQuery<string[]>({
    queryKey: ['choices'],
    initialData: [
      '바닥에 떨어진 유리 조각들을 자세히 살펴보기',
      '피해자의 주머니에서 발견된 물건들 확인하기',
      '창문 밖을 관찰하며 상황을 재구성해보기',
    ],
  });

  const { mutate } = useMutation({
    mutationFn: async (select: string) => {
      return select;
    },
    onSuccess: result => {
      console.log(result);
    },
  });
  return (
    <div>
      <div className="bg-gray-500 rounded-full w-10 h-10" />
      <Spacing />
      <div>{scenario.prologue}</div>
      <Spacing size="md" />
      <div className="flex flex-col gap-4">
        {choices.map((item, i) => (
          <div
            key={i}
            onClick={() => mutate(item)}
            className="px-8 py-4 bg-white rounded-lg cursor-pointer dark:bg-gray-800 duration-300 hover:bg-gray-700"
          >
            {i + 1}. {item}
          </div>
        ))}
      </div>
    </div>
  );
}
