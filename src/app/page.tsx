'use client';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [myText, setMyText] = useState('');
  const [claudeText, setClaudeText] = useState('');

  const post = async () => {
    const res = await axios.post('/api/claude', { myText });
    console.log(res.data.data);
    setMyText('');
    setClaudeText(res.data.data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      메인페이지
      <div className="p-5 border-white min-h-10 min-w-10">
        <div>claud 답변</div>
        <div>{claudeText}</div>
      </div>
      <input type="text" value={myText} onChange={e => setMyText(e.target.value)} className="text-black" />
      <button onClick={post}>click</button>
    </main>
  );
}
