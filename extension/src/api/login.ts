import { loginRequest, logoutRequest } from "./backendapi";
import Message from "../utils/Message";

// POST LOGIN
type postLoginBody = {
  email: string,
  password: string
};

type postLoginResponse = {
  accessToken: string,
  user_id: number
};

export const login = async (
  postLoginBody: postLoginBody,
): Promise<any | void> => {
   const response = await Message.send({login: {route: "/login", body: postLoginBody}});
   return response;
}


type LogoutResponse = {
  
};

export const logout = async (): Promise<LogoutResponse | void> => logoutRequest("/logout");
