import { useAuthData } from "@/context/ContextAuthData";
import CircleProgressBar from './CircleProgressBar';
import ProfileScoreOverall from './ProfileScoreOverall';
import ProfileScoreOverview from './ProfileScoreOverview';
import SectionTitles from "../components/SectionTitles";

interface ProfileDashboardProps { type: string }


export default function ProfileDashboard({ type }: ProfileDashboardProps) {
  const { userProfileData } = useAuthData();

  const profile: any = [
    {
      id: 'experience',
      title: 'Experience',
      data: userProfileData?.experience,
      shouldRender: userProfileData?.experience.length > 0,
      length: userProfileData?.experience.length,
    },
    {
      id: 'education',
      title: 'Education',
      data: userProfileData?.education,
      shouldRender: userProfileData?.education.length > 0,
      length: userProfileData?.education.length
    },
    {
      id: 'courses',
      title: 'Courses',
      data: userProfileData.courses,
      shouldRender: userProfileData.courses.length > 0,
      length: userProfileData.courses.length
    },
    {
      id: 'recommendations',
      title: 'Recommend...',
      data: userProfileData.recommendations,
      shouldRender: userProfileData.recommendations.length > 0,
      length: userProfileData.recommendations.length
    }
  ];
  const elementsProfileAmount: number = profile.length - 1;
  const elementsCompleted = profile?.filter((element: any) => element.shouldRender).length;
  const percentageProfileFilled: number = Math.round((elementsCompleted / elementsProfileAmount) * 100);

  return (
    <div className='w-full pb-1 flex-col justify-center bg-white border border-color-border md:hover:border-color-highlighted-clear rounded-lg'>
      {/**title */}
      <div className='w-full py-1 px-5 flex flex-row items-center border-b border-color-border'>
        <div className='w-full flex flex-row'>
          <SectionTitles
            sectionTitle={`Profile ${type}`}
            sectionType='account'
          />
        </div>
      </div>
      <ProfileOverview percentage={percentageProfileFilled} profile={profile} shouldRender={type === 'overview'} />
      <ProfileOverall profile={profile} shouldRender={type === 'overall'} />
    </div>
  )
};




const ProfileOverview = ({ percentage, profile, shouldRender }: any) => (
  shouldRender &&
  <div className='w-full py-4 px-5 flex flex-row transition-all'>
    <div className='w-fit flex flex-col justify-center'>
      <div className="w-24 h-24">
        <CircleProgressBar
          percentage={percentage}
          radius={65}
          circleWidth='160'
          strokeWidth='15px'
        />
      </div>
      <div className='w-24 py-1 flex flex-row justify-center'>
        <h4 className='w-fit text-color-text-almost-clear text-sm font-semibold'>
          Completed
        </h4>
      </div>
    </div>
    <div className="w-full pl-5 flex flex-col">
      <ProfileScoreOverview profile={profile} />
    </div>
  </div>
);


const ProfileOverall = ({ profile, shouldRender }: any) => (
  shouldRender &&
  <div className="w-full py-4 px-5 flex flex-col">
    <ProfileScoreOverall profile={profile} />
  </div>
);