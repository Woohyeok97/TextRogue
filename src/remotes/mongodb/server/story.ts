'use server';
import { connectDB } from '../mongodb';
import { ObjectId } from 'mongodb';
// type & schema
import { StoryType } from '@/models';
import { StorySchema } from '@/remotes/schema';

// 스토리 리스트 가져오기
export const getUserStoryList = async (userId: string): Promise<StoryType[]> => {
  // console.log('유저 스토리 리스트 fetching!');
  // console.time('유저 스토리 리스트 fetching!');
  // await new Promise(resolve => setTimeout(resolve, 1000));
  const db = (await connectDB).db('prototype');
  const response = await db.collection('story').find({ userId: userId }).toArray();
  console.log('유저 스토리 리스트 fetching! 끝!');
  // console.timeEnd('유저 스토리 리스트 fetching!');
  return response.map(item => StorySchema.parse({ ...item, _id: item._id.toString() }));
};

// 스토리 단일 가져오기
export const getStoryById = async (storyId: string): Promise<StoryType> => {
  console.log('유저 스토리(server) fetching!', storyId);
  const db = (await connectDB).db('prototype');
  const response = await db.collection('story').findOne({ _id: new ObjectId(storyId) });
  console.log('유저 스토리(server) fetching 완료!!', storyId);
  // console.log('스토리 (서버) fetch 요청 실행됨!!', storyId);
  return StorySchema.parse({ ...response, _id: response?._id.toString() });
};
