import { Text } from '@/components/shared/ui/Text';
import { useState } from 'react';

interface ContentProps {
  parent: string;
  close: () => void;
}
export default function Content({ parent, close }: ContentProps) {
  const [my, setMy] = useState('Init ');
  console.log('자식 리렌더링!');

  return (
    <div className="bg-blue">
      <h1>저는 컨텐츠 입니다.</h1>
      <div className="mb-6">컨텐츠 상태는 ? : {my}</div>
      <button onClick={() => setMy(prev => prev + 'click ')}>컨텐츠 상태 바꾸기</button>
      <Text weigth="black">부모의 상태는? : {parent}</Text>
      <button className="mt-8" onClick={close}>
        Close
      </button>
    </div>
  );
}
