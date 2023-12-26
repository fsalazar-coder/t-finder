import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import RequestDashboard from './RequestDashboard';
import SectionTitles from '../components/SectionTitles';
import ButtonTitleMenuAddEdit from './ButtonTitleMenuAddEdit';
import CardsDisplayer from './CardsDisplayer';
import { IconBxChevronLeft } from '@/icons/icons';

interface Request {
  collection: string;
}

interface CandidatesParams {
  [key: string]: Array<Candidate>;
}

interface Candidate {
  user_id: string;
  profile_image: string;
  full_name: string;
  availability: string;
  experience_level: string;
  location: string;
  modality_work: string;
  preferred_language: string;
  profession_occupation: string;
  profile_score: number;
  rates: string;
  skills_offered: string;
}

interface CandidatesContacting {
  [key: string]: Array<Contacting>;
}

interface Contacting {
  to_user_id: string;
}

interface OffersParams {
  [key: string]: Array<Offer>;
}

interface Offer {
  user_id: string;
  profile_image: string;
}

interface OffersAccepted {
  [key: string]: Array<Accepted>;
}

interface Accepted {
  from_user_id: string;
}

interface TalentData {
  job_category: string;
  _id: string;
}

interface RequestData {
  requestTalent: TalentData[];
}


export default function Request({ requestType }: any) {
  const { token, userId, collectionToChange, setCollectionToChange,
    update, setUpdate, talentRequestStatus, setTalentRequestStatus } = useAuthData();
  const { accountModule, setAccountModule, setRequestModal, setRequestModalAction } = useAuthUI();
  const { screenNarrow, setMessageModal, setLoading } = useUI();
  const [listHover, setListHover] = useState(false);
  const [cardHover, setCardHover] = useState(false);
  const [requestMenu, setRequestMenu] = useState(requestType === 'Talent' ? 'talent submitted' : 'job submitted');

  const [requestData, setRequestData] = useState({
    requestTalent: [],
    requestJob: [],
  });

  const [candidates, setCandidates] = useState<CandidatesParams>({});
  const [candidatesAvailables, setCandidatesAvailables] = useState<CandidatesParams>({});
  const [candidatesRequestTalentId, setCandidatesRequestTalentId] = useState('');
  const [candidatesToRender, setCandidatesToRender] = useState<any[]>([]);
  const [candidateToReview, setCandidateToReview] = useState<any[]>([]);
  const [candidateToReviewId, setCandidateToReviewId] = useState('');
  const [offers, setOffers] = useState<OffersParams>({});
  const [offersAvailables, setOffersAvailables] = useState<OffersParams>({});
  const [offerRequestJobId, setOfferRequestJobId] = useState('');
  const [offersToRender, setOffersToRender] = useState<any[]>([]);
  const [offerToAcceptId, setOfferToAcceptId] = useState('');

  const [requestTalentIdFromOfferToAccept, setRequestTalentIdFromOfferToAccept] = useState<string>('');

  const [candidatesContacting, setCandidatesContacting] = useState<CandidatesContacting>({});
  const [candidatesContactingUpdated, setCandidatesContactingUpdated] = useState<CandidatesContacting>(candidatesContacting);
  const [offersAccepted, setOffersAccepted] = useState<OffersAccepted>({});
  const [offersAcceptedUpdated, setOffersAcceptedUpdated] = useState<OffersAccepted>(offersAccepted);


  const [goClickUpdate, setGoClickUpdate] = useState('');

  const requests: any = [
    {
      id: 'Talent',
      title: 'Talent request',
      data: requestData.requestTalent,
      collection: 'request_talent',
      shouldRender: requestData.requestTalent.length > 0,
      stepsProcess: [
        { step: 'Submmission', render: requestData?.requestTalent?.length > 0 },
        { step: 'Selecting', render: Object.keys(candidates).length > 0 },
        { step: 'Contacting', render: true },
        { step: 'Chating', render: true }
      ]
    },
    {
      id: 'Job',
      title: 'Job request',
      data: requestData.requestJob,
      collection: 'request_job',
      shouldRender: requestData.requestJob.length > 0,
      stepsProcess: [
        { step: 'Submmission', render: requestData?.requestJob?.length > 0 },
        { step: 'Alerted', render: true },
        { step: 'Acceptance', render: true },
        { step: 'Chating', render: true }
      ],
    }
  ];

  const updateRequestData = (requestName: string, data: any) => {
    setRequestData((prevData) => ({
      ...prevData,
      [requestName]: data
    }));
  };

  // Cargar los datos para todas las request
  useEffect(() => {
    if (!update || update === collectionToChange) {
      requests.forEach((request: Request) => {
        const collectionName = request.collection;
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get',
          collectionName: collectionName,
          data: '',
          onSuccess: (responseData: any) => {
            const requestName = collectionName === 'request_talent' ? 'requestTalent' : 'requestJob';
            updateRequestData(requestName, responseData);
          },
          onError: (error: any) => console.error(error)
        });
        if (update) {
          setUpdate('');
          setCollectionToChange('');
        }
      });
    }
  }, [token, userId, setUpdate, collectionToChange, setCollectionToChange]);

  // Arreglo con todos los candidatos disponibles para cada talent request //
  // y, Arreglo con todos los candidatos que están siendo contactados //
  useEffect(() => {
    if (requestMenu === 'talent submitted' || goClickUpdate === 'candidates contacting') {
      requestData.requestTalent.forEach((data: TalentData) => {
        const keyword = data.job_category;
        let requestTalentId = data._id;
        userDataHandlerFunction({
          token: token as string,
          userId: 'userId' as string,
          action: 'get-candidates',
          collectionName: 'request_job',
          data: keyword,
          onSuccess: (responseData: any) => {
            setCandidates((prevData) => ({
              ...prevData, [requestTalentId]: responseData
            }));
          },
          onError: (error: any) => console.error(error)
        });
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-contacting-candidates-ids',
          collectionName: 'notifications',
          data: requestTalentId,
          onSuccess: (responseData: any) => {
            setCandidatesContacting((prevData) => ({
              ...prevData,
              [requestTalentId]: responseData
            }));
          },
          onError: (error: any) => console.error(error)
        });
      });
      setGoClickUpdate('');
    }
  }, [token, userId, requestData.requestTalent, requestMenu, goClickUpdate]);

  // Arreglo con todas las ofertas disponibles para cada job request //
  useEffect(() => {
    if (requestMenu === 'job submitted' || goClickUpdate === 'offers accepted') {
      requestData.requestJob.map((data: any) => {
        let requestJobId = data._id;
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-offers',
          collectionName: 'notifications',
          data: requestJobId,
          onSuccess: (responseData: any) => {
            setOffers((prevData) => ({
              ...prevData,
              [requestJobId]: responseData
            }));
          },
          onError: (error: any) => console.error(error)
        });
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-offers-accepted',
          collectionName: 'notifications',
          data: requestJobId,
          onSuccess: (responseData: any) => {
            setOffersAccepted((prevData) => ({
              ...prevData,
              [requestJobId]: responseData
            }));
          },
          onError: (error: any) => console.error(error)
        });
      });
      setGoClickUpdate('');
    }
  }, [token, userId, requestData.requestJob, requestMenu, goClickUpdate])

  useEffect(() => {
    if (requestMenu === 'candidates') {
      const result = candidates[candidatesRequestTalentId];
      (Array.isArray(result)) && setCandidatesToRender(result);
    }
  }, [candidates, candidatesRequestTalentId, requestMenu]);

  useEffect(() => {
    if (requestMenu === 'offers') {
      const offersAll = offers[offerRequestJobId];
      (Array.isArray(offersAll)) && setOffersToRender(offersAll);
    }
  }, [offers, offerRequestJobId]);

  useEffect(() => {
    if (requestMenu === 'candidate review') {
      setCandidateToReview(
        candidatesToRender.filter((candidate) => candidate.user_id === candidateToReviewId)
      );
    }
  }, [requestMenu, candidateToReviewId]);

  useEffect(() => {
    if (requestMenu === 'offers') {
      let matchedOffer = offersToRender?.find((offer) => offer.user_id === offerToAcceptId);
      let toRequestTalentId = matchedOffer ? matchedOffer.request_talent_id : undefined;
      setRequestTalentIdFromOfferToAccept(toRequestTalentId);
    }
  }, [offerToAcceptId]);


  const requestMenuTitles = [
    {
      id: `talent-submitted`,
      label: 'Submitted',
      requestMenuCondition: requestMenu === 'talent submitted'
    },
    {
      id: `job-submitted`,
      label: 'Submitted',
      requestMenuCondition: requestMenu === 'job submitted'
    },
    {
      id: 'offers-and-cceptance',
      label: 'Offers & Acceptance',
      requestMenuCondition: requestMenu === 'offers'
    },
    {
      id: 'candidates',
      label: 'Candidates',
      requestMenuCondition: requestMenu === 'candidates'
    },
    {
      id: 'candidate-review-and-contact',
      label: 'Review & Contact',
      requestMenuCondition: requestMenu === 'candidate review'
    }
  ];

  const requestBackButton: any = () => {
    setListHover(false);
    switch (requestMenu) {
      case 'candidates':
        setRequestMenu('talent submitted')
        setCandidatesRequestTalentId('');
        break;
      case 'offers':
        setRequestMenu('job submitted')
        //setCandidatesRequestTalentId('');
        break;
      case 'offer review':
        setRequestMenu('offers')
        break;
      case 'candidate review':
        setRequestMenu('candidates')
        break;
      default:
        break;
    }
  }

  const requestCardsDisplayer = [
    {
      id: 'submitted-talent-request',
      cardsDisplayerType: 'talent request',
      dataToRender: requestData.requestTalent,
      dataToCompare: Object.keys(candidates).filter(key => candidates[key].length === 0),
      requestMenuCondition: 'talent submitted',
      goClickTitleDisabled: 'Awaiting candidates',
      goClickTitleEnabled: 'Candidates',
      backClick: () => { },
      goClick: (value: string) => {
        setRequestMenu('candidates')
        setCandidatesRequestTalentId(value)
      }
    },
    {
      id: 'submitted-job-request',
      cardsDisplayerType: 'job request',
      dataToRender: requestData.requestJob,
      dataToCompare: Object.keys(offers).filter(key => offers[key].length === 0),
      requestMenuCondition: 'job submitted',
      goClickTitleDisabled: 'Awaiting offers',
      goClickTitleEnabled: 'Offers',
      backClick: () => { },
      goClick: (value: any) => {
        setRequestMenu('offers')
        setOfferRequestJobId(value)
      }
    },
    {
      id: 'offers-list-acceptance',
      cardsDisplayerType: 'offers',
      dataToRender: offersToRender,
      dataToCompare: offersAccepted[offerRequestJobId]?.map((element: any) => element.to_user_id),
      requestMenuCondition: 'offers',
      goClickTitleDisabled: 'Chat',
      goClickTitleEnabled: 'Acceptance',
      goClick: (value: any) => {
        setListHover(false);
        setOfferToAcceptId(value)
        const toRequestTalentId = offersToRender?.find(offer => offer.user_id === value)?.request_talent_id;
        setMessageModal([{
          type: 'question',
          text: 'Do you accept this contact request from Talent Scout?',
          click: () => {
            setLoading(true);
            userDataHandlerFunction({
              token: token as string,
              userId: value,
              action: 'post',
              collectionName: 'notifications',
              data: {
                from_user_id: userId,
                to_request_id: toRequestTalentId as string,
                from_request_id: offerRequestJobId,
                notification_type: 'offer acceptance',
              },
              onSuccess: () => {
                setGoClickUpdate('offers accepted');
                setLoading(false);
                setMessageModal([{
                  type: 'successful',
                  text: `Your acceptance offer have been sent successful`,
                  click: () => setMessageModal([])
                }]);
              },
              onError: (error: any) => console.error(error)
            });
            setTalentRequestStatus('Acceptance offer')
            setMessageModal([]);
          }
        }])
      }
    },
    {
      id: 'candidates-list',
      cardsDisplayerType: 'candidates',
      dataToRender: candidatesToRender,
      dataToCompare: [],
      requestMenuCondition: 'candidates',
      goClickTitleDisabled: '',
      goClickTitleEnabled: 'Review',
      goClick: (value: any) => {
        setRequestMenu('candidate review')
        setCandidateToReviewId(value)
        setListHover(false)
      }
    },
    {
      id: 'candidate-review',
      cardsDisplayerType: 'candidate review',
      dataToRender: candidateToReview,
      dataToCompare: candidatesContacting[candidatesRequestTalentId]?.map((element) => element.to_user_id),
      requestMenuCondition: 'candidate review',
      goClickTitleDisabled: 'Contacting',
      goClickTitleEnabled: 'Contact',
      goClick: (value: any) => {
        setMessageModal([{
          type: 'question',
          text: 'Do you want to send this candidate a CHAT request?',
          click: () => {
            setLoading(true);
            userDataHandlerFunction({
              token: token as string,
              userId: candidateToReviewId,
              action: 'post',
              collectionName: 'notifications',
              data: {
                from_user_id: userId,
                to_request_id: value,
                from_request_id: candidatesRequestTalentId,
                notification_type: 'request contact',
              },
              onSuccess: () => {
                setGoClickUpdate('candidates contacting');
                setLoading(false);
                setMessageModal([{
                  type: 'successful',
                  text: `Your request contact have been sent successful`,
                  click: () => setMessageModal([])
                }]);
              },
              onError: (error: any) => console.error(error)
            });
            setTalentRequestStatus('Contacting')
            setMessageModal([]);
          }
        }])
      },
    }
  ];

  const isDashboard = accountModule === 'Dashboard';
  const isRequest = requestType === 'Talent' ? requestData?.requestTalent?.length > 0 : requestData?.requestJob?.length > 0;
  const stepsProcess = requests[requestType === 'Talent' ? 0 : 1].stepsProcess;
  const isCardTypeSubmitted = requestMenu === 'talent submitted' || requestMenu === 'job submitted';
  const isButtonBack = !isCardTypeSubmitted;


  useEffect(() => {
    if (requestMenu === 'offers' || requestMenu === 'candidates') {

    }
  }, [requestData, requestMenu])


  return (
    <div className={`${!isDashboard && 'pl-0 lg:pl-60'} w-full h-full flex flex-col items-center`}>
      <div className={
        `${isDashboard ? 'w-full h-full flex-col bg-color-clear border border-color-border-clear shadow-md rounded-lg'
          : screenNarrow ? 'w-full flex-col px-1 py-12' : 'w-[52rem] px-2 lg:px-8 lg:py-9 flex-col'
        } flex justify-between transition-all`
      }
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        {/**title */}
        <div className={
          `${isDashboard ? 'border-b' : 'bg-color-clear border shadow-md rounded-lg'
          } w-full relative px-5 py-1 flex justify-between flex-row items-center border-color-border-clear`
        }>
          <div className='w-full flex flex-row justify-between items-center'>
            <div className='w-2/3 flex flex-row items-center'>
              <SectionTitles
                sectionTitle={`${requestType} request`}
                sectionType='account'
              />
              {
                !isDashboard &&
                /**submenu: submitted, candidates, offers, review and chat... */
                <div className={`w-fit pl-5 flex flex-row items-center`}>
                  {
                    requestMenuTitles.map(({ id, label, requestMenuCondition }) => (
                      requestMenuCondition &&
                      <div
                        key={id}
                        className='px-5 border-l border-color-border-clear cursor-default'
                      >
                        <h4 className={`text-color-secondary font-semibold`}>
                          {label}
                        </h4>
                      </div>
                    ))
                  }
                </div>
              }
            </div>
            <div className="w-1/3 h-full relative flex flex-row justify-end items-center">
              {
                !isButtonBack ?
                  <ButtonTitleMenuAddEdit
                    id={`button-title-request-${requestType}`}
                    isRequest={isRequest}
                    isDashboard={isDashboard}
                    cardHover={cardHover}
                    screenNarrow={screenNarrow}
                    addButtonName={`New request`}
                    openAccountModule={() => setAccountModule(requestType)}
                    openModalForm={() => {
                      setRequestModal(requestType);
                      setRequestModalAction('post');
                      setCollectionToChange(requestType === 'Talent' ? 'request_talent' : 'request_job');
                    }}
                  />
                  :
                  /**back button */
                  <button
                    id='button-back'
                    className={
                      `w-fit h-full text-color-text-tertiary hover:text-color-text-primary text-[14px] flex flex-row justify-end items-center transition-all`}
                    onClick={() => requestBackButton()}
                  >
                    <i className='pr-1'>
                      <IconBxChevronLeft />
                    </i>
                    <h4 className="flex flex-row">
                      Back
                    </h4>
                  </button>
              }
            </div>
          </div>
        </div>
        {
          isDashboard ?
            <RequestDashboard
              requestType={requestType}
              isDashboard={isDashboard}
              stepsProcess={stepsProcess}
              clickAddInfoButton={() => setAccountModule(requestType)}
              isRequest={isRequest}
              selecting={Object.keys(candidates).length > 0}
            />
            :
            !isDashboard && isRequest &&
            <div className='w-full flex flex-col'>
              {
                requestCardsDisplayer.map((
                  {
                    id, cardsDisplayerType, dataToRender, dataToCompare, requestMenuCondition,
                    goClickTitleEnabled, goClickTitleDisabled, goClick
                  }
                ) => {
                  return (
                    requestMenuCondition === requestMenu &&
                    <CardsDisplayer
                      id={id}
                      key={id}
                      cardsDisplayerType={cardsDisplayerType}
                      dataToRender={dataToRender}
                      dataToCompare={dataToCompare as any}
                      requestMenu={requestMenu}
                      goClick={goClick}
                      goClickTitleEnabled={goClickTitleEnabled}
                      goClickTitleDisabled={goClickTitleDisabled}
                    />
                  )
                })
              }
            </div>
        }
      </div>
    </div>
  );
};
