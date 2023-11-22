import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI } from "../../context/authContext";
import SectionTitles from '../components/SectionTitles';
import { IconBxsBellRing, IconCheckCircle } from '@/icons/icons';
import ProfilePersonalInfoCard from './ProfilePersonalInfoCard'
import Profile from './Profile';



export default function Dashboard(props: any) {
  const { userProfilePersonalInfo } = useAuthData();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const now = new Date();
    const dayOfWeek = days[now.getDay()];
    const dayOfMonth = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    setCurrentDate(`${dayOfWeek}, ${dayOfMonth} ${month} ${year}`);
  }, []);


  return (
    <div className='w-full h-screen pl-0 lg:pl-24 flex flex-row justify-center items-center'>
      <div className='container w-full h-full pt-14 lg:pt-10 p-5 lg:p-10 flex flex-col justify-center items-center transition-all'>
        {/**wellcome */}
        <div className='w-full flex flex-col'>
          <h1 className="text-slate-600 text-lg font-semibold">
            Hello, {userProfilePersonalInfo?.full_name ? userProfilePersonalInfo?.full_name : 'User'}
          </h1>
          <h4 className="text-slate-300 text-sm">
            Today is {currentDate}
          </h4>
        </div>
        <div className="w-full h-full pt-2 flex">
          {/**section 1: personal information */}
          <div className="w-1/5 h-full mr-2 flex flex-col bg-white border border-slate-200 rounded-lg">
            <ProfilePersonalInfoCard />
          </div>
          <div className='w-2/5 h-full mr-2 flex flex-col'>
            {/**section 2: profile */}
            <div className="w-full h-[45%] flex flex-col bg-white border border-slate-200 rounded-lg">
              <Profile />
            </div>
            {/**section 3: request */}
            <div className="w-full h-[55%] pt-2 flex flex-row justify-between">
              {/**Talent request */}
              <div className='w-1/2 h-full pr-2'>
                <div className='h-full flex flex-col bg-white border border-slate-200 rounded-lg'>
                  {/**title */}
                  <div className='w-full px-5 py-1 lg:py-2 flex flex-row items-center border-b border-slate-200'>
                    <SectionTitles
                      sectionTitle='Request talent'
                      sectionType='account'
                    />
                  </div>
                  {/**items */}
                  <div className='w-full px-5 py-1 lg:py-2 flex flex-col list-none transition-all'>
                    <ul className='w-full flex flex-col'>
                      <li className='w-full pb-1 flex flex-row items-start'>
                        <i className='text-green-300 text-sm pt-1 pr-2'>
                          <IconCheckCircle />
                        </i>
                        <div className='w-full flex flex-col'>
                          <h4 className='w-full text-slate-400 text-sm'>
                            request talent
                          </h4>
                          <h5 className='w-full text-slate-200 text-xs'>
                            complete
                          </h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/**job request */}
              <div className='w-1/2 h-full'>
                <div className='h-full flex flex-col bg-white border border-slate-200 rounded-lg'>
                  {/**title */}
                  <div className='w-full px-5 py-1 lg:py-2 flex flex-row items-center border-b border-slate-200'>
                    <SectionTitles
                      sectionTitle='Request job'
                      sectionType='account'
                    />
                  </div>
                  {/**items */}
                  <div className='w-full px-5 py-1 flex flex-col list-none transition-all'>
                    <ul className='w-full flex flex-col'>
                      <li className='w-full pb-1 flex flex-row items-start'>
                        <i className='text-green-300 text-sm pt-1 pr-2'>
                          <IconCheckCircle />
                        </i>
                        <div className='w-full flex flex-col'>
                          <h4 className='w-full text-slate-400 text-sm'>
                            request job
                          </h4>
                          <h5 className='w-full text-slate-200 text-xs'>
                            you dont have any request job..
                          </h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**section 4: notifications */}
          <div className="w-1/5 h-full mr-2 flex flex-col bg-white border border-slate-200 rounded-lg">
            {/**title */}
            <div className='w-full px-5 py-1 lg:py-2 flex flex-row items-center border-b border-slate-200'>
              <SectionTitles
                sectionTitle='Notifications'
                sectionType='account'
              />
            </div>
            {/**items */}
            <div className='w-full px-5 py-1 flex flex-col list-none transition-all'>
              <ul className='w-full flex flex-col'>
                <li className='w-full pb-1 flex flex-row items-start'>
                  <i className='text-green-300 text-sm pt-1 pr-2'>
                    <IconCheckCircle />
                  </i>
                  <div className='w-full flex flex-col'>
                    <h4 className='w-full text-slate-400 text-sm'>
                      request talent
                    </h4>
                    <h5 className='w-full text-slate-200 text-xs'>
                      complete
                    </h5>
                  </div>
                </li>
              </ul>
            </div>

          </div>
          {/**section 5: sponsors */}
          <div className="w-1/5 h-full flex flex-col transition-all">
            <div className="w-full h-full p-4 flex flex-col justify-center items-center bg-white border border-slate-200 rounded-lg">
              <h2>SPONSOR</h2>
              <h2>Recommendations</h2>
              <h2>SPONSOR</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};