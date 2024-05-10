import axios from 'axios';
// Type & Schema
import { ScenarioType } from '@/models';
import { ScenarioSchema } from './schema';

// 시나리오 생성
export const createScenario = async (scenario: ScenarioType) => {
  if (ScenarioSchema.parse(scenario)) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SCENARIO}`, scenario);
    return response;
  }
};
