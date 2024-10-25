import { NextUIProvider } from "@nextui-org/system";
import { ToastContainer } from "react-toastify";

import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/appRouter";

import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { storage } from "./helper/storage";

function App() {
  const { login } = useAuth();

  useEffect(() => {
    const token = storage.getItem("token");

    if (token) {
      login(token);
    }
  }, []);

  return (
    <>
      <NextUIProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        <ToastContainer />
      </NextUIProvider>
    </>
  );
}

export default App;
