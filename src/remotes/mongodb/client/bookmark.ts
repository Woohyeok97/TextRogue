import axios from 'axios';
// type & schema
// import { BookmarkType } from '@/models';
// import { BookmarkSchema } from '@/remotes/schema';

// 북마크 가져오기
// export const getBookmark = async ({
//   scenarioId,
//   userId,
// }: {
//   scenarioId: string;
//   userId: string;
// }): Promise<BookmarkType | null> => {
//   const response = await axios.get(`${process.env.NEXT_PUBLIC_BOOKMARK}`, { params: { scenarioId, userId } });
//   if (response.data) {
//     return BookmarkSchema.parse(response.data);
//   }
//   return null;
// };

// 북마크 생성
export const createBookmark = async ({
  scenarioId,
  userId,
}: {
  scenarioId: string;
  userId: string;
}): Promise<string> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BOOKMARK}`, { scenarioId, userId });
  return response.data.insertedId;
};

// 북마크 제거
export const removeBookmark = async (bookmarkId: string) => {
  return await axios.delete(`${process.env.NEXT_PUBLIC_BOOKMARK}/${bookmarkId}`);
};
