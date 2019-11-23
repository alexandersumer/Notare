import axios from "axios";
import { AxiosResponse, AxiosError } from 'axios'
import { conditionalExpression } from "@babel/types";

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

// returns object, or a string
export const noHeaderPost = async (route: string, body: any) => {
  const response = await backendapi.post(route, {
    email: body.email,
    password: body.password
  }).then(response => {
      if (response.status === 200) {
        return response.data;
      }
    }
  ).catch((reason: AxiosError) => {
    if (reason.response!.status === 400) {
      // Handle 400
      if (reason.response!.data.errorMessage === "Invalid Email") {
        return "Invalid Email Format";
      } else if (reason.response!.data.errorMessage === "User Already Exists") {
        return "User Already Exists";
      } else if (reason.response!.data.errorMessage === "Invalid Email or Password") {
        return "Invalid Email or Password";
      }
      return "400 error"
    } 
    return "There is a problem with our backend service"
  })
  return response;
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
  const accessToken = localStorage.getItem("accessToken");
  const Authorization = "Bearer " + accessToken;

  const userId: number = parseInt(localStorage.getItem("userId") as string);

  params.user_id = userId;
  const response = await backendapi.delete(route, {
    headers: { Authorization },
    data: params
  });

  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
};
