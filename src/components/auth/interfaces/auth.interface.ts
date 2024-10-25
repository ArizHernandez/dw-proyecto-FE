export interface AuthContextProps {
  user: any;
  token: string | null;
  isLogged: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}
