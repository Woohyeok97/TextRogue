'use server';
import { connectDB } from './mongodb';
// type & schema
import { UserAICallType } from '@/models';
import { UserAICallSchema } from '../schema';

// 유저 AI Count 가져오기
export const getUserAICount = async (userId: string): Promise<UserAICallType> => {
  const db = (await connectDB).db('prototype');
  const currentDate = new Date().toISOString().split('T')[0];

  // 유저 AI Count가 없다면, 새로 생성
  const result = await db.collection('userAICall').findOneAndUpdate(
    { userId: userId },
    {
      $setOnInsert: {
        userId: userId,
        todayCount: 0,
        lastCallDate: currentDate,
      },
    },
    { returnDocument: 'after', upsert: true }
  );

  const userAICount = UserAICallSchema.parse(result);

  // 마지막 AI 호출 날짜가 오늘이 아닐 경우, count 초기화(DB 업데이트)
  if (userAICount.lastCallDate !== currentDate) {
    const resetUserAICount = await db
      .collection('userAICall')
      .findOneAndUpdate({ userId: userId }, { $set: { todayCount: 0 } }, { returnDocument: 'after' });
    return UserAICallSchema.parse(resetUserAICount);
  }

  return userAICount;
};

// 유저
export const updateUserAICount = async (userId: string) => {
  console.log('업데이트 실행!');
  const db = (await connectDB).db('prototype');
  await db.collection('userAICall').updateOne({ userId: userId }, { $inc: { todayCount: 1 } });
};
