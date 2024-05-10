import { z } from 'zod';
import { ScenarioSchema } from '@/remotes/schema';

// 시나리오 타입
export type ScenarioType = z.infer<typeof ScenarioSchema>;
