import { connectDB } from '../mongodb';
// type & schema
import { ScenarioType } from '@/models';
import { ScenarioListSchema } from '../schema';

// 시나리오 리스트 가져오기
export const getScenarioList = async (): Promise<ScenarioType[]> => {
  const db = (await connectDB).db('prototype');
  const response = await db.collection('scenario').find().toArray();
  const scenarioList = ScenarioListSchema.parse(response.map(item => ({ ...item, _id: item._id.toString() })));
  console.log('시나리오 리스트 fetching 실행됨!');
  return scenarioList;
};
