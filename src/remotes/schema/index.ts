import { z } from 'zod';

// 시나리오 스키마
export const ScenarioSchema = z.object({
  title: z.string(),
  genre: z.string().min(1),
  background: z.string().min(1),
  prologue: z.string().min(1),
  description: z.string(),
});
