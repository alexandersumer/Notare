import { noHeaderPost, logout } from "./backendapi";

// POST LOGIN
type postLoginParams = {
  email: string;
  password: string;
};

type postLoginResponse = {
  accessToken: string;
  user_id: number;
};

export const postLogin = async (
  params: postLoginParams
): Promise<postLoginResponse | string> => noHeaderPost("/login", params);

type postCreateAccountParams = {
  email: string;
  password: string;
};

type postCreateAccountResponse = {
  accessToken: string;
  user_id: number;
};

export const postCreateAccount = async (
  params: postCreateAccountParams
): Promise<postCreateAccountResponse | string> =>
  noHeaderPost("/createAccount", params);

type LogoutResponse = {};

export const Logout = async (): Promise<LogoutResponse | void> =>
  logout("/logout");
