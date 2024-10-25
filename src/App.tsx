import { useEffect } from "react";

import { ToastContainer } from "react-toastify";

import { AppRouter } from "./router/appRouter";
import { storage } from "./helper/storage";
import { useAuth } from "./hooks/useAuth";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { login, logout, user, token, validateSession } = useAuth();

  useEffect(() => {
    validateSession();
  }, []);

  useEffect(() => {
    const token = storage.getItem("token");

    if (token) {
      if (user) {
        const expDate = new Date(user.exp * 1000);
        const currentDate = new Date();

        if (expDate < currentDate) {
          logout();
        } else {
          const timeLeft = expDate.getTime() - currentDate.getTime();

          setTimeout(() => {
            logout();
          }, timeLeft);
        }
      }
    }
  }, [login, token, user]);

  return (
    <>
      <ToastContainer />
      <AppRouter />
    </>
  );
}

export default App;
