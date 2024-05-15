import { z } from 'zod';

// 스토리 프롬프트 스키마
export const StoryPromptSchema = z.object({
  genre: z.string().min(1, { message: '장르가 누락되었습니다.' }),
  world: z.string().min(1, { message: '세계관이 누락되었습니다.' }),
  previousStory: z.string().min(1, { message: '이전 스토리가 누락되었습니다.' }),
  userChoice: z.string().min(1, { message: '유저 선택이 누락되었습니다.' }),
});

// 스토리 스키마
export const StorySchema = z.object({
  text: z.string().min(100, { message: '스토리는 100자 이상 작성해야 합니다.' }),
  choices: z.array(z.string()).length(3, { message: '3가지 선택지를 입력해야 합니다.' }),
});

// 시나리오 스키마
export const ScenarioSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, { message: '제목을 작성해주세요.' }),
  genre: z.string().min(1, { message: '장르를 선택해주세요.' }),
  world: z.string().min(1, { message: '세계관을 선택해주세요.' }),
  prologue: StorySchema,
  description: z.string().min(1, { message: '설명을 작성해주세요.' }),
});

// 시나리오 리스트 스키마
export const ScenarioListSchema = z.array(ScenarioSchema);
