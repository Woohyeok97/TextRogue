'use server';
import { connectDB } from './mongodb';
// type & schema
import { UserAICountType } from '@/models';
import { UserAICountSchema } from '../schema';

// 유저 AI Count 가져오기
export const getUserAICount = async (userId: string): Promise<UserAICountType> => {
  const db = (await connectDB).db('prototype');
  const currentDate = new Date().toISOString().split('T')[0];

  try {
    // 유저 AI Count가 없다면, 새로 생성
    const result = await db.collection('userAICount').findOneAndUpdate(
      { userId: userId },
      {
        $setOnInsert: {
          userId: userId,
          todayCount: 0,
          lastCallDate: currentDate,
        },
      },
      { returnDocument: 'after', upsert: true },
    );

    const userAICount = UserAICountSchema.parse(result);

    // 마지막 AI 호출 날짜가 오늘이 아닐 경우, count 초기화(DB 업데이트)
    if (userAICount.lastCallDate !== currentDate) {
      const resetUserAICount = await db
        .collection('userAICount')
        .findOneAndUpdate(
          { userId: userId },
          { $set: { todayCount: 0 } },
          { returnDocument: 'after' },
        );
      return UserAICountSchema.parse(resetUserAICount);
    }

    return userAICount;
  } catch {
    throw new Error('유저 AI 정보를 가져올 수 없습니다.');
  }
};

// 유저 AI Count 업데이트 (카운트 +1 & 날짜 변경)
export const updateUserAICount = async (userId: string) => {
  const currentDate = new Date().toISOString().split('T')[0];

  try {
    const db = (await connectDB).db('prototype');
    await db
      .collection('userAICount')
      .updateOne(
        { userId: userId },
        { $inc: { todayCount: 1 }, $set: { lastCallDate: currentDate } },
      );
  } catch (err) {
    throw new Error('유저 AI 업데이트 오류가 발생했습니다.');
  }
};
