import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import ProfileDashboard from './ProfileDashboard';
import CardsTitlesProfile from './CardsTitleProfile';
import CardsDisplayerProfile from './CardsDisplayerProfile';



export default function Profile() {

  const { token, userId, userScore, setUserScore, collectionToChange, setCollectionToChange, update, setUpdate } = useAuthData();
  const { accountModule, setProfileModal, setProfileModalType, setProfileModalAction } = useAuthUI();
  const { screenNarrow } = useUI();
  const [cardHover, setCardHover] = useState<boolean>(false);
  const [profileMenu, setProfileMenu] = useState<string>('experience');
  const [profileMenuIndex, setProfileMenuIndex] = useState<number>(0);
  const [profileData, setProfileData] = useState({
    experience: [],
    education: [],
    courses: [],
    publications: [],
    conferences: [],
    certifications: [],
    recommendations: [],
  });
  const profile: any = [
    {
      id: 'experience',
      title: 'Experience',
      data: profileData.experience,
      profileMenuCondition: profileMenu === 'experience',
      shouldRender: profileData.experience.length > 0,
      length: profileData.experience.length,
    },
    {
      id: 'education',
      title: 'Education',
      data: profileData.education,
      profileMenuCondition: profileMenu === 'education',
      shouldRender: profileData.education.length > 0,
      length: profileData.education.length
    },
    {
      id: 'courses',
      title: 'Courses',
      data: profileData.courses,
      profileMenuCondition: profileMenu === 'courses',
      shouldRender: profileData.courses.length > 0,
      length: profileData.courses.length
    },
    {
      id: 'publications',
      title: 'Publications',
      data: profileData.publications,
      profileMenuCondition: profileMenu === 'publications',
      shouldRender: profileData.publications.length > 0,
      length: profileData.publications.length
    },
    {
      id: 'conferences',
      title: 'Conferences',
      data: profileData.conferences,
      profileMenuCondition: profileMenu === 'conferences',
      shouldRender: profileData.conferences.length > 0,
      length: profileData.conferences.length
    },
    {
      id: 'certifications',
      title: 'Certifications',
      data: profileData.certifications,
      profileMenuCondition: profileMenu === 'certifications',
      shouldRender: profileData.certifications.length > 0,
      length: profileData.certifications.length
    },
    {
      id: 'recommendations',
      title: 'Recommend...',
      data: profileData.recommendations,
      profileMenuCondition: profileMenu === 'recommendations',
      shouldRender: profileData.recommendations.length > 0,
      length: profileData.recommendations.length
    }
  ];
  const elementsProfile: number = profile.length;
  const elementsCompleted = profile.filter((element: any) => element.shouldRender).length;
  const percentageProfileFilled: number = Math.round((elementsCompleted / elementsProfile) * 100);

  // Cargar los datos para todos los elementos
  useEffect(() => {
    if (update === collectionToChange || accountModule === 'Profile') {
      profile.forEach((element: any) => {
        let collectionName = element.id;
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get',
          collectionName: collectionName,
          data: '',
          onSuccess: (responseData: any) => {
            let elementName: string = collectionName;
            let data: any = responseData;
            setProfileData((prevData) => ({
              ...prevData,
              [elementName]: data
            }));
          },
          onError: (error: any) => console.error(error)
        });
        if (update) {
          setUpdate('');
          setCollectionToChange('');
        }
      });
    }
  }, [token, userId, update, accountModule, collectionToChange]);

  useEffect(() => {
    let score: number = 0;
    const experiencePoints: any = {
      'Junior': 5,
      'Mid': 10,
      'Senior': 15
    };
    const experienceYearsPoints: any = {
      '0-2': 10,
      '2-5': 20,
      '5-10': 30,
      '+10': 40
    };
    const educationDegreePoints: any = {
      'High school': 10,
      'Bachelor': 20,
      'Master': 30,
      'Doctorate': 40
    };
    const calculateScore = (elementLength: any, pointsPerItem: any, maxPoints: any) => {
      return Math.min(elementLength * pointsPerItem, maxPoints);
    };
    profile.forEach((element: any) => {
      let elementData = element.data;
      let elementLength: number = element.length;
      let elementEmpty: boolean = elementLength === 0;
      switch (element.id) {
        case 'experience':
          if (!elementEmpty) {
            elementData.map((experience: any) => {
              score += experiencePoints[experience['experience_level']] || 0;
              score += experienceYearsPoints[experience['experience_years']] || 0;
            })
          }
          break;
        case 'education':
          if (!elementEmpty) {
            elementData.map((education: any) => {
              score += educationDegreePoints[education['degree']] || 0;
            })
          }
          break;
        case 'courses':
          score += calculateScore(elementLength, 5, 30);
          break;
        case 'publications':
        case 'conferences':
          score += calculateScore(elementLength, 4, 20);
          break;
        case 'certifications':
          score += calculateScore(elementLength, 6, 30);
          break;
        case 'recommendations':
          score += calculateScore(elementLength, 3, 15);
          break;
        default:
          break;
      }
    });
    setUserScore(score);
    userScoreUpdate(score);
  }, [profile]);



  const userScoreUpdate = async (score: any) => {
    userDataHandlerFunction({
      token: token as string,
      userId: userId as string,
      action: 'edit',
      collectionName: 'profile_score',
      data: { profile_score: score },
      onSuccess: (responseData: any) => { },     // ????????????
      onError: (error: any) => console.error(error)
    });
  };



  const profileElementsId: string = profile[profileMenuIndex].id;
  const profileElementsData: any = profile[profileMenuIndex].data;
  const isDashboard = accountModule === 'Dashboard';
  const containerClassNames = `${isDashboard ? 'w-full h-full flex-col bg-white border border-color-border shadow-md rounded-lg'
    : screenNarrow ? 'w-full flex-col px-1 py-12' : 'w-[52rem] px-2 lg:px-8 lg:py-9 flex-col'
    } flex justify-between transition-all`;


  return (
    <div className={`${!isDashboard && 'pl-0 lg:pl-60'} w-full h-full flex flex-col items-center`}>
      <div className={containerClassNames}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        <CardsTitlesProfile
          screenNarrow={screenNarrow}
          isDashboard={isDashboard}
          data={profile}
          profileId={profileElementsId}
          cardHover={cardHover}
          profileMenuIndex={profileMenuIndex}
          profileMenuIndexRetro={() => setProfileMenuIndex(profileMenuIndex > 0 ? profileMenuIndex - 1 : 0)}
          profileMenuIndexNext={() => setProfileMenuIndex(profileMenuIndex + 1)}
          openModalFormClick={() => {
            setProfileModal(true);
            setProfileModalAction('post');
            setProfileModalType(profileElementsId);
            setCollectionToChange(profileElementsId);
          }}
        />
        {
          isDashboard ?
            <ProfileDashboard
              percentage={percentageProfileFilled}
              data={profile}
              userScore={userScore}
            />
            :
            <CardsDisplayerProfile
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