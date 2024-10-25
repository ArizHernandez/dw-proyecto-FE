export interface AuthContextProps {
  user: User | null;
  token: string | null;
  isLogged: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  validateSession: () => Promise<void>;
}

export interface User {
  id:       string;
  username: string;
  email:    string;
  iat:      number;
  rol:      number;
  exp:      number;
}
