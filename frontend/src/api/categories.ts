import { getRequest, postRequest } from "./backendapi";

// GET CATEGORIES
type getCategoriesParams = {
  sort?: string;
  user_id?: number;
};

type getCategoriesResponse = {
  tags: any;
  num_categories: number;
};

export const getCategories = async (
  params: getCategoriesParams,
  accessToken: string
): Promise<getCategoriesResponse | void> =>
  getRequest("/tags", params, accessToken);

type addCategoryParams = {
  tag?: string;
  user_id?: number;
};

export const addCategory = async (
  params: addCategoryParams,
  accessToken: string
): Promise<void> => postRequest("/tags", params, accessToken);

type addVideoCategoryParams = {
  user_id?: number;
  tag?: string;
};

export const addVideoCategory = async (
  params: addVideoCategoryParams,
  video_id: string,
  accessToken: string
): Promise<void> =>
  postRequest("/videos/" + video_id + "/tag", params, accessToken);
