import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";



interface AuthDataContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userId: Id | string;
  setUserId: React.Dispatch<React.SetStateAction<Id | string>>;
  userEmail: string | null;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
  userImageUrl: string;
  setUserImageUrl: React.Dispatch<React.SetStateAction<string>>;
  updateUserImageUrl: (imageUrl: string) => void;
  userProfileInfo: UserProfileInfo | null;
  setUserProfileInfo: React.Dispatch<React.SetStateAction<UserProfileInfo | null>>;
  updateUserProfileInfo: (profileInfo: UserProfileInfo) => void;
  userEducationalInfo: UserEducationalInfo | null;
  setUserEducationalInfo: React.Dispatch<React.SetStateAction<UserEducationalInfo | null>>;
  updateUserEducationalInfo: (educationalInfo: UserEducationalInfo) => void;
  userExperienceInfo: UserExperienceInfo | null;
  setUserExperienceInfo: React.Dispatch<React.SetStateAction<UserExperienceInfo | null>>;
  updateUserExperienceInfo: (experienceInfo: UserExperienceInfo) => void;
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
  educationalInfoModal: boolean;
  setEducationalInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
  experienceInfoModal: boolean;
  setExperienceInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
  requestModal: boolean;
  setRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  email: string;
}

interface Id {
  id: string;
}

interface UserProfileInfo {
  full_name: string,
  profession_occupation: string,
  preferred_language: string,
  location: string,
  personal_description: string,
  availability_status: string,
}

interface UserEducationalInfo {   
  degree: string,
  major_field_study: string,
  university_school: string,
  graduation_year: string,
}


interface UserCoursesInfo {   
  courses: string,
}

interface UserProjectsInfo {   
  projects: string,
}

interface UserHonorsInfo {   
  honors: string,
}

interface UserCertificationsInfo {   
  certifications: string,
}

interface UserExperienceInfo {
  company_organization: string,
  role_title: string,
  duration: string,
  responsibilities: string,
  achievements: string,
  technologies_used: string,
  team_size: string,
  references: string,
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
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string>('');
  const [userProfileInfo, setUserProfileInfo] = useState<UserProfileInfo | null>(null);
  const [userEducationalInfo, setUserEducationalInfo] = useState<UserEducationalInfo | null>(null);
  const [userExperienceInfo, setUserExperienceInfo] = useState<UserExperienceInfo | null>(null);
  const [accountActived, setAccountActived] = useState<boolean>(false);
  const [accountModule, setAccountModule] = useState<string>('');
  const [profileImageModal, setProfileImageModal] = useState<boolean>(false);
  const [personalInfoModal, setPersonalInfoModal] = useState<boolean>(false);
  const [educationalInfoModal, setEducationalInfoModal] = useState<boolean>(false);
  const [experienceInfoModal, setExperienceInfoModal] = useState<boolean>(false);
  const [requestModal, setRequestModal] = useState<boolean>(false);

  const updateUserImageUrl = (imageUrl: string) => {
    setUserImageUrl(imageUrl);
  };

  const updateUserProfileInfo = (profileInfo: UserProfileInfo) => {
    setUserProfileInfo(profileInfo);
  };

  const updateUserEducationalInfo = (educationalInfo: UserEducationalInfo) => {
    setUserEducationalInfo(educationalInfo);
  };

  const updateUserExperienceInfo = (experienceInfo: UserExperienceInfo) => {
    setUserExperienceInfo(experienceInfo);
  };


  return (
    <AuthDataContext.Provider value={{
      token, setToken,
      userId, setUserId,
      userEmail, setUserEmail,
      userProfileInfo, setUserProfileInfo,
      updateUserProfileInfo,
      userEducationalInfo, setUserEducationalInfo,
      updateUserEducationalInfo,
      userExperienceInfo, setUserExperienceInfo,
      updateUserExperienceInfo,
      userImageUrl, setUserImageUrl,
      updateUserImageUrl
    }}>
      <AuthUIContext.Provider value={{
        accountActived, setAccountActived,
        accountModule, setAccountModule,
        profileImageModal, setProfileImageModal,
        personalInfoModal, setPersonalInfoModal,
        educationalInfoModal, setEducationalInfoModal,
        experienceInfoModal, setExperienceInfoModal,
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