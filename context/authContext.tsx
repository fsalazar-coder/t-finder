import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { PutBlobResult } from '@vercel/blob';



interface AuthDataContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userId: Id | string;
  setUserId: React.Dispatch<React.SetStateAction<Id | string>>;
  userEmail: string | null;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
  userProfileImage: UserProfileImage | null;
  setUserProfileImage: React.Dispatch<React.SetStateAction<UserProfileImage | null>>;
  userProfilePersonalInfo: UserProfilePersonalInfo | null;
  setUserProfilePersonalInfo: React.Dispatch<React.SetStateAction<UserProfilePersonalInfo | null>>;
  userProfileExperience: UserProfileExperience[] | [];
  setUserProfileExperience: React.Dispatch<React.SetStateAction<UserProfileExperience[] | []>>;
  userProfileEducation: UserProfileEducation[] | [];
  setUserProfileEducation: React.Dispatch<React.SetStateAction<UserProfileEducation[] | []>>;
  userProfileCourses: UserProfileCourses[] | [];
  setUserProfileCourses: React.Dispatch<React.SetStateAction<UserProfileCourses[] | []>>;
  userProfileProjects: UserProfileProjects[] | [];
  setUserProfileProjects: React.Dispatch<React.SetStateAction<UserProfileProjects[] | []>>;
  userProfilePublications: UserProfilePublications[] | [];
  setUserProfilePublications: React.Dispatch<React.SetStateAction<UserProfilePublications[] | []>>;
  userProfileConferences: UserProfileConferences[] | [];
  setUserProfileConferences: React.Dispatch<React.SetStateAction<UserProfileConferences[] | []>>;
  userProfileCertifications: UserProfileCertifications[] | [];
  setUserProfileCertifications: React.Dispatch<React.SetStateAction<UserProfileCertifications[] | []>>;
  userProfileRecommendations: UserProfileRecommendations[] | [];
  setuserProfileRecommendations: React.Dispatch<React.SetStateAction<UserProfileRecommendations[] | []>>;
  collectionToChange: string;
  setCollectionToChange: React.Dispatch<React.SetStateAction<string>>;
  itemIdToChange: string;
  setItemIdToChange: React.Dispatch<React.SetStateAction<string>>;
  update: string;
  setUpdate: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
}

interface AuthUIContextProps {
  accountActived: boolean;
  setAccountActived: React.Dispatch<React.SetStateAction<boolean>>;
  accountModule: string;
  setAccountModule: React.Dispatch<React.SetStateAction<string>>;
  profileModal: boolean;
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  profileModalAction: string;
  setProfileModalAction: React.Dispatch<React.SetStateAction<string>>;
  profileModalType: string;
  setProfileModalType: React.Dispatch<React.SetStateAction<string>>;
  requestModal: boolean;
  setRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Id {
  id: string;
}

interface UserProfileImage {
  image_url: string,
}

interface UserProfilePersonalInfo {
  full_name: string,
  profession_occupation: string,
  preferred_language: string,
  location: string,
  personal_description: string,
  availability_status: string,
}

interface UserProfileEducation {
  degree: string,
  major_field_study: string,
  university_school: string,
  graduation_year: string,
}

interface UserProfileCourses {
  course_title: string,
  institution: string,
  skills_acquired: string,
  year_completed: number,
}

interface UserProfileExperience {
  company_organization: string,
  role_title: string,
  duration: string,
  responsibilities: string,
  achievements: string,
  technologies_used: string,
  team_size: string,
}

interface UserProfileProjects {
  project_name: string,
  role: string,
  technologies_used: string,
  description: string,
  project_url: string,
}

interface UserProfilePublications {
  publication_title: string,
  authors: string,
  journal_name: string,
  year_published: number,
}

interface UserProfileConferences {
  presentation_title: string,
  conference_name: string,
  location: string,
  year: number,
}

interface UserProfileCertifications {
  certification_name: string,
  issuing_organization: string,
  license_number: number,
  year_issued: number,
}

interface UserProfileRecommendations {
  recommender_title: string,
  recommender_name: string,
  recommender_organization: string,
  recommendation: string,
  recommender_email: string,
  recommender_phone: string,
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
  const [userProfileImage, setUserProfileImage] = useState<UserProfileImage | null>(null);
  const [userProfilePersonalInfo, setUserProfilePersonalInfo] = useState<UserProfilePersonalInfo | null>(null);
  const [userProfileExperience, setUserProfileExperience] = useState<UserProfileExperience[] | []>([]);
  const [userProfileEducation, setUserProfileEducation] = useState<UserProfileEducation[] | []>([]);
  const [userProfileCourses, setUserProfileCourses] = useState<UserProfileCourses[] | []>([]);
  const [userProfileProjects, setUserProfileProjects] = useState<UserProfileProjects[] | []>([]);
  const [userProfilePublications, setUserProfilePublications] = useState<UserProfilePublications[] | []>([]);
  const [userProfileConferences, setUserProfileConferences] = useState<UserProfileConferences[] | []>([]);
  const [userProfileCertifications, setUserProfileCertifications] = useState<UserProfileCertifications[] | []>([]);
  const [userProfileRecommendations, setuserProfileRecommendations] = useState<UserProfileRecommendations[] | []>([]);
  const [collectionToChange, setCollectionToChange] = useState<string>('');
  const [itemIdToChange, setItemIdToChange] = useState<string>('');
  const [update, setUpdate] = useState<string>('')
  const [accountActived, setAccountActived] = useState<boolean>(false);
  const [accountModule, setAccountModule] = useState<string>('');
  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [profileModalAction, setProfileModalAction] = useState<string>('');
  const [profileModalType, setProfileModalType] = useState<string>('');
  const [requestModal, setRequestModal] = useState<boolean>(false);;

  const logout = () => {
    setToken(null);
    setUserId('');
    setUserEmail(null);
    setUserProfileImage(null);
    setUserProfilePersonalInfo(null);
    setUserProfileExperience([]);
    setUserProfileEducation([]);
    setUserProfileCourses([]);
    setUserProfileProjects([]);
    setUserProfilePublications([]);
    setUserProfileConferences([]);
    setUserProfileCertifications([]);
    setuserProfileRecommendations([]);
    setCollectionToChange('');
    setItemIdToChange('');
    setProfileModalAction('');
    setProfileModalType('');
  };


  return (
    <AuthDataContext.Provider value={{
      token, setToken,
      userId, setUserId,
      userEmail, setUserEmail,
      userProfileImage, setUserProfileImage,
      userProfilePersonalInfo, setUserProfilePersonalInfo,
      userProfileEducation, setUserProfileEducation,
      userProfileCourses, setUserProfileCourses,
      userProfileExperience, setUserProfileExperience,
      userProfileProjects, setUserProfileProjects,
      userProfilePublications, setUserProfilePublications,
      userProfileConferences, setUserProfileConferences,
      userProfileCertifications, setUserProfileCertifications,
      userProfileRecommendations, setuserProfileRecommendations,
      collectionToChange, setCollectionToChange,
      itemIdToChange, setItemIdToChange,
      update, setUpdate,
      logout
    }}>
      <AuthUIContext.Provider value={{
        accountActived, setAccountActived,
        accountModule, setAccountModule,
        profileModal, setProfileModal,
        profileModalAction, setProfileModalAction,
        profileModalType, setProfileModalType,
        requestModal, setRequestModal,
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