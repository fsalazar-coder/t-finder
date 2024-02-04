import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface CleanupDoneParams {
  uiCleaned: boolean,
  authDataCleaned: boolean,
  authSocketCleaned: boolean,
}

interface ContextAuthProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  userEmail: string | null;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
  joinModal: boolean;
  setJoinModal: React.Dispatch<React.SetStateAction<boolean>>;
  loginModal: boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  passwordResetModal: boolean;
  setPasswordResetModal: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  isLoggingOut: boolean;
  setIsLoggingOut: React.Dispatch<React.SetStateAction<boolean>>;
  cleanupDone: CleanupDoneParams;
  setCleanupDone: React.Dispatch<React.SetStateAction<CleanupDoneParams>>;
}

const ContextAuth = createContext<ContextAuthProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [joinModal, setJoinModal] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [passwordResetModal, setPasswordResetModal] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [cleanupDone, setCleanupDone] = useState({
    uiCleaned: false,
    authDataCleaned: false,
    authSocketCleaned: false,
  });

  const logout = () => {
    setToken(null);
    setUserId('');
    setUserEmail(null);
    setIsLoggingOut(true); /// estado que indica que hay que cerrar sesion y limpiar componentes de otros context
  };

  const checkAllCleaned = () => {
    return cleanupDone.uiCleaned && cleanupDone.authDataCleaned && cleanupDone.authSocketCleaned;
  };

  useEffect(() => {
    if (isLoggingOut && checkAllCleaned()) {
      setIsLoggingOut(false);
      setCleanupDone({
        uiCleaned: false,
        authDataCleaned: false,
        authSocketCleaned: false,
      });
    }
  }, [cleanupDone, isLoggingOut]);


  return (
    <ContextAuth.Provider value={{
      token, setToken,
      userId, setUserId,
      userEmail, setUserEmail,
      joinModal, setJoinModal,
      loginModal, setLoginModal,
      passwordResetModal, setPasswordResetModal,
      isLoggingOut, setIsLoggingOut,
      cleanupDone, setCleanupDone,
      logout,
    }}>
      {children}
    </ContextAuth.Provider>
  );
}

export function useAuth(): ContextAuthProps {
  const context = useContext(ContextAuth)!;
  return context;
};