import { logout } from "./backendapi";

type LogoutResponse = {};

export const Logout = async (): Promise<LogoutResponse | void> =>
  logout("/logout");
