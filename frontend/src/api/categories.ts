import { getRequest, postRequest } from "./backendapi";

// GET CATEGORIES
type getCategoriesParams = {
  sort?: string;
};

type getCategoriesResponse = {
  tags: any;
  num_categories: number;
};

export const getCategories = async (params: getCategoriesParams = {}): Promise<getCategoriesResponse | void> =>
  getRequest("/tags", params);

type addCategoryParams = {
  tag?: string;
};

export const addCategory = async (params: addCategoryParams): Promise<void> => postRequest("/tags", params);

type addVideoCategoryParams = {
  tag?: string;
};

export const addVideoCategory = async (
  params: addVideoCategoryParams,
  video_id: string,
): Promise<void> =>
  postRequest("/videos/" + video_id + "/tag", params);
