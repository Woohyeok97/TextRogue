import axios from 'axios';
// type & schema
import { StoryType } from '@/models';
import { StorySchema } from '@/remotes/schema';

// 스토리 생성
export const createStoryLog = async (story: StoryType) => {
  if (StorySchema.parse(story)) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_STORY}`, story);
    return response.data;
  }
};
