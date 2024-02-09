import { useState, useEffect } from 'react';
import { userProfileScoreFunction } from '../api/userProfileScoreFunction';


export default function ProfileScoreOverall({ profile }: any) {
  const [scoreProfile, setScoreProfile] = useState<number>(0);
  const [scoreProfileMax, setScoreProfileMax] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    if (profile) {
      let profileScoreOverallUser: any = userProfileScoreFunction(profile, 'score overall');
      setScoreProfile(profileScoreOverallUser.scoreProfile);
      setScoreProfileMax(profileScoreOverallUser.scoreProfileMax);
      setPercentage(profileScoreOverallUser.percentage);
    }
  }, [profile]);


  return (
    <div className={`w-full h-full flex flex-col`}>
      <div className='w-full pb-[1px] flex flex-row items-center'>
        <h4 className='text-color-text-dark text-sm font-semibold flex flex-row items-center'>
          Overall score
        </h4>
        <h5 className='pl-1 text-color-text-medium text-xs font-normal'>
          (pts):
        </h5>
      </div>
      <div className='w-full relative flex flex-row justify-center border border-color-border rounded-full overflow-hidden z-0'>
        <h6 className='w-fit text-[10px] text-color-text-dark font-semibold'>
          {`${scoreProfile}/${scoreProfileMax}`}
        </h6>
        <div style={{ width: `${percentage}%` }} className={`h-full absolute left-0 top-0 bg-color-secondary-clear -z-10`} />
        <div className={`w-full h-full absolute left-0 top-0 bg-color-clear -z-20`} />
      </div>
    </div>
  );
};