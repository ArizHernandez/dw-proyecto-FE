import { RouterProvider } from "react-router-dom";

import { NextUIProvider } from "@nextui-org/system";
import { ToastContainer } from "react-toastify";
import { router } from "./router/appRouter";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NextUIProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </NextUIProvider>
    </>
  );
}

export default App;
