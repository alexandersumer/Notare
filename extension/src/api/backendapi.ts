import axios from "axios";
import LocalStorage from "../utils/LocalStorage";

const backendapi = axios.create({
  baseURL: "http://127.0.0.1:5000/v1"
});

const setToken = async () => {
  const accessToken = await LocalStorage.getItem("accessToken");
  console.log("token is:", accessToken);
  backendapi.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
};

const getUserId = async () => {
  const userId = await LocalStorage.getItem("userId");
  return userId ? parseInt(userId) : null;
};

export const getRequest = async (route: string, params) => {
  await setToken();
  const userId = await getUserId();
  params.user_id = userId;
  const response = await backendapi.get(route, { params });

  if (response.status == 200) {
    return response.data;
  } else {
    return undefined;
  }
};

export const postRequest = async (route: string, params) => {
  await setToken();
  const userId = await getUserId();
  params.user_id = userId;
  const response = await backendapi.post(route, params);

  if (response.status == 201) {
    console.log(`post to ${route} successful.`);
  } else {
    console.log(`post to ${route} unsuccessful. status: `, response.status);
  }
};

export const putRequest = async (route: string, params) => {
  await setToken();
  const userId = await getUserId();

  params.user_id = userId;
  const response = await backendapi.put(route, params);

  if (response.status == 200) {
    console.log(`put to ${route} successful`);
  } else {
    console.log(`put to ${route} unsuccessful. status: `, response.status);
  }
};

export const deleteRequest = async (route: string) => {
  console.log("deleteRequest called with route: ", route);
  await setToken();
  const response = await backendapi.delete(route);

  if (response.status == 200) {
    console.log(`delete to ${route} successful`);
  } else {
    console.log(`delete to ${route} unsuccessful. status: `, response.status);
  }
};

export const loginRequest = async (route: string, body: any) => {
  console.log("loginRequest body:", body);
  const response = await backendapi.post(route, {
    email: body.email,
    password: body.password
  });

  console.log("loginRequest response:", response);
  if (response.status == 200) {
    return response.data;
  } else {
    return undefined;
  }
};

export const logoutRequest = async (route: string) => {
  await setToken();
  const response = await backendapi.delete(route);

  if (response.status == 200) {
    return response.data;
  } else {
    return undefined;
  }
};
