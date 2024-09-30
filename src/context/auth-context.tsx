'use client'

import {
  createContext,
  ReactNode,
  useState
} from "react";

import User from "@/types/user";

type AuthContextProps = {
  token: string;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  function login(token: string, user: User): void {
    setToken(token);
    setUser(user);
  }

  function logout(): void {
    setToken("");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

