import axios from 'axios';
// type & schema
import { ClaudePromptType, StoryFormatType } from '@/models';
import { ClaudePromptSchema, StoryFormatSchema } from '../schema';
// remotes
import { getUserAICount, updateUserAICount } from '../mongodb/userAICount';

// AI 시나리오 스토리 생성
export const createScenarioStory = async ({ userId, genre, world }: CreateScenarioStory): Promise<StoryFormatType> => {
  const userAICount = await getUserAICount(userId);

  if (userAICount.todayCount >= 5) {
    throw new Error('limit');
  }

  const response = await axios.post(`${process.env.NEXT_PUBLIC_CLAUDE_PROLOGUE}`, { genre, world });
  await updateUserAICount(userId);

  return StoryFormatSchema.parse(JSON.parse(response.data)); // JSON -> 객체 변환
};

// AI 스토리 진행
export const createNextStory = async ({ userId, prompt }: CreateNextStory): Promise<StoryFormatType> => {
  const userAICount = await getUserAICount(userId);

  if (userAICount.todayCount >= 5) {
    throw new Error('limit');
  }

  const response = await axios.post(`${process.env.NEXT_PUBLIC_CLAUDE_CONTINUE}`, {
    ...ClaudePromptSchema.parse(prompt),
  });
  await updateUserAICount(userId);

  return StoryFormatSchema.parse(JSON.parse(response.data)); // JSON -> 객체 변환
};

// 파라미터 타입
interface CreateScenarioStory {
  userId: string;
  genre: string;
  world: string;
}

interface CreateNextStory {
  userId: string;
  prompt: ClaudePromptType;
}
