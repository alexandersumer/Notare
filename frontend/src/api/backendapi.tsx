import axios from "axios";

const backendapi = axios.create({
  baseURL: "http://127.0.0.1:5000/v1"
});

backendapi.defaults.headers.common["Authorization"] = "Bearer adsf"; // TODO: change me when bringing back auth

export const getRequest = async (route: string, params: any) => {
  const response = await backendapi.get(route, { params });

  if (response.status == 200) {
    return response.data;
  } else {
    return undefined;
  }
};
