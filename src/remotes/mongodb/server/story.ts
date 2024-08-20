'use server';
import { connectDB } from '../mongodb';
import { ObjectId } from 'mongodb';
// type & schema
import { StoryFormatType, StoryType } from '@/models';
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
  const db = (await connectDB).db('prototype');
  const response = await db.collection('story').findOne({ _id: new ObjectId(storyId) });
  console.log('유저 스토리(server) fetching!', storyId);
  return StorySchema.parse({ ...response, _id: response?._id.toString() });
};

// 스토리 로그 추가
export const updateStoryLog = async ({ storyId, select, nextStory }: UpdateStoryLog) => {
  const db = (await connectDB).db('prototype');
  const storyCollection = db.collection<{ log: StoryFormatType[] }>('story');

  // 스토리 로그 마지막 요소에 선택지 추가
  await storyCollection.updateOne(
    { _id: new ObjectId(storyId) },
    { $set: { 'log.$[last].select': select } },
    { arrayFilters: [{ 'last.select': { $exists: false } }] },
  );

  // 스토리 로그에 새로운 요소 추가
  await storyCollection.updateOne({ _id: new ObjectId(storyId) }, { $push: { log: nextStory } });

  console.log('Server Action: 스토리 로그 업데이트!', storyId);
};

interface UpdateStoryLog {
  storyId: string;
  select: string;
  nextStory: StoryFormatType;
}
