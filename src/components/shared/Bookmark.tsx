'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
// components
import { Button } from './Button';
import { BookmarkType } from '@/models';

interface BookmarkProps {
  scenarioId: string;
  userId: string;
}
export default function Bookmark({ scenarioId, userId }: BookmarkProps) {
  const getBookmark = async () => {
    const response = await axios.get(`/api/mongodb/bookmark`, { params: { scenarioId, userId } });
    return response.data;
  };
  const createBookmark = async () => {
    const response = await axios.post(`/api/mongodb/bookmark`, { scenarioId, userId });
    console.log(scenarioId, 'Bookmark 생성 실행됨!!', response.data.insertedId);
    return response.data.insertedId;
  };
  const removeBookmark = async (bookmarkId: string) => {
    const response = await axios.delete(`/api/mongodb/bookmark/${bookmarkId}`);
    console.log(scenarioId, 'Bookmark 삭제 실행됨!!', response.data);
    return response.data;
  };

  const queryClient = useQueryClient();

  const { data: bookmark } = useQuery<BookmarkType | null>({
    queryKey: ['bookmark', scenarioId, userId],
    queryFn: getBookmark,
  });

  const { mutate, isPending } = useMutation({
    onMutate: () => {
      const previousBookmark = queryClient.getQueryData(['bookmark', scenarioId, userId]);
      return { previousBookmark };
    },
    mutationFn: async () => {
      if (!bookmark) {
        const insertedId = await createBookmark();
        const bookmark: BookmarkType = {
          _id: insertedId,
          scenarioId: scenarioId,
          userId: userId,
        };
        return bookmark;
      }
      await removeBookmark(bookmark._id);
      return null;
    },
    onSuccess: bookmark => {
      queryClient.setQueryData(['bookmark', scenarioId, userId], bookmark);
    },
    onError: (err, _, context) => {
      console.log(err);
      queryClient.setQueryData(['bookmark', scenarioId, userId], context?.previousBookmark);
    },
  });

  return (
    <Button color={bookmark ? (isPending ? 'gray' : 'blue') : isPending ? 'blue' : 'gray'} onClick={mutate}>
      Bookmark
    </Button>
  );
}
