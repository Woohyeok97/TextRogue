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
    console.log(scenarioId, 'Bookmark fetching 실행됨!!');
    return response.data;
  };
  const createBookmark = async () => {
    const response = await axios.post(`/api/mongodb/bookmark`, { scenarioId, userId });
    console.log(scenarioId, 'Bookmark 생성 실행됨!!');
    return response.data;
  };
  const removeBookmark = async (bookmarkId: string) => {
    const response = await axios.delete(`/api/mongodb/bookmark/${bookmarkId}`);
    console.log(scenarioId, 'Bookmark 삭제 실행됨!!');
    return response.data;
  };

  const queryClient = useQueryClient();

  const { data: bookmark } = useQuery<BookmarkType>({
    queryKey: ['bookmark', scenarioId, userId],
    queryFn: getBookmark,
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!bookmark) {
        return await createBookmark();
      }
      return await removeBookmark(bookmark._id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark', scenarioId, userId] });
    },
  });

  return (
    <Button color={bookmark ? 'blue' : 'gray'} onClick={mutate}>
      Bookmark
    </Button>
  );
}
