'use client';
// components
import { Button } from './ui/Button';
// type
import { ScenarioType } from '@/models';
// remotes
import { createStory } from '@/remotes/mongodb/client/story';
import { useRouter } from 'next/navigation';

interface ScenarioPlayProps {
  scenario: ScenarioType;
  userId?: string;
}
export default function CreateStory({ scenario, userId }: ScenarioPlayProps) {
  const router = useRouter();
  const handleClick = async () => {
    if (!userId) {
      return alert('로그인 이후 이용해주세요.');
    }
    if (scenario._id) {
      const result = await createStory({
        scenarioId: scenario._id,
        title: scenario.title,
        genre: scenario.genre,
        world: scenario.world,
        description: scenario.description,
        userId: userId,
        log: [scenario.prologue],
      });
      router.push(`/story/${result}`);
    }
  };
  return (
    <Button onClick={handleClick} width="full">
      Play
    </Button>
  );
}
