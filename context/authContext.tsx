import { userDataHandlerFunction } from "@/pages/api/userDataHandlerFunction";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import io, { Socket } from 'socket.io-client';



interface UserProfileData {
  personalInfo: UserProfilePersonalInfo[];
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
  personalInfo: [],
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

interface Notifications {
  _id: string,
  created_at: string,
  to_user_id: string,
  from_user_id: string,
  to_request_id: string,
  from_request_id: string,
  notification_type: string
}

interface AuthUIContextProps {
  accountActived: boolean;
  setAccountActived: React.Dispatch<React.SetStateAction<boolean>>;
  accountModule: string;
  setAccountModule: React.Dispatch<React.SetStateAction<string>>;

  profileModal: string;
  setProfileModal: React.Dispatch<React.SetStateAction<string>>;
  profileModalAction: string;
  setProfileModalAction: React.Dispatch<React.SetStateAction<string>>;

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
  title: string,
  job_category: string,
  job_description: string,
  required_skills: string,
  required_experience_years: string,
  modality_work: string,
  company_name: string,
  location: string,
  offered_compensation: string,
  status: string
}

interface UserRequestJob {
  _id: string,
  title: string,
  talent_category: string,
  talent_description: string,
  offered_skills: string,
  experience_years: string,
  modality_work: string,
  availability: string,
  location: string,
  desired_compensation: string,
  status: string
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

interface UnreadMessagesForUser {
  [key: string]: number
}


interface UserConnected {
  _id: string,
  type: string,
  user_id: string,
  user_image_url: string,
  full_name: string,
  profession_occupation: string,
  preferred_language: string,
  location: string,
  created_date: string,
}

interface UserChatsData {
  to_user_id: string,
  from_user_id: string,
  message: string,
  message_date: string,
  message_time: string,
  message_status: string
}


interface AuthDataContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userId: Id | string;
  setUserId: React.Dispatch<React.SetStateAction<Id | string>>;
  userEmail: string | null;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
  userImageUrl: string | null;
  setUserImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  userProfileData: UserProfileData;
  setUserProfileData: React.Dispatch<React.SetStateAction<UserProfileData>>;
  userRequestData: UserRequestData;
  setUserRequestData: React.Dispatch<React.SetStateAction<UserRequestData>>;
  userNotificationsData: Notifications[] | [];
  setUserNotificationsData: React.Dispatch<React.SetStateAction<Notifications[] | []>>;
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
  updateCounter: number;
  setUpdateCounter: React.Dispatch<React.SetStateAction<number>>;

  unreadMessagesForUser: UnreadMessagesForUser;
  setUnreadMessagesForUser: React.Dispatch<React.SetStateAction<UnreadMessagesForUser>>;

  isGettingChatData: boolean;
  setIsGettingChatData: React.Dispatch<React.SetStateAction<boolean>>;
  userChatsData: UserChatsData[] | [];
  setUserChatsData: React.Dispatch<React.SetStateAction<UserChatsData[]>>;

