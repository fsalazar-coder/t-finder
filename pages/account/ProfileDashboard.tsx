import { useState } from 'react';
import { useAuthUI } from "../../context/authContext";
import SectionTitles from '../components/SectionTitles';
import CircleProgressBar from './CircleProgressBar';
import DashboardEditButton from './DashboardEditButton';
import { IconAlert, IconCheckCircle } from '@/icons/icons';



export default function ProfileDashboard({ percentage, data, userScore }: any) {
  const { setAccountModule } = useAuthUI();
  const [cardHover, setCardHover] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-color-clear border border-color-border-clear shadow-md rounded-lg"
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
    >
      {/**title */}
      <div className='w-full relative px-5 py-1 flex flex-row items-center border-b border-color-border-clear'>
        <SectionTitles
          sectionTitle='Profile'
          sectionType='account'
        />
        <DashboardEditButton
          id='button-profile-edit'
          cardHover={cardHover}
          click={() => setAccountModule('Profile')}
        />
      </div>
      {/**content */}
      <div className='w-full h-full px-5 flex flex-col justify-center'>
        <div className='w-full h-fit flex flex-row items-center'>
          {/**graphycal profile completed */}
          <div className='w-32 h-fit pr-4 flex flex-col justify-between items-center border-r border-color-border-clear transition-all'>
            <div className="w-24 h-28">
              <CircleProgressBar
                percentage={percentage}
                radius={73}
                circleWidth='160'
                strokeWidth='15px'
                color='green-600'
              />
            </div>
            <div className='w-full pt-2 flex flex-row justify-center'>
              <h4 className='w-fit pr-1 text-color-text-tertiary text-sm font-semibold'>
                Completed
              </h4>
            </div>
          </div>
          <div className='flex flex-col justify-between'>
            {/**items profile */}
            <ul className='w-full h-28 pl-4 flex flex-wrap'>
              {
                data?.map((element: any, index: any) => {
                  let checkList = element.length;
                  return (
                    /**fullname, profession or occupation, preferred language, location and personal description */
                    <li key={index} className='w-1/2 h-5 py-1 flex flex-row items-center'>
                      <i className={`${checkList > 0 ? 'text-green-600' : 'text-yellow-400'} w-fit h-fit pr-[6px] pt-[1px] flex items-center text-sm`}>
                        {checkList > 0 ? <IconCheckCircle /> : <IconAlert />}
                      </i>
                      <h4 className='w-fit h-fit text-color-text-secondary text-sm font-semibold'>
                        {element.title}
                      </h4>
                    </li>
                  )
                })
              }
            </ul>
            {/**score user */}
            <div className='w-full pt-2 flex flex-row justify-center'>
              <h4 className='w-fit pr-1 text-color-text-tertiary text-sm font-semibold'>
                Score profile:
              </h4>
              <h4 className='w-fit text-color-text-secondary text-sm font-bold'>
                {userScore}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}