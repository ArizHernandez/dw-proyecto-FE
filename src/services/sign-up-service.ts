import { SignUpPayload } from "../components/auth/sign-up/interfaces/signup-form";
import { api } from "../helper/http-instance";

export const signUpNewUser = async (signUpPayload: SignUpPayload) => {
  return await api.post("/auth/register", signUpPayload);
};
