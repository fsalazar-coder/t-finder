import { useState, useEffect, useRef, useMemo } from 'react';
//import CircleProgressBar from './CircleProgressBar';
import { IconBxChevronLeft, IconBxChevronRight } from '@/icons/icons';
import ButtonPostUpdateDelete from './ButtonPostUpdateDelete';

interface RequestDashboardParams {
  requestType: string,
  statusRequestToRender: any,
  statusRequestLast: number,
  goClick: (e: any) => void,
  shouldRenderRequest: boolean,
  shouldRenderComponent: boolean,
}



export default function RequestDashboard({ requestType, statusRequestToRender, statusRequestLast, goClick, shouldRenderRequest, shouldRenderComponent }: RequestDashboardParams) {

  const [statusRequestIndex, setStatusRequestIndex] = useState(0);
  const statusRequestUl = useRef(null);

  const statusRequestUlSelected: any = statusRequestUl.current;
  const clickRetroDisabled: boolean = statusRequestIndex === 0;
  const clickNextDisabled: boolean = statusRequestIndex === statusRequestLast;

  const requestProgress: any = useMemo(() => ({
    'Submitted': 25,
    'Selecting': 50,
    'Contacting': 75,
    'Accepted': 75,
    'Completed': 100,
  }), []);

  const requestProcessSteps: any = useMemo(() => ({
    'Talent': ['Submitted', 'Selecting', 'Contacting', 'Connected'],
    'Job': ['Submitted', 'Selecting', 'Accepted', 'Connected']
  }), []);

  useEffect(() => {
    if (statusRequestUlSelected) {
      statusRequestUlSelected.style.transition = 'all 0.5s ease-in';
      statusRequestUlSelected.style.transform = `translateX(-${300 * statusRequestIndex}px)`;
    }
  }, [statusRequestIndex, statusRequestUlSelected]);


  return (
    shouldRenderComponent &&
    <div className="w-full h-full relative pb-4 flex flex-col">
      {
        shouldRenderRequest ?
          <div className='w-full h-full px-5 pb-3 flex flex-row justify-between items-center'>
            <ChevronButton
              direction="left"
              isDisabled={clickRetroDisabled}
              onClick={() => setStatusRequestIndex(statusRequestIndex - 1)}
            />
            <div className="w-[300px] h-full flex flex-col justify-center overflow-x-hidden">
              <ul className='w-[9000px] h-full flex items-center transform' ref={statusRequestUl}>
                {
                  statusRequestToRender?.map(({ requestId, creationDate, category, status }: any, index: any) => (
                    <li key={requestId}
                      className='w-[300px] px-2 flex flex-col lg:hover:cursor-pointer'
                      onClick={() => goClick(requestId)}
                    >
                      <RequestDetail title="Category" content={category} />
                      <RequestDetail title="Creation date" content={creationDate} />
                      <RequestStatus
                        status={status}
                        stepsProcess={requestProcessSteps[requestType]}
                        percentage={requestProgress[status]}
                      />
                    </li>
                  ))
                }
              </ul>
            </div>
            <ChevronButton
              direction="right"
              isDisabled={clickNextDisabled}
              onClick={() => setStatusRequestIndex(statusRequestIndex + 1)}
            />
          </div>
          :
          ///**button add information */
          <ButtonPostUpdateDelete
            itemId={`button-add-request-${requestType}`}
            action='post'
            buttonType='post-dashboard'
            dataBaseCollection={requestType === 'Talent' ? 'request_talent' : 'request_job'}
            shouldRenderButton={true}
          />
      }
    </div>
  )
}


const ChevronButton = ({ direction, onClick, isDisabled }: any) => (
  <button className="w-fit h-full flex flex-col justify-center" disabled={isDisabled} onClick={onClick}>
    <i className={`${isDisabled ? 'opacity-20' : 'opacity-100 hover:text-color-highlighted cursor-pointer'} w-6 h-fit flex justify-center text-color-text-medium text-xl text-center transition-all`}>
      {direction === 'left' ? <IconBxChevronLeft /> : <IconBxChevronRight />}
    </i>
  </button>
);

const RequestDetail = ({ title, content }: any) => (
  <div className={`w-full pb-2 flex flex-col`}>
    <h4 className='w-full text-color-text-dark text-sm'>
      {content}
    </h4>
    <h5 className='w-full text-color-text-almost-clear text-xs'>
      {title}
    </h5>
  </div>
);

const RequestStatus = ({ status, stepsProcess, percentage }: any) => (
  <div className={`w-full flex flex-col`}>
    <h4 className='w-full text-color-text-dark text-sm'>
      Status:
    </h4>
    {/**graphycal request steps process completed */}
    <div className='w-full relative py-1 flex flex-col justify-center transition-all'>
      <div className='w-full h-auto relative flex flex-row items-center border-[1px] border-color-border rounded-lg overflow-hidden z-0'>
        {
          stepsProcess?.map((step: string, index: any) => (
            <h5 key={index} className={`${status === step ? 'text-white text-semibold' : 'text-color-text-almost-clear'} w-1/4 h-fit text-[10px] text-center`}>
              {step}
            </h5>
          ))
        }
        <div style={{ width: `${percentage}%` }} className={`h-full absolute left-0 bottom-0 bg-color-highlighted-clear -z-10`} />
        <div className={`w-full h-full absolute left-0 bottom-0 bg-color-clear -z-20`} />
      </div>
      <div style={{ left: `${percentage}%` }} className={`h-full absolute border-r border-color-border z-10`} />
    </div>
  </div>
);





//<div className="w-[4.5rem] h-[4.5rem]">
//<CircleProgressBar
//percentage={requestProgress(status) as number}
//radius={73}
//circleWidth='170'
//strokeWidth='20px'
//color='green-600'
///>
//</div>