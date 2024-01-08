import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import io, { Socket } from 'socket.io-client';



interface UserProfileData {
  personalInfo: UserProfilePersonalInfo | null;
  experience: UserProfileExperience[];
  education: UserProfileEducation[];
  courses: UserProfileCourses[];
  projects: UserProfileProjects[];
  publications: UserProfilePublications[];
  conferences: UserProfileConferences[];
  certifications: UserProfileCertifications[];
  recommendations: UserProfileRecommendations[];
}

// Initialize with default values
const initialUserProfileData: UserProfileData = {
  personalInfo: null,
  experience: [],
  education: [],
  courses: [],
  projects: [],
  publications: [],
  conferences: [],
  certifications: [],
  recommendations: [],
};

interface UserRequestData {
  requestTalent: UserRequestTalent[];
  requestJob: UserRequestJob[];
}

// Initialize with default values
const initialUserRequestData: UserRequestData = {
  requestTalent: [],
  requestJob: [],
};




interface AuthDataContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userId: Id | string;
  setUserId: React.Dispatch<React.SetStateAction<Id | string>>;
  userEmail: string | null;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
  userImage: string | null;
  setUserImage: React.Dispatch<React.SetStateAction<string | null>>;

  userProfileData: UserProfileData;
  setUserProfileData: React.Dispatch<React.SetStateAction<UserProfileData>>;
  userRequestData: UserRequestData;
  setUserRequestData: React.Dispatch<React.SetStateAction<UserRequestData>>;

  talentRequestStatus: string;
  setTalentRequestStatus: React.Dispatch<React.SetStateAction<string>>;
  jobRequestStatus: string;
  setJobRequestStatus: React.Dispatch<React.SetStateAction<string>>;
  userScore: number;
  setUserScore: React.Dispatch<React.SetStateAction<number>>;
  collectionToChange: string;
  setCollectionToChange: React.Dispatch<React.SetStateAction<string>>;
  itemIdToChange: string;
  setItemIdToChange: React.Dispatch<React.SetStateAction<string>>;
  update: string;
  setUpdate: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket | null;  // Allow socket to be null
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
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
  requestModal: string;
  setRequestModal: React.Dispatch<React.SetStateAction<string>>;
  requestModalAction: string;
  setRequestModalAction: React.Dispatch<React.SetStateAction<string>>;
  chatActived: boolean;
  setChatActived: React.Dispatch<React.SetStateAction<boolean>>;
  chatDataUser: {};
  setChatDataUser: React.Dispatch<React.SetStateAction<{} | {}>>;
}

interface Id {
  id: string;
}

interface ChatDataUser {
  user_id: string,
  user_name: string,
  user_image: string,
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

interface UserRequestTalent {
  _id: string,
  job_title: string,
  job_category: string,
  skills_required: string,
  job_description: string,
  experience_needed: string,
  location: string,
  compensation: string,
  application_deadline: string,
  company_info: string,
  additional_perks: string,
}

interface UserRequestJob {
  _id: string,
  talent_title: string,
  talent_category: string,
  skills_offered: string,
  talent_description: string,
  experience_level: string,
  location_preference: string,
  availability: string,
  duration: string,
  rates: string,
  additional_requirements: string
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
  messageModal: Messages[] | [];
  setMessageModal: React.Dispatch<React.SetStateAction<Messages[] | []>>;
}

interface ProviderProps {
  children: ReactNode;
}

interface Messages {
  type: string,     // types: successful, error, question, logout, delete
  text: string,
  click: () => void
}

const AuthDataContext = createContext<AuthDataContextProps | undefined>(undefined);
const AuthUIContext = createContext<AuthUIContextProps | undefined>(undefined);



export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | { id: string }>('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  const [userProfileData, setUserProfileData] = useState<UserProfileData>(initialUserProfileData);
  const [userRequestData, setUserRequestData] = useState<UserRequestData>(initialUserRequestData);

  const [accountActived, setAccountActived] = useState<boolean>(false);
  const [accountModule, setAccountModule] = useState<string>('');
  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [profileModalAction, setProfileModalAction] = useState<string>('');
  const [profileModalType, setProfileModalType] = useState<string>('');
  
  const [talentRequestStatus, setTalentRequestStatus] = useState<string>('');
  const [jobRequestStatus, setJobRequestStatus] = useState<string>('');
  const [userScore, setUserScore] = useState<number>(0);
  const [requestModal, setRequestModal] = useState<string>('');
  const [requestModalAction, setRequestModalAction] = useState<string>('');
  const [collectionToChange, setCollectionToChange] = useState<string>('');
  const [itemIdToChange, setItemIdToChange] = useState<string>('');
  const [chatActived, setChatActived] = useState<boolean>(false);
  const [chatDataUser, setChatDataUser] = useState<object>({});
  const [update, setUpdate] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const logout = () => {
    setToken(null);
    setUserId('');
    setUserEmail(null);
    setUserImage(null);

    setUserProfileData(initialUserProfileData);
    setUserRequestData(initialUserRequestData);

    setUserScore(0);
    setCollectionToChange('');
    setItemIdToChange('');
    setProfileModalAction('');
    setProfileModalType('');
    setRequestModal('');
    setRequestModalAction('');
    setChatActived(false);
    setAccountActived(false)
    setAccountModule('')
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  useEffect(() => {
    if (token && accountActived) {
      const newSocket = io('http://localhost:3000', { query: { token: token as string } });
      newSocket.on('connection', () => { console.log('Conectado al servidor WebSocket') });
      setSocket(newSocket);
      console.log('New socket: ', newSocket);
    }
    else if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [token, accountActived]);


  return (
    <AuthDataContext.Provider value={{
      token, setToken,
      userId, setUserId,
      userEmail, setUserEmail,
      userImage, setUserImage,

      userProfileData,
      setUserProfileData,
      userRequestData,
      setUserRequestData,
      
      talentRequestStatus, setTalentRequestStatus,
      jobRequestStatus, setJobRequestStatus,
      userScore, setUserScore,
      collectionToChange, setCollectionToChange,
      itemIdToChange, setItemIdToChange,
      update, setUpdate,
      socket, setSocket,
      logout,
    }}>
      <AuthUIContext.Provider value={{
        accountActived, setAccountActived,
        accountModule, setAccountModule,
        profileModal, setProfileModal,
        profileModalAction, setProfileModalAction,
        profileModalType, setProfileModalType,
        requestModal, setRequestModal,
        requestModalAction, setRequestModalAction,
        chatActived, setChatActived,
        chatDataUser, setChatDataUser,
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
  const [messageModal, setMessageModal] = useState<Messages[] | []>([]);
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