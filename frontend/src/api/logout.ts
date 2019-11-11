import { logout } from "./backendapi";


type LogoutResponse = {
  
};

export const Logout = async (accessToken: string): Promise<LogoutResponse | void> => logout("/logout", accessToken);
