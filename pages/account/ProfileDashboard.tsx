import { useAuthData } from "@/context/ContextAuthData";
import CircleProgressBar from './CircleProgressBar';
import ProfileScoreOverall from './ProfileScoreOverall';
import ProfileScoreOverview from './ProfileScoreOverview';

interface ProfileDashboardProps { shouldRender: boolean }


export default function ProfileDashboard({shouldRender}: ProfileDashboardProps) {
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
      id: 'publications',
      title: 'Publications',
      data: userProfileData.publications,
      shouldRender: userProfileData.publications.length > 0,
      length: userProfileData.publications.length
    },
    {
      id: 'conferences',
      title: 'Conferences',
      data: userProfileData.conferences,
      shouldRender: userProfileData.conferences.length > 0,
      length: userProfileData.conferences.length
    },
    {
      id: 'certifications',
      title: 'Certifications',
      data: userProfileData.certifications,
      shouldRender: userProfileData.certifications.length > 0,
      length: userProfileData.certifications.length
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
    shouldRender &&
    <div className='w-full h-full px-5 pb-4 flex flex-col items-center'>
      {/**graphycal profile completed */}
      <div className='w-full flex flex-col items-center border-b border-color-border transition-all'>
        <div className="w-24 h-24">
          <CircleProgressBar
            percentage={percentageProfileFilled}
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
            <ProfileScoreOverall profile={profile} />
          </div>
          <ProfileScoreOverview profile={profile} />
        </div>
      </div>
    </div>
  )
}