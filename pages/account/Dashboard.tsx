import { useState, useEffect } from 'react';
import { useAuthData } from "@/context/ContextAuthData";
import { useUI } from '@/context/ContextUI';
import PersonalInfo from './PersonalInfo';
import ProfileDashboard from './ProfileDashboard';
import Request from './Request';



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
    <div className='w-full h-full flex flex-row justify-center lg:items-center'>
      <div className={`w-full px-5 lg:px-20 flex flex-col lg:items-center transition-all`}>
        {/**wellcome */}
        <div className='w-full flex flex-col'>
          <h1 className="text-color-dark text-lg font-semibold">
            Hello, {userFullName}
          </h1>
          <h4 className="text-color-text-medium text-sm">
            Today is {currentDate}
          </h4>
        </div>
        <div className={`w-full pt-2 flex flex-col lg:flex-row`}>
          <div className='w-full lg:w-2/5 md:pr-1 lg:pr-3 flex flex-col'>
            {/**section 1: personal information */}
            <div className={`w-full pb-3 flex`}>
              <PersonalInfo />
            </div>
            {/**section 2: profile */}
            <div className='w-full py-3 flex-col justify-center'>
              <ProfileDashboard type='overview' />
            </div>
            <div className='w-full py-3 flex-col justify-center'>
              <ProfileDashboard type='overall' />
            </div>
          </div>
          {/**section 3: request */}
          <div className={`w-full lg:w-3/5 h-full lg:min-h-screen flex`}>
            <div className={`w-full h-full md:pl-1 lg:pl-3`}>
              <Request requestType='Dashboard' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};