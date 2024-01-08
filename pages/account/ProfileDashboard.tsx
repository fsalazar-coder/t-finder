import { useAuthUI } from '@/context/authContext';
import CircleProgressBar from './CircleProgressBar';
import ProfileScoreOverall from './ProfileScoreOverall';
import ProfileScoreOverview from './ProfileScoreOverview';



export default function ProfileDashboard({ data, percentage }: any) {

  const { accountModule } = useAuthUI();

  return (
    <div className='w-full h-full px-5 flex flex-col items-center'>
      {/**graphycal profile completed */}
      <div className='w-full flex flex-col items-center border-b border-color-border transition-all'>
        <div className="w-24 h-24">
          <CircleProgressBar
            percentage={percentage}
            radius={65}
            circleWidth='160'
            strokeWidth='15px'
          />
        </div>
        <div className='w-full py-1 flex flex-row justify-center'>
          <h4 className='w-fit text-color-text-almost-clear text-sm font-semibold'>
            Completed
          </h4>
        </div>
      </div>
      <div className='w-full h-fit flex flex-col items-center'>
        <div className="w-full py-2 flex flex-col">
          <div className="w-full pb-2">
            <ProfileScoreOverall
              profile={data}
            />
          </div>
          <ProfileScoreOverview
            profile={data}
          />
        </div>
      </div>
    </div>
  )
}