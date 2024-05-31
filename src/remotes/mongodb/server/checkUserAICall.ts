import { getServerSession } from 'next-auth';
import { connectDB } from '../mongodb';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
// schema
import { UserAICallSchema } from '@/remotes/schema';

export const checkUserAICall = async (): Promise<{ isValid: boolean; response?: NextResponse }> => {
  const session = await getServerSession(authOptions);

  if (!session) {
    const response = NextResponse.json({ message: '로그인 정보가 없습니다.' }, { status: 401 });
    return { isValid: false, response: response };
  }

  const db = (await connectDB).db('prototype');
  const result = await db.collection('userAICall').findOne({ userId: session.user.id });
  const currentDate = new Date().toISOString().split('T')[0]; //2024-05-31

  try {
    if (result) {
      const userCall = UserAICallSchema.parse(result);
      if (userCall.lastCallDate === currentDate) {
        if (userCall.todayCount >= 2) {
          const response = NextResponse.json({ message: '일일 횟수가 초과되었습니다.' }, { status: 429 });
          return { isValid: false, response: response };
        } else {
          await db.collection('userAICall').updateOne({ userId: userCall.userId }, { $inc: { todayCount: 1 } });
        }
      } else {
        await db
          .collection('userAICall')
          .updateOne({ userId: userCall.userId }, { $set: { todayCount: 1, lastCallDate: currentDate } });
      }
    } else {
      await db
        .collection('userAICall')
        .insertOne({ userId: session.user.id, todayCount: 1, lastCallDate: currentDate });
    }
    return { isValid: true };
  } catch (error) {
    const response = NextResponse.json({ message: '서버에러 발생' }, { status: 501 });
    return { isValid: false, response: response };
  }
};
