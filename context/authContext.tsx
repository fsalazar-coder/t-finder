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

interface ContextProps {
  dropdown: Boolean;
  setDropdown: React.Dispatch<React.SetStateAction<Boolean>>;
  hamburguerMenuActive: Boolean;
  setHamburguerMenuActive: React.Dispatch<React.SetStateAction<Boolean>>;
  loginModal: Boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<Boolean>>;
  joinModal: Boolean;
  setJoinModal: React.Dispatch<React.SetStateAction<Boolean>>;
  passwordResetModal: Boolean;
  setPasswordResetModal: React.Dispatch<React.SetStateAction<Boolean>>;
  accountActived: String;
  setAccountActived: React.Dispatch<React.SetStateAction<String>>;
  messageModal: Boolean;
  setMessageModal: React.Dispatch<React.SetStateAction<Boolean>>;
  messageModalType: String;
  setMessageModalType: React.Dispatch<React.SetStateAction<String>>;
  messageModalText: String;
  setMessageModalText: React.Dispatch<React.SetStateAction<String>>;
}

interface ProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const Context = createContext<ContextProps | undefined>(undefined);



export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [auth, setAuth] = useState<null | { email: string }>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const Provider = ({ children }: ProviderProps): JSX.Element => {
  const [dropdown, setDropdown] = useState<Boolean>(false);
  const [hamburguerMenuActive, setHamburguerMenuActive] = useState<Boolean>(false);
  const [loginModal, setLoginModal] = useState<Boolean>(false);
  const [joinModal, setJoinModal] = useState<Boolean>(false);
  const [passwordResetModal, setPasswordResetModal] = useState<Boolean>(false);
  const [accountActived, setAccountActived] = useState<String>(String);
  const [messageModal, setMessageModal] = useState<Boolean>(false);
  const [messageModalType, setMessageModalType] = useState<String>(String);
  const [messageModalText, setMessageModalText] = useState<String>(String);

  return (
    <Context.Provider value={
      {
        dropdown, setDropdown,
        hamburguerMenuActive, setHamburguerMenuActive,
        loginModal, setLoginModal,
        joinModal, setJoinModal,
        passwordResetModal, setPasswordResetModal,
        accountActived, setAccountActived,
        messageModal, setMessageModal,
        messageModalType, setMessageModalType,
        messageModalText, setMessageModalText
      }
    }>
      {children}
    </Context.Provider>
  );
}


export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)!;
  return context;
}

export function useDropdown(): ContextProps {
  const context = useContext(Context)!;
  return context;
}

export function useHamburguerMenuActive(): ContextProps {
  const context = useContext(Context)!;
  return context;
}

export function useLoginModal(): ContextProps {
  const context = useContext(Context)!;
  return context;
}

export function useJoinModal(): ContextProps {
  const context = useContext(Context)!;
  return context;
}

export function usePasswordResetModal(): ContextProps {
  const context = useContext(Context)!;
  return context;
}

export function useAccountActived(): ContextProps {
  const context = useContext(Context)!;
  return context;
}

export function useMessageModal(): ContextProps {
  const context = useContext(Context)!;
  return context;
}

export function useMessageModalType(): ContextProps {
  const context = useContext(Context)!;
  return context;
}

export function useMessageModalText(): ContextProps {
  const context = useContext(Context)!;
  return context;
}
