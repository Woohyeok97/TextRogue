'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// components
import { Button } from './Button';

interface BookmarkProps {
  scenarioId: string;
  userId: string;
}
export default function Bookmark({ userId, scenarioId }: BookmarkProps) {
  const getBookmark = async () => {
    const response = await axios.get(`/api/mongodb/bookmark`, { params: { userId, scenarioId } });
    return response.data;
  };
  const { data: bookmark } = useQuery({
    queryKey: ['bookmark', scenarioId, userId],
    queryFn: getBookmark,
  });

  return <Button color={bookmark ? 'blue' : 'gray'}>Bookmark</Button>;
}
