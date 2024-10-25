import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { SignInPage } from "../pages/auth/sign-in/sign-in";
import { SignUpPage } from "../pages/auth/sign-up/SignUpPage";
import { CampaignPage } from "../pages/campaign/campaign/CampaignPage";
import { CampaignsListPage } from "../pages/campaign/campaigns-list/CampaignsListPage";
import { Root } from "./root";

export const AppRouter = () => {
  const { isLogged } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Root />}>
        {isLogged ? (
          <>
            <Route path="/campaign/:id" element={<CampaignPage />} />
            <Route path="/campaign" element={<CampaignsListPage />} />
            <Route path="*" element={<Navigate to="/campaign" />} />
          </>
        ) : (
          <>
            <Route path="auth/sign-up" element={<SignUpPage />} />
            <Route path="auth/sign-in" element={<SignInPage />} />
            <Route path="*" element={<Navigate to="/auth/sign-in" />} />
          </>
        )}
        <Route
          path="*"
          element={
            isLogged ? (
              <Navigate to="/campaign" />
            ) : (
              <Navigate to="/auth/sign-in" />
            )
          }
        />
      </Route>
    </Routes>
  );
};
