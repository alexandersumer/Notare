import axios from 'axios';

const backendapi = axios.create({
  baseURL: "http://127.0.0.1:5000/v1",
});


export const getRequest = async (route, params) => {
  const response = await backendapi.get(route, { params });

  if (response.status == 200){
    return response.data;
  } else {
    return undefined;
  }
}

export const postRequest = async (route, params) => {
  const response = await backendapi.post(route, params);

  if (response.status == 201){
    console.log('post successful');
  } else {
    console.log('post unsuccessful. status: ', response.status);
  }
}

export const deleteRequest = async (route) => {
  console.log("deleteRequest called with route: ", route);
  const response = await backendapi.delete(route);

  if (response.status == 200){
    console.log('delete successful');
  } else {
    console.log('delete unsuccessful. status: ', response.status);
  }
}