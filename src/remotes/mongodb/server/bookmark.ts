import { connectDB } from '../mongodb';
// type & schema
import { BookmarkType } from '@/models';
import { BookmarkSchema } from '@/remotes/schema';

// 유저 북마크 가져오기
export const getUserBookmark = async ({
  scenarioId,
  userId,
}: {
  scenarioId: string;
  userId: string;
}): Promise<BookmarkType | null> => {
  // console.log('북마크 아이템 fetch 실행됨!!', scenarioId);
  const db = (await connectDB).db('prototype');
  const response = await db
    .collection('bookmark')
    .findOne({ scenarioId: scenarioId, userId: userId });
  // console.log('북마크 아이템 fetch 끝!!', scenarioId);
  if (response) {
    return BookmarkSchema.parse({ ...response, _id: response?._id.toString() });
  }
  return null;
};
