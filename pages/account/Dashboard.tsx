import { useState, useEffect } from 'react';
import { useAuthData, useUI } from "../../context/authContext";
import Notifications from './Notifications';
import Profile from './Profile';
import Request from './Request';
import PersonalInfo from './PersonalInfo';



export default function Dashboard() {
  const { screenNarrow } = useUI();
  const { userProfileData } = useAuthData();
  const [currentDate, setCurrentDate] = useState('');

  //get today date
  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const now = new Date();
    const dayOfWeek = days[now.getDay()];
    const dayOfMonth = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    setCurrentDate(`${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`);
  }, []);

  const userFullName: string = userProfileData?.personalInfo[0]?.full_name || 'User';


  return (
    <div className='w-full min-h-screen pl-0 lg:pl-24 flex flex-row justify-center'>
      <div className={`w-full h-full pt-16 lg:pt-5 p-5 lg:p-10 flex flex-col transition-all`}>
        {/**wellcome */}
        <div className='w-full flex flex-col'>
          <h1 className="text-color-dark text-lg font-semibold">
            Hello, {userFullName}
          </h1>
          <h4 className="text-color-text-medium text-sm">
            Today is {currentDate}
          </h4>
        </div>
        <div className={`flex-col lg:flex-row lg:h-[490px] w-full pt-2 flex`}>
          {/**section 1: personal information */}
          <div className={`w-full h-auto pb-2 lg:w-1/5 lg:h-full lg:pr-4 flex flex-col`}>
            <PersonalInfo />
          </div>
          {/**section 2: profile */}
          <div className={`w-full h-auto pb-2 lg:w-1/5 lg:h-full lg:pr-4 flex`}>
            <Profile />
          </div>
          {/**section 3: request */}
          <div className={`w-full h-auto pb-2 lg:w-2/5 lg:h-full lg:pr-4 flex flex-col`}>
            <div className={`lg:h-1/2 w-full pb-2`}>
              <Request requestType='Talent' />
            </div>
            <div className={`lg:h-1/2 lg:pt-2 w-full`}>
              <Request requestType='Job' />
            </div>
          </div>
          {/**section 4: notifications */}
          <div className={`w-full h-auto pb-2 lg:w-1/5 lg:h-full flex`}>
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  )
};