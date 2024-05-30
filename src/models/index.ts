import { z } from 'zod';
import { StoryFormatSchema, ScenarioSchema, ClaudePromptSchema, StorySchema, BookmarkSchema } from '@/remotes/schema';

// 클로드 프롬프트 타입
export type ClaudePromptType = z.infer<typeof ClaudePromptSchema>;

// 스토리 포맷 타입
export type StoryFormatType = z.infer<typeof StoryFormatSchema>;

// 시나리오 타입
export type ScenarioType = z.infer<typeof ScenarioSchema>;

// 스토리 로그 타입
export type StoryType = z.infer<typeof StorySchema>;

// 북마크 타입
export type BookmarkType = z.infer<typeof BookmarkSchema>;
