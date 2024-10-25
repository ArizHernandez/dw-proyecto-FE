import { SignInPayload } from "../components/auth/sign-in/interfaces/sign-in-form";
import { api } from "../helper/http-instance";

export const loginUser = async (signInPayload: SignInPayload) => {
  return await api.post("/auth/login", signInPayload);
};
