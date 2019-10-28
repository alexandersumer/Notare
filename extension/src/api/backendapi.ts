import axios from 'axios';

const backendapi = axios.create({
  baseURL: "http://127.0.0.1:5000/v1",
});

backendapi.defaults.headers.common['Authorization'] = 'Bearer adsf'; // TODO: change me when bringing back auth

export const getRequest = async (route:string, params) => {
  const response = await backendapi.get(route, { params });

  if (response.status == 200){
    return response.data;
  } else {
    return undefined;
  }
}

export const postRequest = async (route: string, params) => {
  const response = await backendapi.post(route, params);

  if (response.status == 201){
    console.log(`post to ${route} successful.`);
  } else {
    console.log(`post to ${route} unsuccessful. status: `, response.status);
  }
}

export const putRequest = async (route: string, params) => {
  const response = await backendapi.put(route, params);

  if (response.status == 200){
    console.log(`put to ${route} successful`);
  } else {
    console.log(`put to ${route} unsuccessful. status: `, response.status);
  }
}

export const deleteRequest = async (route: string) => {
  console.log("deleteRequest called with route: ", route);
  const response = await backendapi.delete(route);

  if (response.status == 200){
    console.log(`delete to ${route} successful`);
  } else {
    console.log(`delete to ${route} unsuccessful. status: `, response.status);
  }
}