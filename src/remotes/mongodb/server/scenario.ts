import { connectDB } from '../mongodb';
import { ObjectId } from 'mongodb';
// type & schema
import { ScenarioType } from '@/models';
import { ScenarioSchema } from '../../schema';

// 시나리오 리스트 가져오기
export const getScenarioList = async (): Promise<ScenarioType[]> => {
  const db = (await connectDB).db('prototype');
  const response = await db.collection('scenario').find().toArray();
  console.log('시나리오 리스트 fetching 실행됨!');

  return response.map(item => ScenarioSchema.parse({ ...item, _id: item._id.toString() }));
};

// 시나리오 단일 가져오기
export const getScenarioById = async (id: string): Promise<ScenarioType> => {
  const db = (await connectDB).db('prototype');
  const response = await db.collection('scenario').findOne({ _id: new ObjectId(id) });
  console.log('시나리오 fetching 실행됨!');

  return ScenarioSchema.parse({ ...response, _id: response?._id.toString() });
};
