import axios from 'axios';
// type & schema
import { StoryPromptType, StoryType } from '@/models';
import { StoryPromptSchema, StorySchema } from '../schema';

// 프롤로그 생성 (with Claude)
export const generatePrologue = async ({ genre, world }: { genre: string; world: string }): Promise<StoryType> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_CLAUDE_PROLOGUE}`, { genre, world });
  const prologue = StorySchema.parse(JSON.parse(response.data));
  return prologue;
};

// 스토리 진행 (with Claude)
export const continueStory = async (prompt: StoryPromptType): Promise<StoryType> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_CLAUDE_CONTINUE}`, {
    ...StoryPromptSchema.parse(prompt),
  });
  const next = StorySchema.parse(JSON.parse(response.data));
  return next;
};
