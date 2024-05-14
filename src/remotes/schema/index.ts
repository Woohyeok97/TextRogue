import { z } from 'zod';

// 시나리오 스키마
export const ScenarioSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, { message: '제목을 작성해주세요.' }),
  genre: z.string().min(1, { message: '장르를 선택해주세요.' }),
  background: z.string().min(1, { message: '세계관을 선택해주세요.' }),
  prologue: z.string().min(1),
  description: z.string().min(1, { message: '설명을 작성해주세요.' }),
});

// 시나리오 리스트 스키마
export const ScenarioListSchema = z.array(ScenarioSchema);

// 스토리 스키마
export const StorySchema = z.object({
  text: z.string().min(100, { message: '스토리는 100자 이상 작성해야 합니다.' }),
  choices: z.array(z.string()).length(3, { message: '3가지 선택지를 입력해야 합니다.' }),
});
