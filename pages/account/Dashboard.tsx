import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import Notifications from './Notifications';
import Profile from './Profile';
import Request from './Request';
import PersonalInfo from './PersonalInfo';



export default function Dashboard() {
  const { token, userId, setCollectionToChange, update, setUpdate } = useAuthData();
  const { accountModule } = useAuthUI();
  const [fullNameUser, setFullNameUser] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const fetchData = async () => {
    userDataHandlerFunction({
      token: token as string,
      userId: userId as string,
      action: 'get',
      collectionName: 'personal_info',
      data: '',
      onSuccess: (responseData: any) => {
        setFullNameUser(responseData.full_name);
      },
      onError: (error: any) => console.error(error)
    });
  };

  useEffect(() => {
    if (accountModule === 'Dashboard' || update === 'personal_info') {
      fetchData();
      if (update === 'personal_info') {
        setUpdate('');
        setCollectionToChange('');
      }
    }
  }, [token, userId, update, accountModule]);
  
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


  return (
    <div className='w-full h-screen pl-0 lg:pl-24 flex flex-row justify-center items-center'>
      <div className='container w-full h-full pt-14 lg:pt-10 p-5 lg:p-10 flex flex-col justify-center items-center transition-all'>
        {/**wellcome */}
        <div className='w-full flex flex-col'>
          <h1 className="text-color-dark text-lg font-semibold">
            Hello, {fullNameUser? fullNameUser : 'User'}
          </h1>
          <h4 className="text-color-text-medium text-sm">
            Today is {currentDate}
          </h4>
        </div>
        <div className="w-full h-full pt-2 flex">
          {/**section 1: personal information */}
          <div className="w-1/5 h-full pr-4">
            <PersonalInfo />
          </div>
          {/**section 2: profile */}
          <div className='w-1/5 h-full pr-4'>
            <Profile />
          </div>
          {/**section 3: request */}
          <div className='w-2/5 h-full pr-4'>
            <div className='w-full h-1/2 pb-2'>
              <Request requestType='Talent' />
            </div>
            <div className='w-full h-1/2 pt-2'>
              <Request requestType='Job' />
            </div>
          </div>
          {/**section 4: notifications */}
          <div className="w-1/5 h-full">
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  )
};