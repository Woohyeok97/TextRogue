import { getServerSession } from 'next-auth';
import { connectDB } from '../mongodb';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
// schema
import { UserAICallSchema } from '@/remotes/schema';

export const checkUserAICall = async (): Promise<{ isValid: boolean; response?: NextResponse }> => {
  const session = await getServerSession(authOptions);

  // 로그인 정보 확인
  if (!session) {
    return { isValid: false, response: NextResponse.json({ message: '로그인 정보가 없습니다.' }, { status: 401 }) };
  }

  const db = (await connectDB).db('prototype');
  const result = await db.collection('userAICall').findOne({ userId: session.user.id });
  const currentDate = new Date().toISOString().split('T')[0]; //2024-05-31

  try {
    // AI Call이 처음인 경우, 새로 생성
    if (!result) {
      await db.collection('userAICall').insertOne({
        userId: session.user.id,
        todayCount: 1,
        lastCallDate: currentDate,
      });
      return { isValid: true };
    }

    const userCall = UserAICallSchema.parse(result);
    // 오늘 첫 AI Call인 경우, 날짜 초기화
    if (userCall.lastCallDate !== currentDate) {
      await db
        .collection('userAICall')
        .updateOne({ userId: userCall.userId }, { $set: { todayCount: 1, lastCallDate: currentDate } });
      return { isValid: true };
    }

    // 오늘 AI Call todayCount가 초과된 경우
    if (userCall.todayCount >= 2) {
      return {
        isValid: false,
        response: NextResponse.json({ message: '일일 횟수가 초과되었습니다.' }, { status: 429 }),
      };
    }

    // AI Call, todayCount 1증가
    await db.collection('userAICall').updateOne({ userId: userCall.userId }, { $inc: { todayCount: 1 } });
    return { isValid: true };
  } catch (err) {
    return { isValid: false, response: NextResponse.json({ message: '서버에러 발생' }, { status: 501 }) };
  }
};
