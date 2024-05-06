import axios from 'axios';

interface StoryType {
  genre: string;
  background: string;
  claudeText: string;
  title: string;
  description: string;
}

// 스토리 생성
export const createStory = async (story: StoryType) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_STORY}`, story);
  return response;
};