  unreadMessages: number;
  setUnreadMessages: React.Dispatch<React.SetStateAction<number>>;
  usersConnected: UserConnected[] | [];
  setUsersConnected: React.Dispatch<React.SetStateAction<UserConnected[]>>;

  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  logout: () => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);
const AuthUIContext = createContext<AuthUIContextProps | undefined>(undefined);
const AuthDataContext = createContext<AuthDataContextProps | undefined>(undefined);


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

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | { id: string }>('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [userProfileData, setUserProfileData] = useState<UserProfileData>(initialUserProfileData);
  const [userRequestData, setUserRequestData] = useState<UserRequestData>(initialUserRequestData);
  const [userNotificationsData, setUserNotificationsData] = useState<Notifications[] | []>([]);
  const [accountActived, setAccountActived] = useState<boolean>(false);
  const [accountModule, setAccountModule] = useState<string>('');
  const [profileModal, setProfileModal] = useState<string>('');
  const [profileModalAction, setProfileModalAction] = useState<string>('');
  const [requestModal, setRequestModal] = useState<string>('');
  const [requestModalAction, setRequestModalAction] = useState<string>('');
  const [talentRequestStatus, setTalentRequestStatus] = useState<string>('');
  const [jobRequestStatus, setJobRequestStatus] = useState<string>('');
  const [userScore, setUserScore] = useState<number>(0);
  const [collectionToChange, setCollectionToChange] = useState<string>('');
  const [itemIdToChange, setItemIdToChange] = useState<string>('');

  const [socket, setSocket] = useState<Socket | null>(null);
  const [usersConnected, setUsersConnected] = useState<UserConnected[]>([]);
  const [chatDataUser, setChatDataUser] = useState<object>({});
  const [chatActived, setChatActived] = useState<boolean>(false);
  const [isGettingChatData, setIsGettingChatData] = useState(true);
  const [userChatsData, setUserChatsData] = useState<any[]>([]);

  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [unreadMessagesForUser, setUnreadMessagesForUser] = useState<UnreadMessagesForUser>({});

  const [updateCounter, setUpdateCounter] = useState<number>(0);
  const [update, setUpdate] = useState<string>('');

  const logout = () => {
    setToken(null);
    setUserId('');
    setUserEmail(null);
    setUserImageUrl(null);
    setUserProfileData(initialUserProfileData);
    setUserRequestData(initialUserRequestData);
    setUserNotificationsData([]);
    setUserScore(0);
    setCollectionToChange('');
    setItemIdToChange('');
    setProfileModal('');
    setProfileModalAction('');
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


  // get connections
  useEffect(() => {
    if (token && userId && (update === 'all' || update === 'connections')) {
      setUpdateCounter((counter) => counter + 1);
      const fetchConnectedUserData = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-connected-user-info',
          collectionName: 'connections',
          data: '',
          onSuccess: (responseData: any) => {
            setUsersConnected(responseData);
          },
          onError: (error: any) => console.error(error)
        });
      }
      fetchConnectedUserData().then(() => {
        setUpdateCounter((counter) => counter - 1);
        if ((update === 'all' && updateCounter === 0) || update === 'connections') {
          setUpdate('');
        }
      })
    };
  }, [token, userId, update]);

  ///get unread message on chats 
  useEffect(() => {
    if (token && userId && update === 'all') {
      setUpdateCounter((counter) => counter + 1);
      const fetchUnreadMessage = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-unread-messages',
          collectionName: 'connections',
          data: '',
          onSuccess: (responseData: any) => {
            setUnreadMessagesForUser(responseData.unreadMessagesByUser);
            setUnreadMessages(responseData.totalUnreadMessages);
          },
          onError: (error: any) => console.error(error)
        });
      };
      fetchUnreadMessage().then(() => {
        setUpdateCounter((counter) => counter - 1);
        if (update === 'all' && updateCounter === 0) {
          setUpdate('');
        }
      });
    };
  }, [token, userId, update]);

  //web-socket connection
  useEffect(() => {
    if (token && userId) {
      const newSocket = io('http://localhost:3000', { query: { token: token as string } });
      newSocket.on('connect', () => {
        console.log('Conectado al servidor WebSocket')
      });
      setSocket(newSocket);
    }
    else if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [token, userId]);



  //web-socket chats message listener
  useEffect(() => {
    if (token && socket && chatActived && !isGettingChatData) {
      socket.on('message', (data: SocketsMessages) => {
        setUserChatsData(prevChats => [...prevChats, data])
      });
      return () => { socket.off('message') };
    }
    else if (token && socket && !chatActived) {
      socket.on('message', (data: SocketsMessages) => {
        const { from_user_id } = data;
        setUnreadMessages((prevUnread: number) => prevUnread + 1);
        setUnreadMessagesForUser((prevMessages: UnreadMessagesForUser) => ({
          ...prevMessages,
          [from_user_id]: (prevMessages[from_user_id] || 0) + 1
        }));
      });
      return () => { socket.off('message') };
    }
  }, [token, socket, chatActived, isGettingChatData]);




  return (
    <AuthDataContext.Provider value={{
      token, setToken,
      userId, setUserId,
      userEmail, setUserEmail,
      userImageUrl, setUserImageUrl,
      userProfileData,
      setUserProfileData,
      userRequestData,
      setUserRequestData,
      userNotificationsData,
      setUserNotificationsData,
      talentRequestStatus, setTalentRequestStatus,
      jobRequestStatus, setJobRequestStatus,
      userScore, setUserScore,
      collectionToChange, setCollectionToChange,
      itemIdToChange, setItemIdToChange,
      update, setUpdate,
      unreadMessagesForUser, setUnreadMessagesForUser,
      unreadMessages, setUnreadMessages,
      usersConnected, setUsersConnected,
      isGettingChatData, setIsGettingChatData,
      userChatsData, setUserChatsData,
      updateCounter, setUpdateCounter,
      socket, setSocket,
      logout,
    }}>
      <AuthUIContext.Provider value={{
        accountActived, setAccountActived,
        accountModule, setAccountModule,
        profileModal, setProfileModal,
        profileModalAction, setProfileModalAction,
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


export function useUI(): UIContextProps {
  const context = useContext(UIContext)!;
  return context;
};

export function useAuthUI(): AuthUIContextProps {
  const context = useContext(AuthUIContext)!;
  return context;
};

export function useAuthData(): AuthDataContextProps {
  const context = useContext(AuthDataContext)!;
  return context;
};
