import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { SignInPage } from "../pages/auth/sign-in/sign-in";
import { SignUpPage } from "../pages/auth/sign-up/SignUpPage";
import { VoteListPage } from "../pages/votes/vote-list/VoteListPage";
import { Root } from "./root";

export const AppRouter = () => {
  const { isLogged } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Root />}>
        {isLogged ? (
          <>
            <Route path="votes" element={<VoteListPage />} />
            <Route path="*" element={<Navigate to="/votes" />} />
          </>
        ) : (
          <>
            <Route path="auth/sign-up" element={<SignUpPage />} />
            <Route path="auth/sign-in" element={<SignInPage />} />
            <Route path="*" element={<Navigate to="/auth/sign-in" />} />
          </>
        )}
      </Route>
    </Routes>
  );
};
