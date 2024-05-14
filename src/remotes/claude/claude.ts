import axios from 'axios';
import { StorySchema } from '../schema';
import { StoryType } from '@/models';
// type & schema

// 프롤로그 생성
export const createPrologue = async (genre: string, background: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_CLAUDE}`, { genre, background });
  return response.data.data;
};

interface PromptType {
  genre: string;
  world: string;
  previousStory: string;
  userChoice: string;
}

// 시나리오 플레이
export const playStory = async (prompt: PromptType): Promise<StoryType> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_CLAUDE}/play`, { ...prompt });
  console.log(response.data);
  const next = StorySchema.parse(JSON.parse(response.data));
  return next;
};
