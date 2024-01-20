import { useState, useEffect, useRef } from 'react';
import { useAuthData, useAuthUI } from "../../context/authContext";
//import CircleProgressBar from './CircleProgressBar';
import ButtonDashboardAddInfo from './ButtonDashboardAddInfo';
import { IconBxChevronLeft, IconBxChevronRight } from '@/icons/icons';

interface RequestDashboardParams {
  requestType: string,
  statusRequestToRender: any,
  statusRequestLast: number,
  shouldRenderRequest: boolean,
  goClick: (e: any) => void,
}



export default function RequestDashboard({ requestType, statusRequestToRender, statusRequestLast, shouldRenderRequest, goClick }: RequestDashboardParams) {
  const { setCollectionToChange } = useAuthData();
  const { setRequestModal, setRequestModalAction } = useAuthUI();

  const [statusRequestIndex, setStatusRequestIndex] = useState(0);

  const statusRequestUl = useRef(null);
  const statusRequestUlSelected: any = statusRequestUl.current;
  const clickRetroDisabled: boolean = statusRequestIndex === 0;
  const clickNextDisabled: boolean = statusRequestIndex === statusRequestLast;

  useEffect(() => {
    let movingPositionX: number = (300 * statusRequestIndex);
    if (statusRequestUlSelected) {
      statusRequestUlSelected.style.transition = 'all 0.5s ease-in';
      statusRequestUlSelected.style.transform = `translateX(-${movingPositionX}px)`;
    };
  }, [statusRequestIndex]);

  const requestProgress: any = {
    'Submitted': 25,
    'Selecting': 50,
    'Contacting': 75,
    'Accepted': 75,
    'Completed': 100,
  };

  const requestProcessSteps: any = {
    'Talent': ['Submitted', 'Selecting', 'Contacting', 'Completed'],
    'Job': ['Submitted', 'Selecting', 'Accepted', 'Completed']
  };


  return (
    <div className="w-full h-full flex flex-col">
      {
        /**content */
        shouldRenderRequest ?
          <div className='w-full h-full px-5 pb-3 flex flex-row justify-between items-center'>
            <button className="w-fit h-full pr-2 flex flex-col justify-center" disabled={clickRetroDisabled}>
              <i className={`${clickRetroDisabled ? 'opacity-20' : 'opacity-100 hover:text-color-highlighted cursor-pointer'
                } w-6 h-fit flex flex-row justify-center text-color-text-medium text-xl text-center transition-all`
              }
                onClick={() => setStatusRequestIndex(statusRequestIndex - 1)}
              >
                <IconBxChevronLeft />
              </i>
            </button>
            <div className="w-[300px] h-full flex flex-col justify-center overflow-x-hidden">
              <ul className='w-[9000px] h-full flex flex-row items-center transform' ref={statusRequestUl}>
                {
                  statusRequestToRender?.map(({ requestId, creationDate, category, status }: any, index: any) => {
                    return (
                      <li
                        key={index}
                        className='w-[300px] px-2 flex flex-col lg:hover:cursor-pointer'
                        onClick={() => goClick(requestId)}
                      >
                        {/**request description */}
                        <ul className='w-full flex flex-col'>
                          <li className={`w-full pb-2 flex flex-col`}>
                            <h4 className='w-full text-color-text-dark text-sm'>
                              {`${category}`}
                            </h4>
                            <h5 className='w-full text-color-text-almost-clear text-xs'>
                              Category
                            </h5>
                          </li>
                          <li className={`w-full pb-2 flex flex-col`}>
                            <h4 className='w-full text-color-text-dark text-sm'>
                              {`${creationDate}`}
                            </h4>
                            <h5 className='w-full text-color-text-almost-clear text-xs'>
                              Creation date
                            </h5>
                          </li>
                          <li className={`w-full flex flex-col`}>
                            <h4 className='w-full text-color-text-dark text-sm'>
                              Status:
                            </h4>
                            {/**graphycal request steps process completed */}
                            <div className='w-full relative py-1 flex flex-col justify-center transition-all'>
                              <div className='w-full h-auto relative flex flex-row items-center border-[1px] border-color-border rounded-lg overflow-hidden z-0'>
                                {
                                  requestProcessSteps[requestType]?.map((step: string) => (
                                    <h5 className={`${status === step ? 'text-white text-semibold' : 'text-color-text-almost-clear'} w-1/4 h-fit text-[10px] text-center`}>
                                      {step}
                                    </h5>
                                  ))
                                }
                                <div style={{ width: `${requestProgress[status]}%` }} className={`h-full absolute left-0 bottom-0 bg-color-highlighted-clear -z-10`} />
                                <div className={`w-full h-full absolute left-0 bottom-0 bg-color-clear -z-20`} />
                              </div>
                              <div style={{ left: `${requestProgress[status]}%` }} className={`h-full absolute border-r border-color-border z-10`} />
                            </div>
                          </li>
                        </ul>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <button className="w-fit h-full pl-2 flex flex-col justify-center" disabled={clickNextDisabled}>
              <i className={`${clickNextDisabled ? 'opacity-20' : 'opacity-100 hover:text-color-highlighted cursor-pointer'
                } w-6 h-fit flex flex-row justify-center text-color-text-medium text-xl`
              }
                onClick={() => setStatusRequestIndex(statusRequestIndex + 1)}
              >
                <IconBxChevronRight />
              </i>
            </button>
          </div>
          :
          /**button add information */
          <ButtonDashboardAddInfo
            id={`button-add-request-${requestType}`}
            comment='Add request'
            click={() => {
              setRequestModal(requestType);
              setRequestModalAction('post');
              setCollectionToChange(requestType === 'Talent' ? 'request_talent' : 'request_job');
            }}
          />
      }
    </div>
  )
}




//<div className="w-[4.5rem] h-[4.5rem]">
//<CircleProgressBar
//percentage={requestProgress(status) as number}
//radius={73}
//circleWidth='170'
//strokeWidth='20px'
//color='green-600'
///>
//</div>