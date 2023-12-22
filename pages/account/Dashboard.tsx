import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI } from "../../context/authContext";
import ProfilePersonalInfoCard from './ProfilePersonalInfoCard';
import Notifications from './Notifications';
import Profile from './Profile';
import Request from './Request';



export default function Dashboard() {
  const { userProfilePersonalInfo } = useAuthData();
  const [currentDate, setCurrentDate] = useState('');

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


  return (
    <div className='w-full h-screen pl-0 lg:pl-24 flex flex-row justify-center items-center'>
      <div className='container w-full h-full pt-14 lg:pt-10 p-5 lg:p-10 flex flex-col justify-center items-center transition-all'>
        {/**wellcome */}
        <div className='w-full flex flex-col'>
          <h1 className="text-color-text-dark-primary text-lg font-semibold">
            Hello, {userProfilePersonalInfo?.full_name ? userProfilePersonalInfo?.full_name : 'User'}
          </h1>
          <h4 className="text-color-text-dark-secondary text-sm">
            Today is {currentDate}
          </h4>
        </div>
        <div className="w-full h-full pt-2 flex">
          {/**section 1: personal information */}
          <div className="w-1/5 h-full pr-2">
            <ProfilePersonalInfoCard />
          </div>
          {/**section 2 & 3: profile & request */}
          <div className='w-2/5 h-full pr-2'>
            <div className="w-full h-[45%]">
              <Profile />
            </div>
            <div className="w-full h-[55%] pt-2 flex flex-row justify-between">
              <div className='w-1/2 h-full pr-1'>
                <Request requestType='Talent' />
              </div>
              <div className='w-1/2 h-full pl-1'>
                <Request requestType='Job' />
              </div>
            </div>
          </div>
          {/**section 4: notifications */}
          <div className="w-2/5 h-full">
            <Notifications />
          </div>
          {/**section 5: sponsors 
          <div className="w-1/5 h-full">
            <div className="w-full h-full p-4 flex flex-col justify-center items-center bg-color-clear border border-color-border-clear shadow-md rounded-lg">
              <h2>SPONSOR</h2>
              <h2>Recommendations</h2>
              <h2>SPONSOR</h2>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
};