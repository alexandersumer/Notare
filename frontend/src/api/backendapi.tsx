import axios from "axios";

const backendapi = axios.create({
  baseURL: "http://127.0.0.1:5000/v1"
});

export const getRequest = async (
  route: string,
  params: any,
  accessToken: string
) => {
  backendapi.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
  const response = await backendapi.get(route, { params });

  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
};

export const login = async (route: string, body: any) => {
  console.log(body);
  const response = await backendapi.post(route, {
    email: body.email,
    password: body.password
  });

  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
};

export const logout = async (route: string, accessToken: string) => {
  backendapi.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
  const response = await backendapi.delete(route);

  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
};

export const postRequest = async (
  route: string,
  body: any,
  accessToken: string
) => {
  console.log(body);
  backendapi.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
  const response = await backendapi.post(route, body);

  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
};
