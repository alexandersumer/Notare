import { getRequest, postRequest } from "./backendapi";

// GET CATEGORIES
type getCategoriesParams = {
  sort?: string;
  user_id?: number;
};

type getCategoriesResponse = {
  categories: string[];
  num_categories: number;
};

type postCategoriesParams = {
  tag?: string;
  user_id?: number;
};

export const getCategories = async (
  params: getCategoriesParams,
  accessToken: string
): Promise<getCategoriesResponse | void> => getRequest("/tags", params, accessToken);

export const postCategories = async (
  params: postCategoriesParams,
  accessToken: string
): Promise<getCategoriesResponse | void> => postRequest("/tags", params, accessToken);
