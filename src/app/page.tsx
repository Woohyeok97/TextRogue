'use client';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [genre, setGenre] = useState('');
  const [background, setBackground] = useState('');
  const [claudeText, setClaudeText] = useState('');

  const post = async () => {
    if (!genre || !background) {
      console.log('??');
      return;
    }
    const res = await axios.post('/api/claude', { genre, background });
    console.log(res.data.data);
    setClaudeText(res.data.data);
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
      <div className="p-5 min-h-10 min-w-10">
        <div>claud 답변</div>
        <div>{claudeText}</div>
      </div>
      <button onClick={post}>click</button>
    </main>
  );
}
