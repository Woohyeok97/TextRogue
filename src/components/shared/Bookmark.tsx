'use client';
// components
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
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
    <button onClick={handleClick}>
      {bookmark ? <FaBookmark size={25} /> : <FaRegBookmark size={25} />}
    </button>
  );
}
