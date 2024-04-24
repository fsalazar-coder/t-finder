import { useState, useEffect } from 'react';
import { userProfileScoreFunction } from '../api/userProfileScoreFunction';


export default function ProfileScoreOverview({ profile }: any) {
  const [overview, setOverview] = useState<[]>([]);

  useEffect(() => {
    if (profile) {
      let overviewUserProfile: any = userProfileScoreFunction(profile, 'score overview');
      setOverview(overviewUserProfile);
    }
  }, [profile]);


  return (
    <ul className={`w-full h-full flex flex-col`}>
      {/* 
      <li className='w-full flex flex-row items-center'>
        <h4 className='pb-[1px] text-color-text-dark text-sm font-semibold flex flex-row items-center'>
          Overview score
        </h4>
        <h5 className='pl-1 text-color-text-medium text-xs font-normal'>
          (pts):
        </h5>
      </li>
      */}
      {
        overview?.map(({ profileItem, scoreItem, maxPointItem, percentage }: any, index: any) => {
          return (
            <li key={index} className='w-full py-1 flex flex-col'>
              <div className='w-full pb-[1px] flex flex-row items-center'>
                <h5 className='text-color-text-medium text-xs flex flex-row items-center'>
                  {profileItem}
                </h5>
                <h5 className='pl-1 text-color-text-medium text-xs flex flex-row items-center'>
                  {`(${scoreItem}/${maxPointItem}):`}
                </h5>
              </div>
              <div className='w-full py-[2px] relative border border-color-border rounded-full overflow-hidden z-0'>
                <div style={{ width: `${percentage}%` }} className={`h-full absolute left-0 top-0 bg-color-secondary-clear -z-10`} />
                <div className={`w-full h-full absolute left-0 top-0 bg-color-clear -z-20`} />
              </div>
            </li>
          )
        })
      }
    </ul>
  );
};