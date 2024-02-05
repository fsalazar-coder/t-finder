import { useState, useEffect, useMemo } from "react";
import { useUI } from "@/context/ContextUI";
import { useAuth } from "@/context/ContextAuth";
import { useAuthData } from "@/context/ContextAuthData";
import { userDataHandlerFunction } from "../api/userDataHandlerFunction";
import CardsItems from "./CardsItems";
import SubmenuCarsTitle from "./SubmenuCarsTitle";
import ProfileScoreOverview from "./ProfileScoreOverview";
import ProfileScoreOverall from "./ProfileScoreOverall";
import ButtonPostUpdateDelete from "./ButtonPostUpdateDelete";
import ImageIconUser from "./ImageIconUser";
import ProfileCardsDisplayer from "./ProfileCardsDisplayer";

interface UserCardParams {
  data: { [key: string]: string },
  dataBaseCollection: string,
  editDeleteButtonVisible: boolean,
  goClickCondition: boolean,
  statusRequestToRender: any,
  value: string,
  goClick: (e: any) => void,
}

interface CandidateProfileParams {
  id: string,
  title: string,
  data: DataCandidate[],
  shouldRender: boolean,
  length: number,
};

interface DataCandidate {
  [key: string]: string
}

interface DataUser {
  user_id: string,
  user_name: string,
  user_image_url: string
}


