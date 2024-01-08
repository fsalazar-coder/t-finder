import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI } from "../../context/authContext";
import { IconAlert, IconCheckCircle } from '@/icons/icons';
import { userRequestStatusFunction } from '../api/userRequestStatusFunction'; 
import CircleProgressBar from './CircleProgressBar';
import ButtonDashboardAddInfo from './ButtonDashboardAddInfo';



export default function RequestDashboard({ requestType, isDashboard, stepsProcess, shouldRender, selecting, clickAddInfoButton }: any) {
  const { token, userId, talentRequestStatus, setTalentRequestStatus, jobRequestStatus, setJobRequestStatus } = useAuthData();
  const { accountModule, setAccountModule } = useAuthUI();
  const [trackinProgress, setTrackingProgress] = useState(0);

  const requestProgress: any = (statusRequest: string) => {
    switch (statusRequest) {
      case 'submissed':
        return 25;
      case 'selecting':
      case 'alerted':
        return 50;
      case 'contacting':
      case 'acceptance':
        return 75;
      case 'chating':
        return 100;
      default:
        break;
    }
  }

  useEffect(() => {
    if (accountModule === 'Dashboard') {
      userRequestStatusFunction({
        token: token as string,
        userId: userId as string,
        collectionName: requestType === 'talent' ? 'request_talent' : 'request_job',
        action: 'get',
        statusRequest: '',
        onSuccess: (statusRequest: string) => {
          switch (requestType) {
            case 'talent':
              setTrackingProgress(requestProgress(statusRequest));
              break;
            case 'job':
              setTrackingProgress(requestProgress(statusRequest));
              break;
            default:
              break;
          }
        },
        onError: (error: any) => console.error(error)
      });
    }
  }, [accountModule])


  return (
    <div className="w-full h-full flex flex-col">
      {
        /**content */
        shouldRender ?
          <div className='w-full h-full px-5 flex flex-col justify-center'>
            <div className='w-full h-fit flex flex-row items-center'>
              {/**graphycal request process completed */}
              <div className='w-20 h-fit pr-2 flex flex-col justify-between items-center border-r border-color-border-clear transition-all'>
                <div className="w-[4.5rem] h-[4.5rem]">
                  <CircleProgressBar
                    percentage={trackinProgress}
                    radius={73}
                    circleWidth='170'
                    strokeWidth='20px'
                    color='green-600'
                  />
                </div>
              </div>
              {/**steps process request */}
              <ul className='w-full h-fit pl-2 flex flex-wrap justify-start items-start'>
                {
                  stepsProcess?.map((element: any, index: any) => {
                    return (
                      <li key={index} className='pb-2 flex flex-row items-center'>
                        <i className={`${element.render ? 'text-green-300' : 'text-yellow-300'} w-fit h-fit pr-1 text-sm`}>
                          {element.render ? <IconCheckCircle /> : <IconAlert />}
                        </i>
                        <h4 className='w-fit h-fit text-color-text-almost-clear text-sm font-semibold text-start'>
                          {element.step}
                        </h4>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          :
          /**button add information */
          <ButtonDashboardAddInfo
            id={`button-add-request-${requestType}`}
            isDashboard={isDashboard}
            comment='Add request'
            click={() => {
              console.log('Add info')
            }}
          />
      }
    </div>
  )
}