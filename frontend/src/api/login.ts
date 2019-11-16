import { login } from "./backendapi";

// POST LOGIN
type postLoginBody = {
  email: string,
  password: string
};

type postLoginResponse = {
  accessToken: string,
  user_id: number
  
};

export const postLogin = async (
  postLoginBody: postLoginBody,
): Promise<postLoginResponse | void> => login("/login", postLoginBody);
