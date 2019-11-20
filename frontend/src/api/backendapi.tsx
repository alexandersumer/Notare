import axios from "axios";

const backendapi = axios.create({
  baseURL: "http://127.0.0.1:5000/v1"
});

export const getRequest = async (route: string, params: any) => {
  const accessToken = localStorage.getItem("accessToken");
  backendapi.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
  const userId: number = parseInt(localStorage.getItem("userId") as string);
  params.user_id = userId;
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

export const createAccount = async (route: string, body: any) => {
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

export const logout = async (route: string) => {
  const accessToken = localStorage.getItem("accessToken");
  backendapi.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
  const response = await backendapi.delete(route);

  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
};

export const postRequest = async (route: string, params: any) => {
  console.log(params);
  const accessToken = localStorage.getItem("accessToken");
  backendapi.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

  const userId: number = parseInt(localStorage.getItem("userId") as string);
  params.user_id = userId;
  const response = await backendapi.post(route, params);

  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
};

export const deleteRequest = async (route: string, params: any) => {
  console.log(params);
  const accessToken = localStorage.getItem("accessToken");
  const Authorization = "Bearer " + accessToken;

  const userId: number = parseInt(localStorage.getItem("userId") as string);

  params.user_id = userId;
  const response = await backendapi.delete(
    route,
    {
      headers: {Authorization},
      data:params
    }
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
};
