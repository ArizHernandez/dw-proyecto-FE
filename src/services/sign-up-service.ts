import { SignUpPayload } from "../components/auth/signin/interfaces/signup-form";
import { http } from "../helper/http-instance";

export const signUpNewUser = async (signUpPayload: SignUpPayload) => {
  return await http.post("/auth/register", signUpPayload);
};
