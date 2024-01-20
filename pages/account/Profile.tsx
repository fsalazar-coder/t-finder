import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import { userProfileScoreFunction } from '../api/userProfileScoreFunction';
import ProfileDashboard from './ProfileDashboard';
import ProfileCardsDisplayer from './ProfileCardsDisplayer';
import ProfileCardsTitle from './ProfileCardsTitle';



export default function Profile() {

  const { screenNarrow } = useUI();
  const { accountModule, setProfileModal, setProfileModalAction } = useAuthUI();
  const { token, userId, userProfileData, setUserProfileData, collectionToChange, setCollectionToChange, update, setUpdate, updateCounter, setUpdateCounter } = useAuthData();
  const [userProfileScore, setUserProfileScore] = useState<string>('');
  const [userProfileScoreUpdate, setUserProfileScoreUpdate] = useState<boolean>(false);
  const [cardHover, setCardHover] = useState<boolean>(false);
  const [profileMenu, setProfileMenu] = useState<string>('experience');
  const [profileMenuIndex, setProfileMenuIndex] = useState<number>(0);

  const userData: any = [
    {
      id: 'personal_info',
      title: 'Personal info...',
      data: userProfileData.personalInfo,
      profileMenuCondition: false,
      shouldRender: userProfileData.personalInfo.length > 0,
      length: userProfileData.personalInfo.length,
    },
    {
      id: 'experience',
      title: 'Experience',
      data: userProfileData.experience,
      profileMenuCondition: profileMenu === 'experience',
      shouldRender: userProfileData.experience.length > 0,
      length: userProfileData.experience.length,
    },
    {
      id: 'education',
      title: 'Education',
      data: userProfileData.education,
      profileMenuCondition: profileMenu === 'education',
      shouldRender: userProfileData.education.length > 0,
      length: userProfileData.education.length
    },
    {
      id: 'courses',
      title: 'Courses',
      data: userProfileData.courses,
      profileMenuCondition: profileMenu === 'courses',
      shouldRender: userProfileData.courses.length > 0,
      length: userProfileData.courses.length
    },
    {
      id: 'publications',
      title: 'Publications',
      data: userProfileData.publications,
      profileMenuCondition: profileMenu === 'publications',
      shouldRender: userProfileData.publications.length > 0,
      length: userProfileData.publications.length
    },
    {
      id: 'conferences',
      title: 'Conferences',
      data: userProfileData.conferences,
      profileMenuCondition: profileMenu === 'conferences',
      shouldRender: userProfileData.conferences.length > 0,
      length: userProfileData.conferences.length
    },
    {
      id: 'certifications',
      title: 'Certifications',
      data: userProfileData.certifications,
      profileMenuCondition: profileMenu === 'certifications',
      shouldRender: userProfileData.certifications.length > 0,
      length: userProfileData.certifications.length
    },
    {
      id: 'recommendations',
      title: 'Recommend...',
      data: userProfileData.recommendations,
      profileMenuCondition: profileMenu === 'recommendations',
      shouldRender: userProfileData.recommendations.length > 0,
      length: userProfileData.recommendations.length
    }
  ];

  const profile: any = userData.slice(1);
  const elementsProfileAmount: number = profile.length - 1;
  const elementsCompleted = profile.filter((element: any) => element.shouldRender).length;
  const percentageProfileFilled: number = Math.round((elementsCompleted / elementsProfileAmount) * 100);

  useEffect(() => {
    if (userProfileScoreUpdate || accountModule === 'Dashboard') {
      userDataHandlerFunction({
        token: token as string,
        userId: userId as string,
        action: 'get',
        collectionName: 'profile_score',
        data: '',
        onSuccess: (responseData: any) => {
          setUserProfileScore(responseData.profile_score);
        },
        onError: (error: any) => console.error(error)
      });
      setUserProfileScoreUpdate(false);
    }
  }, [userProfileScoreUpdate, accountModule])

  // Cargar los datos para todos los elementos
  useEffect(() => {
    if (token && userId && (update === 'all' || update === collectionToChange)) {     // || accountModule === 'Profile' || accountModule === 'Dashboard'
      setUpdateCounter((counter) => counter + 1);
      const fetchProfile = async () => {
        userData.forEach((element: any) => {
          let collectionName = element.id;
          userDataHandlerFunction({
            token: token as string,
            userId: userId as string,
            action: 'get',
            collectionName: collectionName,
            data: '',
            onSuccess: (responseData: any) => {
              let elementName: string = collectionName === 'personal_info' ? 'personalInfo' : collectionName;
              let data: any = responseData;
              setUserProfileData((prevData) => ({
                ...prevData,
                [elementName]: data
              }));
            },
            onError: (error: any) => console.error(error)
          });
        });
      };
      fetchProfile().then(() => {
        setUpdateCounter((counter) => counter - 1);  
        setCollectionToChange('');
        if ((update === 'all' && updateCounter === 0) || update === collectionToChange) {
          setUpdate('');
        }
      });
    }
  }, [token, userId, update]);

  //profile score
  useEffect(() => {
    if (accountModule === 'Profile' && profile) {
      let score: any = userProfileScoreFunction(profile, 'score');
      userDataHandlerFunction({
        token: token as string,
        userId: userId as string,
        action: 'edit',
        collectionName: 'profile_score',
        data: { profile_score: score.toString() },
        onSuccess: () => { },
        onError: (error: any) => console.error(error)
      });
      setUserProfileScoreUpdate(true);
    }
  }, [profile]);

  const profileElementsId: string = profile[profileMenuIndex].id;
  const profileElementsData: any = profile[profileMenuIndex].data;
  const isDashboard = accountModule === 'Dashboard';
  const containerClassNames = `${isDashboard ? 'w-full h-full flex-col bg-white border border-color-border shadow-md rounded-lg'
    : screenNarrow ? 'w-full flex-col px-5 py-16' : 'w-[52rem] px-2 lg:px-8 lg:py-9 flex-col'
    } flex justify-between transition-all`;


  return (
    <div className={`${!isDashboard && 'pl-0 lg:pl-60'} w-full h-full flex flex-col items-center`}>
      <div className={containerClassNames}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        <ProfileCardsTitle
          screenNarrow={screenNarrow}
          isDashboard={isDashboard}
          data={profile}
          profileId={profileElementsId}
          cardHover={cardHover}
          profileMenuIndex={profileMenuIndex}
          profileMenuIndexRetro={() => setProfileMenuIndex(profileMenuIndex > 0 ? profileMenuIndex - 1 : 0)}
          profileMenuIndexNext={() => setProfileMenuIndex(profileMenuIndex + 1)}
          openModalFormClick={() => {
            setProfileModal(profileElementsId);
            setProfileModalAction('post');
            setCollectionToChange(profileElementsId);
          }}
        />
        {
          isDashboard ?
            <ProfileDashboard
              data={profile}
              percentage={percentageProfileFilled}
            />
            :
            <ProfileCardsDisplayer
              id={profileElementsId}
              key={profileElementsId}
              data={profileElementsData}
              collectionName={profileElementsId}
            />
        }
      </div>
    </div>
  );
};