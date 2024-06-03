'use server';

import { connectDB } from '../mongodb';
// type & schema
import { UserAICallSchema } from '@/remotes/schema';
import { UserAICallType } from '@/models';

export const getUserAICall = async (userId: string): Promise<UserAICallType | null> => {
  const db = (await connectDB).db('prototype');
  const result = await db.collection('userAICall').findOne({ userId: userId });

  if (!result) {
    return null;
  }

  const userCall = UserAICallSchema.parse(result);
  const currentDate = new Date().toISOString().split('T')[0];

  if (userCall.lastCallDate !== currentDate) {
    const resetCallCount = await db
      .collection('userAICall')
      .findOneAndUpdate({ userId: userCall.userId }, { $set: { todayCount: 0 } }, { returnDocument: 'after' });
    return UserAICallSchema.parse(resetCallCount);
  }

  return userCall;
};
