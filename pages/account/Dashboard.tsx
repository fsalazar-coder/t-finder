import { useState, useEffect } from 'react';
import { useAuthData } from "@/context/ContextAuthData";
import Notifications from './Notifications';
import Profile from './Profile';
import Request from './Request';
import PersonalInfo from './PersonalInfo';



export default function Dashboard() {
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
    <div className='w-full min-h-screen flex flex-row justify-center'>
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
        <div className={`w-full pt-2 flex flex-col lg:flex-row lg:h-[490px] `}>
          <div className='w-full lg:w-2/5 flex flex-col md:flex-row'>
            {/**section 1: personal information */}
            <div className={`w-full md:w-1/2 h-auto lg:h-full pb-2 md:pr-1 lg:pr-2 flex`}>
              <PersonalInfo />
            </div>
            {/**section 2: profile */}
            <div className={`w-full md:w-1/2 h-auto lg:h-full pb-2 md:pl-1 lg:px-2 flex`}>
              <Profile />
            </div>
          </div>
          <div className='w-full lg:w-3/5 flex flex-col md:flex-row'>
            {/**section 3: request */}
            <div className={`w-full h-auto lg:h-full pb-2 md:w-2/3 md:pr-1 lg:px-2 flex flex-col`}>
              <div className={`lg:h-1/2 w-full pb-2`}>
                <Request requestType='Talent' />
              </div>
              <div className={`lg:h-1/2 lg:pt-2 w-full`}>
                <Request requestType='Job' />
              </div>
            </div>
            {/**section 4: notifications */}
            <div className={`w-full h-auto pb-2 md:w-1/3 md:pl-1 lg:h-full flex`}>
              <Notifications />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};