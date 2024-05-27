import { connectDB } from '../mongodb';
import { ObjectId } from 'mongodb';
// type & schema
import { StoryType } from '@/models';
import { StorySchema } from '@/remotes/schema';

export const getStoryById = async (storyId: string): Promise<StoryType> => {
  const db = (await connectDB).db('prototype');
  const response = await db.collection('story').findOne({ _id: new ObjectId(storyId) });
  return StorySchema.parse({ ...response, _id: response?._id.toString() });
};
