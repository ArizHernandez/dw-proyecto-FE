import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { NextUIProvider } from "@nextui-org/system";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { AuthProvider } from "./storage/auth.context.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </NextUIProvider>
  </StrictMode>
);
