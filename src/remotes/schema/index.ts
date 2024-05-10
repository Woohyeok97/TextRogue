import { z } from 'zod';

// 시나리오 스키마
export const ScenarioSchema = z.object({
  title: z.string().min(1, { message: '제목을 작성해주세요.' }),
  genre: z.string().min(1, { message: '장르를 선택해주세요.' }),
  background: z.string().min(1, { message: '세계관을 선택해주세요.' }),
  prologue: z.string().min(1),
  description: z.string().min(1, { message: '설명을 작성해주세요.' }),
});
