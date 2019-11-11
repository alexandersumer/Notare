import { login } from "./backendapi";
import { NoteType } from "../types";

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
