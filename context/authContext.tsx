import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react";



interface AuthContextProps {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
  userData: Object | null;
  setUserData: React.Dispatch<React.SetStateAction<Object | null>>;
  userId: Id | string;
  setUserId: React.Dispatch<React.SetStateAction<Id | string>>;
  userImageUrl: String;
  setUserImageUrl: React.Dispatch<React.SetStateAction<String>>;
  accountActived: Boolean;
  setAccountActived: React.Dispatch<React.SetStateAction<Boolean>>;
  accountModule: String;
  setAccountModule: React.Dispatch<React.SetStateAction<String>>;
  profileImageModal: Boolean;
  setProfileImageModal: React.Dispatch<React.SetStateAction<Boolean>>;
  personalInfoModal: Boolean;
  setPersonalInfoModal: React.Dispatch<React.SetStateAction<Boolean>>;
  educationModal: Boolean;
  setEducationModal: React.Dispatch<React.SetStateAction<Boolean>>;
  experienceModal: Boolean;
  setExperienceModal: React.Dispatch<React.SetStateAction<Boolean>>;
  requestModal: Boolean;
  setRequestModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

interface User {
  email: string;
}

interface Id {
  id: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface ContextProps {
  dropdown: Boolean;
  setDropdown: React.Dispatch<React.SetStateAction<Boolean>>;
  hamburguerMenuActive: Boolean;
  setHamburguerMenuActive: React.Dispatch<React.SetStateAction<Boolean>>;
  screenNarrow: Boolean;
  setScreenNarrow: React.Dispatch<React.SetStateAction<Boolean>>;
  loading: Boolean;
  setLoading: React.Dispatch<React.SetStateAction<Boolean>>;
  loginModal: Boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<Boolean>>;
  joinModal: Boolean;
  setJoinModal: React.Dispatch<React.SetStateAction<Boolean>>;
  passwordResetModal: Boolean;
  setPasswordResetModal: React.Dispatch<React.SetStateAction<Boolean>>;
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
  const [userData, setUserData] = useState<null | Object>(null);
  const [ userId, setUserId ] = useState<string | { id: string }>(String);
  const [ userImageUrl, setUserImageUrl ] = useState<String>(String);
  const [accountActived, setAccountActived] = useState<Boolean>(false);
  const [accountModule, setAccountModule] = useState<String>(String);
  const [profileImageModal, setProfileImageModal] = useState<Boolean>(false);
  const [personalInfoModal, setPersonalInfoModal] = useState<Boolean>(false);
  const [educationModal, setEducationModal] = useState<Boolean>(false);
  const [experienceModal, setExperienceModal] = useState<Boolean>(false);
  const [requestModal, setRequestModal] = useState<Boolean>(false);

  return (
    <AuthContext.Provider value={{
      auth, setAuth,
      userData, setUserData,
      userId, setUserId,
      userImageUrl, setUserImageUrl,
      accountActived, setAccountActived,
      accountModule, setAccountModule,
      profileImageModal, setProfileImageModal,
      personalInfoModal, setPersonalInfoModal,
      educationModal, setEducationModal,
      experienceModal, setExperienceModal,
      requestModal, setRequestModal
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const Provider = ({ children }: ProviderProps): JSX.Element => {
  const [dropdown, setDropdown] = useState<Boolean>(false);
  const [hamburguerMenuActive, setHamburguerMenuActive] = useState<Boolean>(false);
  const [screenNarrow, setScreenNarrow] = useState<Boolean>(Boolean);
  const [loading, setLoading] = useState<Boolean>(false);
  const [loginModal, setLoginModal] = useState<Boolean>(false);
  const [joinModal, setJoinModal] = useState<Boolean>(false);
  const [passwordResetModal, setPasswordResetModal] = useState<Boolean>(false);
  const [messageModal, setMessageModal] = useState<Boolean>(false);
  const [messageModalType, setMessageModalType] = useState<String>(String);
  const [messageModalText, setMessageModalText] = useState<String>(String);

  const screenNarrowHandle: any = () => {
    window.innerWidth < 768 ?
      setScreenNarrow(true)
      : setScreenNarrow(false);
  };

  useEffect(() => {
    window.addEventListener('resize', screenNarrowHandle);
    screenNarrowHandle()
  });

  return (
    <Context.Provider value={
      {
        dropdown, setDropdown,
        hamburguerMenuActive, setHamburguerMenuActive,
        screenNarrow, setScreenNarrow,
        loading, setLoading,
        loginModal, setLoginModal,
        joinModal, setJoinModal,
        passwordResetModal, setPasswordResetModal,
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

export function useUserData(): AuthContextProps {
  const context = useContext(AuthContext)!;
  return context;
}

export function useAccountActived(): AuthContextProps {
  const context = useContext(AuthContext)!;
  return context;
}
export function useAccountModule(): AuthContextProps {
  const context = useContext(AuthContext)!;
  return context;
}

export function useUserId(): AuthContextProps {
  const context = useContext(AuthContext)!;
  return context;
}

export function useUserImageUrl(): AuthContextProps {
  const context = useContext(AuthContext)!;
  return context;
}

export function useProfileImageModal(): AuthContextProps {
  const context = useContext(AuthContext)!;
  return context;
}

export function usePersonalInfoModal(): AuthContextProps {
  const context = useContext(AuthContext)!;
  return context;
}

export function useEducationModal(): AuthContextProps {
  const context = useContext(AuthContext)!;
  return context;
}

export function useExperienceModal(): AuthContextProps {
  const context = useContext(AuthContext)!;
  return context;
}

export function useRequestModal(): AuthContextProps {
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

export function useScreenNarrow(): ContextProps {
  const context = useContext(Context)!;
  return context;
}

export function useLoadingSpinner(): ContextProps {
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
