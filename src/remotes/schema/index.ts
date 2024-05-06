import { z } from 'zod';

// 시나리오 스키마
export const ScenarioSchema = z.object({
  title: z.string(),
  genre: z.string(),
  background: z.string(),
  prologue: z.string(),
  description: z.string(),
});
