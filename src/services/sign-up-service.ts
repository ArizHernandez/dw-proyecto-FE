import { SignUpPayload } from "../components/auth/sign-up/interfaces/signup-form";
import { http } from "../helper/http-instance";

export const signUpNewUser = async (signUpPayload: SignUpPayload) => {
  return await http.post("/auth/register", signUpPayload);
};
