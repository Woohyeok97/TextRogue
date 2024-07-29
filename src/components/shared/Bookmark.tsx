'use client';
// components
import { Button } from './ui/Button';
// hooks
import useBookmark from '@/hooks/useBookmark';

interface BookmarkProps {
  scenarioId: string;
  userId: string;
}
export default function Bookmark({ scenarioId, userId }: BookmarkProps) {
  const { bookmark, mutate, isPending } = useBookmark({ scenarioId, userId });

  // 북마크 핸들러
  const handleClick = () => {
    if (!isPending) mutate();
  };

  return (
    <Button
      color={bookmark ? (isPending ? 'gray' : 'blue') : isPending ? 'blue' : 'gray'}
      onClick={handleClick}
    >
      Bookmark
    </Button>
  );
}
