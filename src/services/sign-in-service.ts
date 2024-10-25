import { SignInPayload } from "../components/auth/sign-in/interfaces/sign-in-form";
import { http } from "../helper/http-instance";

export const loginUser = async (signInPayload: SignInPayload) => {
  return await http.post("/auth/login", signInPayload);
};
