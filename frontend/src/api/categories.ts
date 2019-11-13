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

type postCategoriesParams = {
  tag?: string;
  user_id?: number;
};

export const addCategory = async (
  params: postCategoriesParams,
  accessToken: string
): Promise<void> => postRequest("/tags", params, accessToken);
