'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// components
import StoryItem from './StoryItem';
// types
import { ScenarioType, StoryType } from '@/models';
// remotes
import { continueStory } from '@/remotes/claude/claude';

interface StoryAdvancerProps {
  scenario: ScenarioType;
}

export default function StoryAdvancer({ scenario }: StoryAdvancerProps) {
  const queryClient = useQueryClient();
  const { data: stories } = useQuery<StoryType[]>({
    queryKey: ['story', scenario._id],
    initialData: [
      {
        text: '나는 깊은 숨을 내쉬며 침착하게 주변을 둘러보았다. 방 안에는 죽어있는 그의 시체가 있었고, 주변에는 흐트러진 물건들이 널브러져 있었다. 분명 이곳에는 무언가 숨겨진 비밀이 있을 것이다. 하지만 증거는 희미하고 단서는 부족했다. 이대로는 이 사건을 해결할 수 없을 것 같다. 내가 집중력을 잃고 있을 때, 주변을 살펴보다 문득 눈에 띄는 것이 있었다. 이것이 단서가 될 수 있을까? 내가 이 사건의 진실을 밝힐 수 있을지 걱정되지만, 적어도 시도해볼 순 있겠다. ',
        choices: [
          '바닥에 떨어진 유리 조각들을 자세히 살펴보기',
          '피해자의 주머니에서 발견된 물건들 확인하기',
          '창문 밖을 관찰하며 상황을 재구성해보기',
        ],
      },
    ],
  });

  const { mutate } = useMutation({
    onMutate: (choice: string) => {
      console.log(`mutate 실행!! 이전 스토리: ${stories.map(item => item.text).join('')}   유저 선택: ${choice}`);
    },
    mutationFn: async (choice: string) => {
      const nextStory = await continueStory({
        genre: scenario.genre,
        world: scenario.world,
        previousStory: stories.map(item => item.text).join(''),
        userChoice: choice,
      });
      return nextStory;
    },
    onSuccess: nextStory => {
      console.log('클로드 응답!!', nextStory);
      queryClient.setQueryData<StoryType[]>(['story', scenario._id], prev => {
        return [...(prev || []), nextStory];
      });
    },
    onError: err => {
      console.log(err);
    },
  });
  console.log('stories', stories);
  const handleClick = (choice: string) => {
    mutate(choice);
  };

  return (
    <div className="flex flex-col justify-between gap-10">
      {stories.map((item, i) => (
        <StoryItem key={i} story={item} onClick={handleClick} />
      ))}
    </div>
  );
}
