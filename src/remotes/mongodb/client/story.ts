import axios from 'axios';
// type & schema
import { StoryFormatType, StoryType } from '@/models';
import { StoryFormatSchema, StorySchema } from '@/remotes/schema';

// 스토리 생성
export const createStory = async (story: StoryType) => {
  if (StorySchema.parse(story)) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_STORY}`, story);
    return response.data;
  }
};

// 스토리 업데이트
export const updateStory = async (storyId: string, nextStory: StoryFormatType[]) => {
  if (nextStory.map(item => StoryFormatSchema.parse(item))) {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_STORY}/${storyId}`, nextStory);
    return response.data;
  }
};
