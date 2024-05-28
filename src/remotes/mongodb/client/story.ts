import axios from 'axios';
// type & schema
import { StoryFormatType, StoryType } from '@/models';
import { StoryFormatSchema, StorySchema } from '@/remotes/schema';

// 스토리 생성
export const createStory = async (story: StoryType) => {
  if (StorySchema.parse(story)) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_STORY}`, story);
    console.log('스토리 DB 생성 실행됨!');
    return response.data;
  }
};

// 스토리 업데이트
export const updateStory = async ({ storyId, storyLog }: { storyId: string; storyLog: StoryFormatType[] }) => {
  if (storyLog.map(item => StoryFormatSchema.parse(item))) {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_STORY}/${storyId}`, storyLog);
    console.log('스토리 DB 업데이트 실행됨!');
    return response.data;
  }
};
