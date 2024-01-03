import { useState, useEffect } from "react";
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from "../api/userDataHandlerFunction";
import { IconUser, IconEdit, IconDelete, IconUserSearchLine } from '../../icons/icons';
import EditDeleteButtons from "./EditDeleteButtons";
import CandidateSelectedActiveInfo from "./CandidateSelectedActiveInfo";
import Image from "next/image";
import CardsItems from "./CardsItems";
import Profile from "./Profile";
import SubmenuCarsTitle from "./SubmenuCarsTitle";

interface UserCardParams {
  data: { [key: string]: string },
  userCardType: string,
  requestMenu: string,
  listHover: boolean,
  itemHover: null,
  indexCard: number,
  goClickCondition: boolean,
  goClickTitleEnabled: string,
  goClickTitleDisabled: string,
  value: string,
  goClick: (e: any) => void,
}

interface DataUser {
  user_id: string,
  user_name: string,
  user_image: string
}


export default function UserCardRequest({ data, userCardType, requestMenu, goClickCondition, value, goClick }: UserCardParams) {
  const { screenNarrow } = useUI();
  const { token, userId } = useAuthData();
  const { setChatActived, setChatDataUser } = useAuthUI();
  const [isRequestContactAccepted, setIsRequestContactAccepted] = useState(false);
  const [isGoClickDisabled, setIsGoClickDisabled] = useState(true);
  const [goClickTitle, setGoClickTitle] = useState('');
  const [reviewMenuIndex, setReviewMenuIndex] = useState<number>(0);

  const isCardTypeSubmitted = userCardType === 'talent request' || userCardType === 'job request';
  const isRequestMenuReview = requestMenu === 'candidate review';

  const candidateReviewMenu = [
    { title: 'Overview', value: 'overview' },
    { title: 'Experience', value: 'experience' },
    { title: 'Education', value: 'education' },
    { title: 'Courses', value: 'courses' },
    { title: 'Publications', value: 'publications' },
    { title: 'Conferences', value: 'conferences' },
    { title: 'Certifications', value: 'certifications' },
    { title: 'Recommendations', value: 'recommendations' },
  ];

  useEffect(() => {
    if (requestMenu === 'candidate review') {
      let requestJobId = data.request_job_id;
      userDataHandlerFunction({
        token: token as string,
        userId: userId as string,
        action: 'get-request-contact-accepted',
        collectionName: 'notifications',
        data: requestJobId,
        onSuccess: (responseData: any) => {
          let isOfferAccepted = responseData.length !== 0;
          setIsRequestContactAccepted(isOfferAccepted);
        },
        onError: (error: any) => console.error(error)
      });
    }
  }, [token, userId, requestMenu]);

  useEffect(() => {
    let disabled = true;
    let title = '';
    switch (requestMenu) {
      case 'talent submitted':
        disabled = goClickCondition;
        title = goClickCondition ? 'Awaiting candidates' : 'Candidates';
        break;
      case 'job submitted':
        disabled = goClickCondition;
        title = goClickCondition ? 'Awaiting offers' : 'Offers';
        break;
      case 'candidates':
        disabled = false;
        title = 'Review';
        break;
      case 'offers':
        disabled = false;
        title = goClickCondition ? 'Chat' : 'Acceptance';
        break;
      case 'candidate review':
        if (goClickCondition) {
          disabled = !isRequestContactAccepted;
          title = isRequestContactAccepted ? 'Chat' : 'Contacting';
        }
        else {
          disabled = false;
          title = 'Contact';
        }
        break;
      default:
        //disabled = true; // or some default value
        //title = ''; // or some default value
        break;
    };
    setIsGoClickDisabled(disabled);
    setGoClickTitle(title);
  }, [requestMenu, goClickCondition, isRequestContactAccepted]);

  const goToClick: any = () => {
    switch (requestMenu) {
      case 'candidates':
        return goClick(data.user_id);
      case 'offers':
        if (goClickTitle === 'Chat') {
          let dataUser: DataUser = {
            user_id: data?.user_id,
            user_name: data?.full_name,
            user_image: data?.profile_image
          };
          setChatDataUser(dataUser);
          setChatActived(true);
        }
        else {
          return goClick(data.user_id);
        }
        break;
      case 'candidate review':
        if (goClickTitle === 'Chat') {
          let dataUser: DataUser = {
            user_id: data?.user_id,
            user_name: data?.full_name,
            user_image: data?.profile_image
          };
          setChatDataUser(dataUser);
          setChatActived(true);
        }
        else {
          return goClick(data.request_job_id);
        }
        break;
      default:
        return goClick(value);
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


  return (
    <>
      <div className={`w-full px-5 py-2 flex flex-col bg-white border border-color-border shadow-md rounded-lg transform transition-all`}>
        {/**user fullname */}
        <div className="w-full pb-2 flex flex-row border-b border-color-border">
          <h2 className='w-fit pr-5 text-color-text-dark font-semibold'>
            {data?.full_name || data?.title}
          </h2>
          {
            isRequestMenuReview &&
            <SubmenuCarsTitle
              elements={reviewMenuItems}
              menuIndex={reviewMenuIndex}
              menuIndexRetro={() => setReviewMenuIndex(reviewMenuIndex - 1)}
              menuIndexNext={() => setReviewMenuIndex(reviewMenuIndex + 1)}
            />
          }
        </div>
        <div className="w-full flex flex-col">
          <div className={`${isRequestMenuReview ? 'flex-col' : 'flex-col'} w-full flex`}>
            <div className={`${isRequestMenuReview ? 'flex-row-reverse' : 'flex-col'} w-full flex`}>
              {
                !isCardTypeSubmitted &&
                <div className={`${isRequestMenuReview ? 'w-1/5' : 'w-full'} py-2 flex flex-row justify-center items-center border-b border-color-border`}>
                  {
                    data?.profile_image ?
                      <div className='w-full h-full flex flex-row justify-center items-center'>
                        <Image
                          className='w-32 h-32 flex flex-col justify-center items-center rounded-full'
                          width={800}
                          height={800}
                          src={data?.profile_image}
                          alt='user-image'
                        />
                      </div>
                      :
                      <i className='w-28 h-28 text-6xl text-slate-100 flex flex-row justify-center items-center border border-slate-100 rounded-full transition-all'>
                        <IconUser />
                      </i>
                  }
                </div>
              }
              <ul className={`${isRequestMenuReview ? 'w-4/5 flex-wrap' : 'w-full flex-col'} py-2 flex`}>
                <CardsItems
                  element={data as any}
                  carsModel='horizontal'
                />
              </ul>
            </div>
            {/**buttons go to: candidates, offers or rivew */}
            <div className={`w-full h-fit pb-2 flex flex-row justify-end`}>
              <button
                id='button-go-to'
                className={
                  `${isGoClickDisabled ? 'bg-slate-400' : 'bg-green-500 hover:bg-green-400'
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
      </div>
      {
        isRequestMenuReview &&
        <div className={`w-full flex flex-col border border-color-border`}>
          PROFILE
        </div>
      }
    </>
  )
};


