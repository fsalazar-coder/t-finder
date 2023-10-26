import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";



interface AuthDataContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  userId: Id | string;
  setUserId: React.Dispatch<React.SetStateAction<Id | string>>;
  userImageUrl: string;
  setUserImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthUIContextProps {
  accountActived: boolean;
  setAccountActived: React.Dispatch<React.SetStateAction<boolean>>;
  accountModule: string;
  setAccountModule: React.Dispatch<React.SetStateAction<string>>;
  profileImageModal: boolean;
  setProfileImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  personalInfoModal: boolean;
  setPersonalInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
  educationModal: boolean;
  setEducationModal: React.Dispatch<React.SetStateAction<boolean>>;
  experienceModal: boolean;
  setExperienceModal: React.Dispatch<React.SetStateAction<boolean>>;
  requestModal: boolean;
  setRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  email: string;
}

interface Id {
  id: string;
}

interface UserData {
  _id: string,
  email: string,
  password_hash: string,
  full_name: string,
  profile_image_url: string,
  profession_occupation: string,
  preferred_language: string,
  location: string,
  personal_description: string,
  availability_status: string,
  created_at: string,
}

interface AuthProviderProps {
  children: ReactNode;
}

interface UIContextProps {
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  hamburguerMenuActive: boolean;
  setHamburguerMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
  screenNarrow: boolean;
  setScreenNarrow: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loginModal: boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  joinModal: boolean;
  setJoinModal: React.Dispatch<React.SetStateAction<boolean>>;
  passwordResetModal: boolean;
  setPasswordResetModal: React.Dispatch<React.SetStateAction<boolean>>;
  messageModal: boolean;
  setMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
  typeMessageModal: string;
  setTypeMessageModal: React.Dispatch<React.SetStateAction<string>>;
  textMessageModal: string;
  setTextMessageModal: React.Dispatch<React.SetStateAction<string>>;
}

interface ProviderProps {
  children: ReactNode;
}

const AuthDataContext = createContext<AuthDataContextProps | undefined>(undefined);
const AuthUIContext = createContext<AuthUIContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | { id: string }>('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string>('');
  const [accountActived, setAccountActived] = useState<boolean>(false);
  const [accountModule, setAccountModule] = useState<string>('');
  const [profileImageModal, setProfileImageModal] = useState<boolean>(false);
  const [personalInfoModal, setPersonalInfoModal] = useState<boolean>(false);
  const [educationModal, setEducationModal] = useState<boolean>(false);
  const [experienceModal, setExperienceModal] = useState<boolean>(false);
  const [requestModal, setRequestModal] = useState<boolean>(false);

  return (
    <AuthDataContext.Provider value={{
      token, setToken,
      userId, setUserId,
      userData, setUserData,
      userImageUrl, setUserImageUrl
    }}>
      <AuthUIContext.Provider value={{
        accountActived, setAccountActived,
        accountModule, setAccountModule,
        profileImageModal, setProfileImageModal,
        personalInfoModal, setPersonalInfoModal,
        educationModal, setEducationModal,
        experienceModal, setExperienceModal,
        requestModal, setRequestModal
      }}>
        {children}
      </AuthUIContext.Provider>
    </AuthDataContext.Provider>
  );
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const Provider = ({ children }: ProviderProps): JSX.Element => {
  const [screenNarrow, setScreenNarrow] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [hamburguerMenuActive, setHamburguerMenuActive] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [joinModal, setJoinModal] = useState<boolean>(false);
  const [passwordResetModal, setPasswordResetModal] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<boolean>(false);
  const [typeMessageModal, setTypeMessageModal] = useState<string>('');
  const [textMessageModal, setTextMessageModal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const screenNarrowHandle: any = () => {
    window.innerWidth < 768 ?
      setScreenNarrow(true)
      : setScreenNarrow(false);
  };

  useEffect(() => {
    window.addEventListener('resize', screenNarrowHandle);
    screenNarrowHandle();

    return () => {
      window.removeEventListener('resize', screenNarrowHandle);
    };
  });


  return (
    <UIContext.Provider value={
      {
        screenNarrow, setScreenNarrow,
        dropdown, setDropdown,
        hamburguerMenuActive, setHamburguerMenuActive,
        joinModal, setJoinModal,
        loginModal, setLoginModal,
        passwordResetModal, setPasswordResetModal,
        messageModal, setMessageModal,
        typeMessageModal, setTypeMessageModal,
        textMessageModal, setTextMessageModal,
        loading, setLoading,
      }
    }>
      {children}
    </UIContext.Provider>
  );
}

export function useAuthData(): AuthDataContextProps {
  const context = useContext(AuthDataContext)!;
  return context;
}

export function useAuthUI(): AuthUIContextProps {
  const context = useContext(AuthUIContext)!;
  return context;
}

export function useUI(): UIContextProps {
  const context = useContext(UIContext)!;
  return context;
}