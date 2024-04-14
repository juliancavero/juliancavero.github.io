import { createContext, useState } from "react";

export type TokenContextType = {
  token: string;
  setToken: (token: string) => void;
};

export const TokenContext = createContext<TokenContextType | null>(null);

type TokenProviderProps = {
  children: React.ReactNode;
};

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [token, setToken] = useState<string>("");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
