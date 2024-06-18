import axios from 'axios';
// Type & Schema
import { ScenarioType } from '@/models';

// 시나리오 생성
export const createScenario = async (scenario: ScenarioType): Promise<string> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_SCENARIO}`, scenario);
  return response.data.insertedId;
};
