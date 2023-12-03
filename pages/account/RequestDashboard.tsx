import { useState } from 'react';
import { useAuthUI } from "../../context/authContext";
import SectionTitles from '../components/SectionTitles';
import CircleProgressBar from './CircleProgressBar';
import DashboardEditButton from './DashboardEditButton';
import { IconAlert, IconCheckCircle } from '@/icons/icons';
import DashboardAddInfo from './DashboardAddInfo';



export default function RequestDashboard({ requestType, data, isDashboard }: any) {
  const { setAccountModule } = useAuthUI();
  const [cardHover, setCardHover] = useState(false);

  const stepsProcess = () => {
    return (
      requestType === 'talent' ?
        ['Submmission', 'Candidates', 'Selection', 'Contact'] : ['Submmission', 'Contact', 'Aceptance']
    )
  };

  return (
    <div className="w-full h-full flex flex-col bg-color-clear border border-color-border-clear shadow-md rounded-lg"
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
    >
      {/**title */}
      <div className='w-full relative px-5 py-1 flex flex-row items-center border-b border-color-border-clear'>
        <SectionTitles
          sectionTitle={`Request ${requestType}`}
          sectionType='account'
        />
        <DashboardEditButton
          id='button-request-edit'
          cardHover={cardHover}
          click={() => setAccountModule(requestType === 'talent' ? 'Talent' : 'Job') }
        />
      </div>
      {
        /**content */
        data.length > 0 ?
          <div className='w-full h-full px-5 flex flex-col justify-center'>
            <div className='w-full h-fit flex flex-row items-center'>
              {/**graphycal request process completed */}
              <div className='w-20 h-fit pr-2 flex flex-col justify-between items-center border-r border-color-border-clear transition-all'>
                <div className="w-[4.5rem] h-[4.5rem]">
                  <CircleProgressBar
                    percentage={25}
                    radius={73}
                    circleWidth='170'
                    strokeWidth='20px'
                    color='green-600'
                  />
                </div>
              </div>
              {/**steps process request */}
              <ul className='w-full h-28 pl-2 flex flex-wrap'>
                {
                  stepsProcess()?.map((element: any, index: any) => {
                    return (
                      <li key={index}
                        className='pb-2 flex flex-row items-center'
                      >
                        <i className={`${index === 0 ? 'text-green-300' : 'text-yellow-300'} w-fit h-fit pr-1 text-sm`}>
                          {index === 0 ? <IconCheckCircle /> : <IconAlert />}
                        </i>
                        <h4 className='w-fit h-fit text-color-text-secondary text-sm font-semibold text-start'>
                          {element}
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
          <DashboardAddInfo
            id={requestType === 'talent' ? 'post-request-talent' : 'post-request-job'}
            isDashboard={isDashboard}
            comment='Add request'
            click={() => setAccountModule(requestType === 'talent' ? 'Talent' : 'Job') }
          />
      }
    </div>
  )
}