export default function RequestsCard({ data, dataBaseCollection, editDeleteButtonVisible, goClickCondition, value, goClick }: UserCardParams) {
  const { requestMenu } = useUI();
  const { token, userId } = useAuth();
  const [isRequestContactAccepted, setIsRequestContactAccepted] = useState(false);
  const [isGoClickDisabled, setIsGoClickDisabled] = useState(true);
  const [goClickTitle, setGoClickTitle] = useState('');
  const [reviewMenuIndex, setReviewMenuIndex] = useState<number>(0);
  const [candidateInfo, setCandidateInfo] = useState({
    experience: [],
    education: [],
    courses: [],
    publications: [],
    conferences: [],
    certifications: [],
    recommendations: [],
  });

  const candidateProfile: CandidateProfileParams[] = useMemo(() => ([
    {
      id: 'experience',
      title: 'Experience',
      data: candidateInfo?.experience,
      shouldRender: candidateInfo?.experience.length > 0,
      length: candidateInfo?.experience.length,
    },
    {
      id: 'education',
      title: 'Education',
      data: candidateInfo?.education,
      shouldRender: candidateInfo?.education.length > 0,
      length: candidateInfo?.education.length
    },
    {
      id: 'courses',
      title: 'Courses',
      data: candidateInfo?.courses,
      shouldRender: candidateInfo?.courses.length > 0,
      length: candidateInfo?.courses.length
    },
    {
      id: 'publications',
      title: 'Publications',
      data: candidateInfo?.publications,
      shouldRender: candidateInfo?.publications.length > 0,
      length: candidateInfo?.publications.length
    },
    {
      id: 'conferences',
      title: 'Conferences',
      data: candidateInfo?.conferences,
      shouldRender: candidateInfo?.conferences.length > 0,
      length: candidateInfo?.conferences.length
    },
    {
      id: 'certifications',
      title: 'Certifications',
      data: candidateInfo?.certifications,
      shouldRender: candidateInfo?.certifications.length > 0,
      length: candidateInfo?.certifications.length
    },
    {
      id: 'recommendations',
      title: 'Recommend...',
      data: candidateInfo?.recommendations,
      shouldRender: candidateInfo?.recommendations.length > 0,
      length: candidateInfo?.recommendations.length
    }
  ]), []);

  useEffect(() => {
    if (requestMenu === 'candidate-review') {
      let requestJobId = data?.request_job_id;
      userDataHandlerFunction({
        token: token as string,
        userId: userId as string,
        action: 'get-request-contact-accepted',
        collection: 'notifications',
        data: requestJobId,
        onSuccess: (responseData: any) => {
          let isOfferAccepted = responseData?.length !== 0;
          setIsRequestContactAccepted(isOfferAccepted);
        },
        onError: (error: any) => console.error(error)
      });
    }
  }, [token, userId, requestMenu, data?.request_job_id]);

  //control de texto en botones
  useEffect(() => {
    let disabled = true;
    let title = '';
    switch (requestMenu) {
      case 'talent-submitted':
        disabled = goClickCondition;
        title = goClickCondition ? 'Awaiting candidates' : 'Candidates';
        break;
      case 'job-submitted':
        disabled = goClickCondition;
        title = goClickCondition ? 'Awaiting requests' : 'Requests';
        break;
      case 'candidates':
        disabled = false;
        title = 'Review';
        break;
      case 'requests':
        disabled = goClickCondition;
        title = goClickCondition ? 'Accepted' : 'Accept';
        break;
      case 'candidate-review':
        if (goClickCondition) {
          disabled = true;
          title = isRequestContactAccepted ? 'Contacted' : 'Contacting';
        }
        else {
          disabled = false;
          title = 'Contact';
        }
        break;
      default:
        break;
    };
    setIsGoClickDisabled(disabled);
    setGoClickTitle(title);
  }, [requestMenu, goClickCondition, isRequestContactAccepted]);

  // Cargar datos del candidato
  useEffect(() => {
    if (requestMenu === 'candidate-review' || requestMenu === 'candidates') {
      candidateProfile?.forEach((element: any) => {
        let collectionName = element.id;
        userDataHandlerFunction({
          token: token as string,
          userId: data.user_id as string,
          action: 'get-default',
          collection: collectionName,
          data: '',
          onSuccess: (responseData: any) => {
            let elementName: string = collectionName;
            let data: any = responseData;
            setCandidateInfo((prevData) => ({ ...prevData, [elementName]: data }));
          },
          onError: (error: any) => console.error(error)
        });
      });
    };
  }, [token, userId, requestMenu, candidateProfile, data]);

  const goToClick: any = () => {
    switch (requestMenu) {
      case 'talent-submitted':
        return goClick(value);
      case 'job-submitted':
        return goClick(value);
      case 'candidates':
        return goClick(data?.user_id);
      case 'requests':
        return goClick(data?.user_id);
      case 'candidate-review':
        return goClick(data?.request_job_id);
      default:
        break
    }
  }

  const reviewMenuItems: any = [
    {
      id: 'overview',
      title: 'Overview',
    },
    {
      id: 'experience',
      title: 'Experience',
    },
    {
      id: 'education',
      title: 'Education',
    },
    {
      id: 'courses',
      title: 'Courses',
    },
    {
      id: 'publications',
      title: 'Publications',
    },
    {
      id: 'conferences',
      title: 'Conferences',
    },
    {
      id: 'certifications',
      title: 'Certifications',
    },
    {
      id: 'recommendations',
      title: 'Recommend...',
    }
  ];

  const isRequestMenuSubmitted = (requestMenu === 'talent-submitted' || requestMenu === 'job-submitted');
  const isRequestMenuCandidates = requestMenu === 'candidates';
  const isRequestMenuReview = requestMenu === 'candidate-review';

  const candidateProfileIndex: number = reviewMenuIndex > 0 ? reviewMenuIndex - 1 : 0
  const profileElementsId: string = candidateProfile[candidateProfileIndex]?.id;
  const profileElementsData: any = candidateProfile[candidateProfileIndex]?.data;
  const isRenderOverview: boolean = reviewMenuIndex === 0;
  const shouldRenderData: boolean = Object.keys(data)?.length > 0;
  const heightCardsModule: any = {
    'talent-submitted': 'h-[430px]',
    'job-submitted': 'h-[450px]',
    'candidates': 'h-[500px]',
    'requests': 'h-[500px]',
    'candidate-review': 'h-auto',
  };

  return (
    shouldRenderData && data &&
    <>
      <div className={`${heightCardsModule[requestMenu]} w-full px-5 py-2 flex flex-col bg-white border border-color-border shadow-md rounded-lg transform transition-all`}>
        {/**title */}
        <div className={`${!isRequestMenuReview && 'h-[7%] justify-between'} w-full relative pb-2 flex flex-row border-b border-color-border`}>
          <h2 className='w-fit pr-5 text-color-text-dark font-semibold'>
            {data?.full_name || data?.title}
          </h2>
          {
            isRequestMenuReview && reviewMenuItems &&
            <SubmenuCarsTitle
              elements={reviewMenuItems}
              menuIndex={reviewMenuIndex}
              menuIndexRetro={() => setReviewMenuIndex(reviewMenuIndex - 1)}
              menuIndexNext={() => setReviewMenuIndex(reviewMenuIndex + 1)}
            />
          }
          <ButtonPostUpdateDelete
            itemId={data?._id}
            action='update-delete'
            buttonType='update-delete-items'
            dataBaseCollection={dataBaseCollection}
            shouldRenderButton={shouldRenderData && editDeleteButtonVisible && isRequestMenuSubmitted}
          />
        </div>
        {/**user fullname */}
        <div className={`${!isRequestMenuReview && 'h-[93%]'} w-full flex flex-col`}>
          <div className={`${isRequestMenuReview ? 'flex-col' : 'flex-col justify-between'} w-full h-full flex`}>
            <div className={`${isRequestMenuReview ? 'flex-row-reverse' : 'flex-col'} w-full flex`}>
              {
                !isRequestMenuSubmitted &&
                // user profile image
                <div className={`${isRequestMenuReview ? 'w-1/5' : 'w-full border-b'} py-2 flex flex-row justify-center items-center border-color-border`}>
                  <div className="w-24 h-24 flex flex-col justify-center items-center">
                    <ImageIconUser
                      type={'request'}
                      otherUserImageUrl={data?.profile_image_url as string}
                    />
                  </div>
                </div>
              }
              {
                isRequestMenuCandidates && candidateProfile ?
                  <div className="w-full py-2 flex flex-col">
                    <div className="w-full pb-2">
                      <ProfileScoreOverall profile={candidateProfile} />
                    </div>
                    <ProfileScoreOverview profile={candidateProfile} />
                  </div>
                  :
                  <ul className={`${isRequestMenuReview ? 'w-4/5 flex-wrap' : 'w-full flex-col'} py-2 flex`}>
                    {data && <CardsItems element={data as any} carsModel={isRequestMenuReview ? 'horizontal' : 'vertical'} />}
                  </ul>
              }
            </div>
            {/**buttons go to: candidates, offers or rivew */}
            <div className={`w-full h-fit pb-2 flex flex-row justify-end`}>
              <button
                id='button-go-to'
                className={
                  `${isGoClickDisabled ? 'bg-slate-400' : 'bg-color-highlighted hover:bg-color-highlighted-clear'
                  } w-full px-4 py-2 flex flex-row justify-center items-center rounded-lg font-semibold transition-all`}
                disabled={isGoClickDisabled}
                onClick={() => goToClick()}
              >
                <h4 className="h-4 text-white text-[14px] flex flex-row items-center">
                  {goClickTitle}
                </h4>
              </button>
            </div>
          </div>
        </div>
      </div >
      {
        isRequestMenuReview &&
        <div className={`w-full flex flex-col`}>
          {
            isRenderOverview ?
              <div className="w-full mt-1 px-5 py-5 flex flex-col bg-white border border-color-border shadow-md rounded-lg transform transition-all">
                {candidateProfile && <ProfileScoreOverview profile={candidateProfile} />}
              </div>
              :
              profileElementsData &&
              <ProfileCardsDisplayer
                id={profileElementsId}
                key={profileElementsId}
                data={profileElementsData}
                collectionName={profileElementsId}
              />
          }
        </div>
      }
    </>
  )
};


