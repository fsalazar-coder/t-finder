import { useState, useEffect } from 'react';
import { useUI } from "@/context/ContextUI";
import { useAuthData } from "@/context/ContextAuthData";
import ProfileCardContent from './ProfileCardContent';
import ProfileCardTitle from './ProfileCardTitle';

interface UserProfileData {
  personalInfo: [];
  experience: [];
  education: [];
  courses: [];
  recommendations: [];
};


export default function Profile() {
  const { screenNarrow, accountModule } = useUI();
  const { userProfileData } = useAuthData();
  const [profileMenuIndex, setProfileMenuIndex] = useState<number>(0);
  const [elementProfileCurrent, setElementProfileCurrent] = useState('experience');
  const elementsProfile = Object.keys(userProfileData);
  const isDashboard = accountModule === 'Dashboard';

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
    { id: 'recommendations', title: 'Recommendations' }
  ];

  const containerClassNames = `${isDashboard ? 'w-full h-full flex-col border-color-border md:hover:border-color-highlighted-clear'
    : screenNarrow ? 'w-full flex-col' : 'w-[52rem] flex-col'
    } flex justify-between bg-white border rounded-lg transition-all`;


  return (
    <div className={`${screenNarrow && 'px-2'} w-full h-full py-10 flex flex-col items-center`}>
      <div className={containerClassNames}>
        <ProfileCardTitle
          isDashboard={isDashboard}
          menuProfileElements={menuProfileElements}
          elementProfile={elementProfileCurrent}
          profileMenuIndex={profileMenuIndex}
          elementProfilePrev={() => goToPreviousElementProfile()} 
          elementProfileNext={() => goToNextElementProfile()} 
        />
        <ProfileCardContent
          shouldRender={!isDashboard}
          data={userProfileData[elementProfileCurrent as keyof UserProfileData]}
          dataBaseCollection={elementProfileCurrent}
        />
      </div>
    </div>
  );
};