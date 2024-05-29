import axios from 'axios';
// type & schema
import { ClaudePromptType, StoryFormatType } from '@/models';
import { ClaudePromptSchema, StoryFormatSchema } from '../schema';

// 프롤로그 생성 (with Claude)
export const generatePrologue = async ({
  genre,
  world,
}: {
  genre: string;
  world: string;
}): Promise<StoryFormatType> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_CLAUDE_PROLOGUE}`, { genre, world });
  console.log('클로드 프롤로그 작성 generatePrologue 실행됨!');
  return StoryFormatSchema.parse(JSON.parse(response.data));
};

// 스토리 진행 (with Claude)
export const continueStory = async (prompt: ClaudePromptType): Promise<StoryFormatType> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_CLAUDE_CONTINUE}`, {
    ...ClaudePromptSchema.parse(prompt),
  });
  console.log('클로드 스토리 작성 실행됨!!', prompt);
  return StoryFormatSchema.parse(JSON.parse(response.data));
};
