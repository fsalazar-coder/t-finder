import { userDataHandlerFunction } from "@/pages/api/userDataHandlerFunction";
import { userProfileScoreFunction } from "@/pages/api/userProfileScoreFunction";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useUI } from "./ContextUI";
import { useAuth } from "./ContextAuth";

/// Interfaces about users profile
interface UserProfileData {
  personalInfo: PersonalInfo[];
  experience: Experience[];
  education: Education[];
  courses: Courses[];
  recommendations: Recommendations[];
};

interface PersonalInfo {
  full_name: string,
  profession_occupation: string,
  preferred_language: string,
  location: string,
}

interface Education {
  degree: string,
  major_field_study: string,
  university_school: string,
  graduation_year: string,
}

interface Courses {
  course_title: string,
  institution: string,
  skills_acquired: string,
  year_completed: number,
}

interface Experience {
  company_organization: string,
  role_title: string,
  duration: string,
  responsibilities: string,
  achievements: string,
  technologies_used: string,
  team_size: string,
}

interface Recommendations {
  recommender_title: string,
  recommender_name: string,
  recommender_organization: string,
  recommendation: string,
  recommender_email: string,
  recommender_phone: string,
}

/// Interfaces about users requests
interface UserRequestData {
  requestTalent: RequestTalent[];
  requestJob: RequestJob[];
}

interface RequestTalent {
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
  created_at: string,
  status: string
}

interface RequestJob {
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
  created_at: string,
  status: string
}

interface UserRequestStatusData {
  requestTalent: StatusRequestData[];
  requestJob: StatusRequestData[];
}

interface StatusRequestData {
  request_id: string,
  creation_date: string,
  category: string,
  status: string
}

interface DataProviderProps {
  children: ReactNode;
}

interface GotoParams {
  account: string,
  menu: string,
  requestId: string
}

/// interface about DATA context props authenticated
interface ContextAuthDataProps {
  userImageUrl: string | null;
  setUserImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  profileModal: string;
  setProfileModal: React.Dispatch<React.SetStateAction<string>>;
  profileModalAction: string;
  setProfileModalAction: React.Dispatch<React.SetStateAction<string>>;
  userProfileData: UserProfileData;
  setUserProfileData: React.Dispatch<React.SetStateAction<UserProfileData>>;
  userProfileScore: number;
  setUserProfileScore: React.Dispatch<React.SetStateAction<number>>;
  requestModal: string;
  setRequestModal: React.Dispatch<React.SetStateAction<string>>;
  requestModalAction: string;
  setRequestModalAction: React.Dispatch<React.SetStateAction<string>>;
  userRequestData: UserRequestData;
  setUserRequestData: React.Dispatch<React.SetStateAction<UserRequestData>>;
  connectionRequestJobId: string;
  setConnectionRequestJobId: React.Dispatch<React.SetStateAction<string>>;
  userRequestStatusData: UserRequestStatusData;
  setUserRequestStatusData: React.Dispatch<React.SetStateAction<UserRequestStatusData>>;
  collectionToChange: string;
  setCollectionToChange: React.Dispatch<React.SetStateAction<string>>;
  itemIdToChange: string;
  setItemIdToChange: React.Dispatch<React.SetStateAction<string>>;
  update: string;
  setUpdate: React.Dispatch<React.SetStateAction<string>>;
  updateCounter: number;
  setUpdateCounter: React.Dispatch<React.SetStateAction<number>>;
  goto: GotoParams | null;
  setGoto: React.Dispatch<React.SetStateAction<GotoParams | null>>;
  gotoCounter: number;
  setGotoCounter: React.Dispatch<React.SetStateAction<number>>;
}

const ContextAuthData = createContext<ContextAuthDataProps | undefined>(undefined);


