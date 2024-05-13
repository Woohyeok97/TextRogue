import axios from 'axios';

// 프롤로그 생성
export const createPrologue = async (genre: string, background: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_CLAUDE}`, { genre, background });
  return response.data.data;
};
