'use server';
import { connectDB } from '../mongodb';
import { ObjectId } from 'mongodb';
// type & schema
import { ScenarioType } from '@/models';
import { BookmarkSchema, ScenarioSchema } from '../../schema';

// 시나리오 리스트 가져오기
export const getScenarioList = async (): Promise<ScenarioType[]> => {
  const db = (await connectDB).db('prototype');
  const response = await db.collection('scenario').find().toArray();
  console.log('시나리오 리스트 fetching 실행됨!');

  return response.map(item => ScenarioSchema.parse({ ...item, _id: item._id.toString() }));
};

// 시나리오 가져오기
export const getScenarioById = async (id: string): Promise<ScenarioType> => {
  const db = (await connectDB).db('prototype');
  const response = await db.collection('scenario').findOne({ _id: new ObjectId(id) });
  console.log('시나리오 fetching 실행됨!');

  return ScenarioSchema.parse({ ...response, _id: response?._id.toString() });
};

// 유저 시나리오 리스트 가져오기
export const getUserScenarioList = async (userId: string): Promise<ScenarioType[]> => {
  // console.log('유저 시나리오 리스트 fetching!');
  // console.time('유저 시나리오 리스트 fetching!');
  const db = (await connectDB).db('prototype');
  // await new Promise(resolve => setTimeout(resolve, 1000));
  const result = await db.collection('scenario').find({ userId: userId }).toArray();
  console.log('유저 시나리오 리스트 fetching! 끝!');
  // console.timeEnd('유저 시나리오 리스트 fetching!');
  return result.map(item => ScenarioSchema.parse({ ...item, _id: item._id.toString() }));
};

// 유저 북마크 시나리오 리스트 가져오기
export const getUserBookmarkList = async (userId: string): Promise<ScenarioType[]> => {
  // console.log('유저 북마크 리스트 fetching!');
  // console.time('유저 북마크 리스트 fetching!');
  // await new Promise(resolve => setTimeout(resolve, 1000));
  const db = (await connectDB).db('prototype');
  const bookmarks = await db.collection('bookmark').find({ userId: userId }).toArray();
  const scenarioId = bookmarks.map(
    item => new ObjectId(BookmarkSchema.parse({ ...item, _id: item._id.toString() }).scenarioId),
  );
  const result = await db
    .collection('scenario')
    .find({ _id: { $in: scenarioId } })
    .toArray();
  // console.timeEnd('유저 북마크 리스트 fetching!');
  console.log('유저 북마크 리스트 fetching! 끝!');
  return result.map(item => ScenarioSchema.parse({ ...item, _id: item._id.toString() }));
};

// 시나리오 삭제하기
export const deleteScenario = async (id: string) => {
  try {
    const db = (await connectDB).db('prototype');
    await db.collection('bookmark').deleteMany({ scenarioId: id });
    await db.collection('scenario').deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    throw new Error(`Could not delete scenario`);
  }
};