export const AuthDataProvider = ({ children }: DataProviderProps): JSX.Element => {
  const { token, userId, isLoggingOut, setCleanupDone } = useAuth();
  const { accountModule, setAccountModule, setRequestMenu } = useUI();
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [profileModal, setProfileModal] = useState<string>('');
  const [profileModalAction, setProfileModalAction] = useState<string>('');
  const [userProfileData, setUserProfileData] = useState<UserProfileData>({
    personalInfo: [],
    experience: [],
    education: [],
    courses: [],
    recommendations: []
  });
  const [userProfileScore, setUserProfileScore] = useState<number>(0);
  const [requestModal, setRequestModal] = useState<string>('');
  const [requestModalAction, setRequestModalAction] = useState<string>('');
  const [userRequestData, setUserRequestData] = useState<UserRequestData>({
    requestTalent: [], requestJob: [],
  });
  const [connectionRequestJobId, setConnectionRequestJobId] = useState('');
  const [userRequestStatusData, setUserRequestStatusData] = useState<UserRequestStatusData>({
    requestTalent: [], requestJob: []
  });
  const [collectionToChange, setCollectionToChange] = useState<string>('');
  const [itemIdToChange, setItemIdToChange] = useState<string>('');
  const [goto, setGoto] = useState<GotoParams | null>(null);
  const [gotoCounter, setGotoCounter] = useState<number>(0);
  const [updateCounter, setUpdateCounter] = useState<number>(0);
  const [update, setUpdate] = useState<string>('');
  const isProfileModal = profileModal !== '';
  const isRequestModal = requestModal !== '';

  const modalCloseEscapeHandle = (e: any) => {
    if ((e.charCode | e.keyCode) === 27) {
      setProfileModal('');
      setProfileModalAction('');
      setCollectionToChange('');
      setRequestModal('');
      setRequestModalAction('');
    }
  };

  //modal Close Escape Handle
  useEffect(() => {
    document.addEventListener('keydown', modalCloseEscapeHandle);
    return () => { document.removeEventListener('keydown', modalCloseEscapeHandle) };
  }, []);

  useEffect(() => {
    document.body.style.overflowY = (profileModal || requestModal) ? 'hidden' : 'auto';
  }, [isProfileModal, isRequestModal]);

  // get user profile image  
  useEffect(() => {
    if (token && userId && (update === 'all')) {
      setUpdateCounter((counter) => counter + 1);
      const fetchUserProfileImage = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-default',
          collection: 'profile_image',
          data: '',
          onSuccess: (responseData: any) => {
            setUserImageUrl(responseData.image_url);
          },
          onError: (error: any) => console.error(error)
        });
      };
      fetchUserProfileImage().then(() => {
        setUpdateCounter((counter) => counter - 1);
        if ((update === 'all' && updateCounter === 0)) {
          setUpdate('');
        }
      });
    }
  }, [token, userId, update]);

  /// get user profile data
  useEffect(() => {
    if (token && userId && update === 'all') {
      setUpdateCounter((counter) => counter + 1);
      const fetchUserProfileData = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-user-profile-data',
          collection: 'any',
          data: '',
          onSuccess: (responseData: any) => {
            setUserProfileData(responseData);
          },
          onError: (error: any) => console.error(error)
        });
      };
      fetchUserProfileData().then(() => {
        setUpdateCounter((counter) => counter - 1);
        if (update === 'all' && updateCounter === 0) {
          setUpdate('');
        }
      });
    };
  }, [token, userId, update]);

  // get user profile score
  useEffect(() => {
    if (token && userId && update === 'all') {
      const fetchUserProfileScore = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-default',
          collection: 'profile_score',
          data: '',
          onSuccess: (responseData: any) => {
            setUserProfileScore(responseData.profile_score);
          },
          onError: (error: any) => console.error(error)
        });
      };
      fetchUserProfileScore().then(() => {
        setUpdateCounter((counter) => counter - 1);
        if (update === 'all' && updateCounter === 0) {
          setUpdate('');
        }
      });
    }
  }, [token, userId, update]);

  // profile score update
  useEffect(() => {
    if (token && userId && update === 'profile-score') {
      const updateUserProfileScore = async () => {
        let profile: any = [
          {
            id: 'experience',
            data: userProfileData.experience,
            shouldRender: userProfileData.experience.length > 0,
            length: userProfileData.experience.length,
          },
          {
            id: 'education',
            data: userProfileData.education,
            shouldRender: userProfileData.education.length > 0,
            length: userProfileData.education.length
          },
          {
            id: 'courses',
            data: userProfileData.courses,
            shouldRender: userProfileData.courses.length > 0,
            length: userProfileData.courses.length
          },
          {
            id: 'recommendations',
            data: userProfileData.recommendations,
            shouldRender: userProfileData.recommendations.length > 0,
            length: userProfileData.recommendations.length
          }
        ];
        let score: any = userProfileScoreFunction(profile, 'score');
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'update-default',
          collection: 'profile_score',
          data: { profile_score: score.toString() },
          onSuccess: () => { },
          onError: (error: any) => console.error(error)
        });
      };
      updateUserProfileScore().then(() => {
        if (update === 'profile-score') {
          setUpdate('');
        }
      });
    };
  }, [token, userId, userProfileData, update]);

  // get user request data
  useEffect(() => {
    if (token && userId && update === 'all') {
      setUpdateCounter((counter) => counter + 1);
      const fetchUserRequestData = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-user-request-data',
          collection: 'any',
          data: '',
          onSuccess: (responseData: any) => {
            setUserRequestData(responseData);
          },
          onError: (error: any) => console.error(error)
        });
      };
      fetchUserRequestData().then(() => {
        setUpdateCounter((counter) => counter - 1);
        setCollectionToChange('');
        if (update === 'all' && updateCounter === 0) {
          setUpdate('');
        }
      });
    }
  }, [token, userId, update]);

  //All status from request to render on dashboard
  useEffect(() => {
    if (token && userId && userRequestData && (accountModule === 'Dashboard' || update === 'all' || update === 'requests-status')) {
      setUpdateCounter((counter) => counter + 1);
      const statusRequestData: any = async () => {
        const transformArray = (requests: RequestTalent[] | RequestJob[], category: string) =>
          requests.map((request: any) => ({
            requestId: request._id,
            creationDate: request.created_at,
            category: category === 'talent' ? request.job_category : request.talent_category,
            status: request.status,
          }));
        let statusRequestAll: any = {
          requestTalent: transformArray(userRequestData.requestTalent, 'talent'),
          requestJob: transformArray(userRequestData.requestJob, 'job'),
        };
        setUserRequestStatusData(statusRequestAll);
      };
      statusRequestData().then(() => {
        setUpdateCounter((counter) => counter - 1);
        if ((update === 'all' && updateCounter === 0) || update === 'requests-status') {
          setUpdate('');
        }
      });
    }
  }, [token, userId, userRequestData, accountModule, update]);

  /// goto!!!!!! desde notificaciones no aceptadas hacia el requests u oferta
  useEffect(() => {
    if (goto) {
      switch (gotoCounter) {
        case 0:
          setAccountModule(goto.account);
          setConnectionRequestJobId(goto.requestId);
          setGotoCounter(1);
          break;
        case 1:
          setRequestMenu(goto.menu);
          setConnectionRequestJobId(goto.requestId);
          setGotoCounter(2);
          break;
        case 2:
          setRequestMenu(goto.menu);
          setConnectionRequestJobId(goto.requestId);
          setTimeout(() => {
            setGoto(null);
          }, 1000);
          break;
        default:
          break;
      }
    }
  }, [goto, gotoCounter]);

  /// logout, clear data
  useEffect(() => {
    if (isLoggingOut) {
      setUserImageUrl(null);
      setProfileModal('');
      setProfileModalAction('');
      setUserProfileData({
        personalInfo: [],
        experience: [],
        education: [],
        courses: [],
        recommendations: []
      });
      setUserProfileScore(0);
      setRequestModal('');
      setRequestModalAction('');
      setUserRequestData({
        requestTalent: [], requestJob: [],
      });
      setConnectionRequestJobId('');
      setUserRequestStatusData({
        requestTalent: [], requestJob: []
      });
      setCollectionToChange('');
      setItemIdToChange('');
      setGoto(null);
      setGotoCounter(0);
      setUpdateCounter(0);
      setUpdate('');
      setCleanupDone(prev => ({ ...prev, authDataCleaned: true }));
    }
  }, [isLoggingOut, setCleanupDone]);


  return (
    <ContextAuthData.Provider value={{
      userImageUrl, setUserImageUrl,
      userProfileData, setUserProfileData,
      userProfileScore, setUserProfileScore,
      userRequestData, setUserRequestData,
      connectionRequestJobId, setConnectionRequestJobId,
      userRequestStatusData, setUserRequestStatusData,
      profileModal, setProfileModal,
      profileModalAction, setProfileModalAction,
      requestModal, setRequestModal,
      requestModalAction, setRequestModalAction,
      collectionToChange, setCollectionToChange,
      itemIdToChange, setItemIdToChange,
      update, setUpdate,
      updateCounter, setUpdateCounter,
      goto, setGoto,
      gotoCounter, setGotoCounter
    }}>
      {children}
    </ContextAuthData.Provider>
  );
}

export function useAuthData(): ContextAuthDataProps {
  const context = useContext(ContextAuthData)!;
  return context;
};