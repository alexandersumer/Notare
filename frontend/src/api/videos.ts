import { getRequest } from "./backendapi";
import { VideoType } from "../types";

// GET VIDEOS
type getVideoParams = {
  sort?: string;
  video_id?: string;
  video_title?: string;
  categories?: string;
};

type getVideosResponse = {
  videos: VideoType[];
  num_videos: number;
};

export const getVideos = async (params: getVideoParams): Promise<getVideosResponse | void> =>
  getRequest("/videos", params);
