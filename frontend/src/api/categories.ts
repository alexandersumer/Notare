import { getRequest, postRequest, deleteRequest } from "./backendapi";
import { NO_CATEGORY } from "../stringConstants";

// GET CATEGORIES
type getCategoriesParams = {
  sort?: string;
};

type getCategoriesResponse = {
  tags: any;
  num_categories: number;
};

export const getCategories = async (
  params: getCategoriesParams = {}
): Promise<getCategoriesResponse | void> => {
  const response = await getRequest("/tags", params);
  if (response != null) {
    response.tags = response.tags.map((t: any) => t.tag);
  }
  return response;
};

type addCategoryParams = {
  tag?: string;
};

export const addCategory = async (params: addCategoryParams): Promise<void> =>
  postRequest("/tags", params);

type changeVideoCategoryParams = {
  tag: string;
};

export const changeVideoCategory = async (
  params: changeVideoCategoryParams,
  video_id: string
): Promise<void> => {
  if (params.tag == NO_CATEGORY) params.tag = "No Tag";
  return postRequest("/videos/" + video_id + "/tag", params);
};

type deleteCategoryParams = {
  tag?: string;
};

export const deleteCategory = async (
  params: deleteCategoryParams
): Promise<void> => {
  console.log("deleting", params);
  return deleteRequest("/tags", params);
}
