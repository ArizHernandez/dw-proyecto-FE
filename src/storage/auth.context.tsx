import { createContext, useState } from "react";

import {
  AuthContextProps,
  User,
} from "../components/auth/interfaces/auth.interface";
import { storage } from "../helper/storage";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const navigate = useNavigate();

  const login = async (token: string) => {
    try {
      const tokenInfo = token.split(".")[1];
      const newUser = JSON.parse(atob(tokenInfo));

      setToken(token);
      setUser(newUser);
      setIsLogged(true);

      storage.saveItem("token", token);
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  // Función de logout
  const logout = async () => {
    try {
      // Eliminar token y usuario
      setToken(null);
      setUser(null);
      setIsLogged(false);

      // Limpiar el token de localStorage
      localStorage.removeItem("token");

      navigate("/auth/sign-in");
    } catch (error) {
      console.error("Error en logout:", error);
      throw error;
    }
  };

  const validateSession = async () => {
    try {
      const token = storage.getItem("token");

      if (token) {
        const tokenInfo = token.split(".")[1];
        const newUser = JSON.parse(atob(tokenInfo));

        setToken(token);
        setUser(newUser);
        setIsLogged(true);
      }
    } catch (error) {
      console.error("Error en validateSession:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLogged, login, logout, validateSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};
