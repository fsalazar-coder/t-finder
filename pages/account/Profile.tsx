import { useState } from 'react';
import { useUI } from "@/context/ContextUI";
import { useAuthData } from "@/context/ContextAuthData";
import ProfileDashboard from './ProfileDashboard';
import ProfileCardsDisplayer from './ProfileCardsDisplayer';
import ProfileCardsTitle from './ProfileCardsTitle';

interface UserProfileData {
  personalInfo: [];
  experience: [];
  education: [];
  courses: [];
  projects: [];
  publications: [];
  conferences: [];
  certifications: [];
  recommendations: [];
};


export default function Profile() {
  const { screenNarrow, accountModule } = useUI();
  const { userProfileData } = useAuthData();
  const [profileMenuIndex, setProfileMenuIndex] = useState<number>(0);
  const [elementProfileCurrent, setElementProfileCurrent] = useState('experience');

  const elementsProfile = Object.keys(userProfileData);

  const goToNextElementProfile = () => {
    const currentIndex = elementsProfile.indexOf(elementProfileCurrent);
    const nextIndex = (currentIndex + 1) % elementsProfile.length;
    setElementProfileCurrent(elementsProfile[nextIndex]);
    setProfileMenuIndex(profileMenuIndex + 1)
  };

  const goToPreviousElementProfile = () => {
    const currentIndex = elementsProfile.indexOf(elementProfileCurrent);
    const prevIndex = (currentIndex - 1 + elementsProfile.length) % elementsProfile.length;
    setElementProfileCurrent(elementsProfile[prevIndex]);
    setProfileMenuIndex(profileMenuIndex > 0 ? profileMenuIndex - 1 : 0)
  };

  const menuProfileElements: any = [
    { id: 'experience', title: 'Experience' },
    { id: 'education', title: 'Education' },
    { id: 'courses', title: 'Courses' },
    { id: 'projects', title: 'Projects' },
    { id: 'publications', title: 'Publications' },
    { id: 'conferences', title: 'Conferences' },
    { id: 'certifications', title: 'Certifications' },
    { id: 'recommendations', title: 'Recommendations' }
  ];

  const isDashboard = accountModule === 'Dashboard';

  const containerClassNames = `${isDashboard ? 'w-full h-full flex-col bg-white border border-color-border shadow-md rounded-lg'
    : screenNarrow ? 'w-full flex-col px-5 py-16' : 'w-[52rem] px-2 lg:px-8 lg:py-9 flex-col'
    } flex justify-between transition-all`;


  return (
    <div className={`w-full h-full flex flex-col items-center`}>
      <div className={containerClassNames}
      >
        <ProfileCardsTitle
          isDashboard={isDashboard}
          menuProfileElements={menuProfileElements}
          elementProfile={elementProfileCurrent}
          profileMenuIndex={profileMenuIndex}
          elementProfilePrev={() => goToPreviousElementProfile()}     /// setProfileMenuIndex(profileMenuIndex > 0 ? profileMenuIndex - 1 : 0)
          elementProfileNext={() => goToNextElementProfile()}         /// setProfileMenuIndex(profileMenuIndex + 1)
        />
        <ProfileDashboard shouldRender={isDashboard} />
        <ProfileCardsDisplayer
          shouldRender={!isDashboard}
          data={userProfileData[elementProfileCurrent as keyof UserProfileData]}
          dataBaseCollection={elementProfileCurrent}
        />
      </div>
    </div>
  );
};