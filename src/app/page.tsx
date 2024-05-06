'use client';
import { createPrologue } from '@/remotes/claude';
import { createStory } from '@/remotes/story';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function Home() {
  const queryClient = useQueryClient();
  const [genre, setGenre] = useState('');
  const [background, setBackground] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { mutate: prologue } = useMutation({
    mutationFn: async () => {
      return await createPrologue(genre, background);
    },
    onSuccess: data => {
      console.log('muta!!', data);
      queryClient.setQueryData<string>(['claudeText'], data);
    },
  });

  const { data: claudeText } = useQuery<string>({
    queryKey: ['claudeText'],
  });

  const handleClick = () => {
    if (!genre || !background) {
      console.log('??');
      return;
    }
    prologue();
  };

  const { mutate: story } = useMutation({
    mutationFn: async () => {
      if (!claudeText) {
        return;
      }
      return await createStory({ genre, background, claudeText, title, description });
    },
    onSuccess: data => {
      console.log('create!!', data);
    },
  });

  const handleSubmit = () => {
    if (!claudeText || !title || !description) {
      return console.log('뭐하세용');
    }
    story();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      메인페이지
      <div className="flex flex-col gap-5">
        <select value={genre} onChange={e => setGenre(e.target.value)}>
          <option>추리</option>
          <option>공포</option>
          <option>모험</option>
          <option>생존</option>
        </select>
        <select value={background} onChange={e => setBackground(e.target.value)}>
          <option>중세</option>
          <option>판타지</option>
          <option>아포칼립스</option>
          <option>현대</option>
          <option>SF</option>
        </select>
      </div>
      <button onClick={handleClick}>클라우드야 부탁해</button>
      <div className="p-5 min-h-10 min-w-10">
        <div>claud 답변</div>
        <div>{claudeText || ''}</div>
      </div>
      <div className="flex flex-col gap-5">
        <input placeholder="제목을 정해주세요." value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="설명을 적어주세요." value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>생성하기</button>
    </main>
  );
}
