import React, { createContext, useContext, useState, ReactNode } from "react";



interface AuthContextProps {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
}

interface User {
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);



export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [auth, setAuth] = useState<null | { email: string }>(null);

  const logout = () => {
    setAuth(null);
    // Perform any additional logout operations here like clearing cookies or tokens
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)!;
  return context;
}