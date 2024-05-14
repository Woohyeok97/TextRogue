import { z } from 'zod';
import { StorySchema, ScenarioSchema } from '@/remotes/schema';

// 시나리오 타입
export type ScenarioType = z.infer<typeof ScenarioSchema>;

// 클로드 응답 타입
export type StoryType = z.infer<typeof StorySchema>;
