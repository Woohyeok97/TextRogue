import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// type
import { BookmarkType } from '@/models';
// remotes
import { createBookmark, getBookmark, removeBookmark } from '@/remotes/mongodb/client/bookmark';

export default function useBookmark({ scenarioId, userId }: { scenarioId: string; userId: string }) {
  const queryClient = useQueryClient();

  // 북마크 데이터
  const { data: bookmark } = useQuery<BookmarkType | null>({
    queryKey: ['bookmark', scenarioId, userId],
    queryFn: () => getBookmark({ scenarioId, userId }),
  });

  // 북마크 mutation
  const bookmarkMuation = useMutation({
    onMutate: () => {
      const previousBookmark = queryClient.getQueryData(['bookmark', scenarioId, userId]);
      return { previousBookmark }; // 에러 발생을 대비한 롤백 데이터 준비, 반환
    },
    mutationFn: async () => {
      if (!bookmark) {
        // 북마크 데이터가 없는 경우 -> 북마크 DB 데이터 생성
        const insertedId = await createBookmark({ scenarioId, userId });
        const bookmark: BookmarkType = { _id: insertedId, scenarioId, userId };
        return bookmark;
      } // 북마크 데이터가 있는 경우 -> 북마크 DB 데이터 제거
      await removeBookmark(bookmark._id);
      return null;
    },
    onSuccess: bookmark => {
      queryClient.setQueryData(['bookmark', scenarioId, userId], bookmark); // 업데이트 성공 시, refecth 대신 캐시 데이터 업데이트
    },
    onError: (err, _, context) => {
      alert(`Bookmark 에러발생, 다시 시도해주세요. : ${err.message}`);
      queryClient.setQueryData(['bookmark', scenarioId, userId], context?.previousBookmark); // 에러 발생 시, 기존 캐시 데이터로 롤백
    },
  });

  return { bookmark, ...bookmarkMuation };
}
