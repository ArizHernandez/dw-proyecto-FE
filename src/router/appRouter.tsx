import { Route } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Root } from "./root";
import { ErrorPage } from "../pages/ErrorPage";
import { SignUpPage } from "../pages/auth/sign-in/SignUpPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route path="auth/register" element={<SignUpPage />} />
    </Route>
  )
);
