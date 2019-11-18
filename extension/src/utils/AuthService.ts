import { login } from "../api/login";
import LocalStorage from "./LocalStorage";

const isAuthenticated = async (): Promise<boolean> => {
  const accessToken = await LocalStorage.getItem("accessToken");
  console.log(`in isAuthenticated, accessToken: ${accessToken}`);
  return !!accessToken;
};

const getAccessToken = async (): Promise<string> => {
  const accessToken = await LocalStorage.getItem("accessToken");
  if (accessToken != null) return "" + accessToken;
  return "";
};

const getUserId = async (): Promise<number> => {
  const userId = await LocalStorage.getItem("userId");
  if (userId != null) return parseInt(userId as string);
  return -1;
};

const AuthService = {
  isAuthenticated,
  accessToken: getAccessToken,
  userId: getUserId,
  async authenticate(email: string, password: string) {
    const response = await login({ email: email, password: password });
    console.log("authenticate response", response);
    console.log(response);
    if (response) {
      console.log("authenticating and saving here!");
      this.isAuthenticated = true;
      this.accessToken = response.accessToken;
      this.userId = response.user_id;
      await LocalStorage.setItem({ accessToken: response.accessToken });
      await LocalStorage.setItem({ userId: response.user_id });
    }
  },
  async logout() {
    this.isAuthenticated = false;
    await LocalStorage.removeItem("accessToken");
    await LocalStorage.removeItem("userId");
  }
};

export default AuthService;
