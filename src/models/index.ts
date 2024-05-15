import { z } from 'zod';
import { StorySchema, ScenarioSchema, StoryPromptSchema } from '@/remotes/schema';

// 시나리오 타입
export type ScenarioType = z.infer<typeof ScenarioSchema>;

// 스토리 프롬프트 타입
export type StoryPromptType = z.infer<typeof StoryPromptSchema>;

// 스토리 타입
export type StoryType = z.infer<typeof StorySchema>;
