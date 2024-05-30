'use client';
// components
import { Button } from './Button';
// hooks
import useBookmark from '@/hooks/useBookmark';

interface BookmarkProps {
  scenarioId: string;
  userId: string;
}
export default function Bookmark({ scenarioId, userId }: BookmarkProps) {
  const { bookmark, mutate, isPending } = useBookmark({ scenarioId, userId });

  return (
    <Button color={bookmark ? (isPending ? 'gray' : 'blue') : isPending ? 'blue' : 'gray'} onClick={mutate}>
      Bookmark
    </Button>
  );
}
