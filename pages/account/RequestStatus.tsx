import { useState, useEffect, useRef, useMemo } from 'react';
import { useUI } from '@/context/ContextUI';
import CircleProgressBar from './CircleProgressBar';

interface RequestStatusParams {
  requestType: string,
  shouldRender: boolean
}



export default function RequestStatus({ requestType, shouldRender }: RequestStatusParams) {

  const [statusRequestToRender, setStatusRequestToRender] = useState([]);


  const requestProgress: any = useMemo(() => ({
    'Submitted': 25,
    'Selecting': 50,
    'Contacting': 75,
    'Accepted': 75,
    'Completed': 100,
  }), []);

  const requestProcessSteps: any = useMemo(() => ({
    'Talent': ['Connected', 'Submitted', 'Contacting', 'Selecting'],
    'Job': ['Connected', 'Submitted', 'Accepted', 'Selecting']
  }), []);


  return (
    shouldRender &&
    <div className="w-full h-full lg:w-3/5 px-5 flex flex-col justify-center">
      <div className='w-full flex flex-row justify-center'>
        <div className='w-full flex flex-col items-center lg:hover:cursor-pointer'>
          <Status
            status={'Selecting'}
            stepsProcess={requestProcessSteps[requestType]}
            percentage={requestProgress['Selecting']}
          />
        </div>
      </div>
    </div>
  )
}



const Status = ({ status, stepsProcess, percentage }: any) => (
  <div className={`w-full flex flex-col`}>
    {/**graphycal request steps process completed */}
    <div className='w-full relative py-1 flex flex-row justify-center items-center transition-all'>
      <ul className='w-full h-full absolute flex flex-row flex-wrap justify-between items-center z-0'>
        {
          stepsProcess?.map((step: string, index: any) => (
            <li className={`${index === 0 || index === 2 ? 'pr-[3.15rem] justify-end' : 'pl-[3.15rem]'} w-1/2 h-1/2 flex flex-row items-center`}>
              <h5 key={index} className={`${status === step ? 'text-color-dark font-semibold' : 'text-color-text-almost-clear'} text-center text-xs flex`}>
                {`${step}`}
              </h5>
            </li>
          ))
        }
      </ul>
      <div className="w-[6rem] h-[6rem] relative flex flex-row justify-center items-center">
        <CircleProgressBar
          percentage={percentage as number}
          radius={73}
          circleWidth='180'
          strokeWidth='20px'
          color='green-600'
        />
        <div className='w-[75%] h-[75%] absolute flex bg-white rounded-full z-20' />
        <div className="w-[6.25rem] h-[6.25rem] absolute flex flex-wrap z-10">
          <div className="w-1/2 h-1/2 flex flex-row border-r border-b border-color-border" />
          <div className="w-1/2 h-1/2 flex flex-row border-b border-color-border" />
          <div className="w-1/2 h-1/2 flex flex-row border-r border-color-border" />
        </div>
      </div>
    </div>
  </div>
);
