import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import { requestEditFunction } from '../api/requestEditFunction';
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
  // Include other properties as needed
}

// And then ensure requestData.requestTalent is of this type:
interface RequestData {
  requestTalent: TalentData[];
}


export default function Request({ requestType }: any) {
  const { token, userId, collectionToChange, setCollectionToChange,
    update, setUpdate, talentRequestStatus, setTalentRequestStatus, jobRequestStatus, setJobRequestStatus } = useAuthData();
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
  const [candidatesRequestTalentId, setCandidatesRequestTalentId] = useState('');
  const [candidatesToRender, setCandidatesToRender] = useState<any[]>([]);
  const [candidateToReview, setCandidateToReview] = useState<any[]>([]);
  const [candidateToReviewId, setCandidateToReviewId] = useState('');

  const [candidatesContacting, setCandidatesContacting] = useState<CandidatesContacting>({});

  const [offers, setOffers] = useState<OffersParams>({});
  const [offerRequestJobId, setOfferRequestJobId] = useState('');
  const [offersToRender, setOffersToRender] = useState<any[]>([]);
  const [offerToReview, setOfferToReview] = useState<any[]>([]);
  const [offerToReviewId, setOfferToReviewId] = useState('');

  const [offersAccepted, setOffersAccepted] = useState<OffersAccepted>({});

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
        let collectionName = request.collection;
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get',
          collectionName: collectionName,
          data: '',
          onSuccess: (data: any) => {
            const requestName = collectionName === 'request_talent' ? 'requestTalent' : 'requestJob';
            updateRequestData(requestName, data);
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
    requestData.requestTalent.forEach((data: TalentData) => {
      let keyword = data.job_category;
      let requestTalentId = data._id;

      userDataHandlerFunction({
        token: token as string,
        userId: '',
        action: 'get-candidates',
        collectionName: 'request_job',
        data: keyword,
        onSuccess: (searchResponse: []) => {
          setCandidates((prevData) => ({
            ...prevData,
            [requestTalentId]: searchResponse
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
        onSuccess: (actionResponse: []) => {
          setCandidatesContacting((prevData) => ({
            ...prevData,
            [requestTalentId]: actionResponse
          }));
        },
        onError: (error: any) => console.error(error)
      });
    });
  }, [token, userId, requestData.requestTalent, requestMenu]);

  // Arreglo con todas las ofertas disponibles para cada job request //
  useEffect(() => {
    requestData.requestJob.map((data: any, index: any) => {
      let requestJobId = data._id;
      userDataHandlerFunction({
        token: token as string,
        userId: userId as string,
        action: 'get-offers',
        collectionName: 'notifications',
        data: requestJobId,
        onSuccess: (actionResponse: []) => {
          setOffers((prevData) => ({
            ...prevData,
            [requestJobId]: actionResponse
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
        onSuccess: (actionResponse: []) => {
          setOffersAccepted((prevData) => ({
            ...prevData,
            [requestJobId]: actionResponse
          }));
        },
        onError: (error: any) => console.error(error)
      });
    });
  }, [token, userId, requestData.requestJob, requestMenu])

  useEffect(() => {
    const result = candidates[candidatesRequestTalentId];
    (Array.isArray(result)) && setCandidatesToRender(result);
  }, [candidates, candidatesRequestTalentId]);

  useEffect(() => {
    const offersAll = offers[offerRequestJobId];
    (Array.isArray(offersAll)) && setOffersToRender(offersAll);
  }, [offers, offerRequestJobId]);

  useEffect(() => {
    if (requestMenu === 'candidate review') {
      setCandidateToReview(
        candidatesToRender.filter((candidate) => candidate.user_id === candidateToReviewId)
      );
    }
  }, [requestMenu, candidateToReviewId]);

  useEffect(() => {
    if (requestMenu === 'offer review') {
      setOfferToReview(
        offersToRender.filter((offer) => offer.user_id === offerToReviewId)
      );
    }
  }, [requestMenu, offerToReviewId]);

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
      id: 'candidates',
      label: 'Candidates',
      requestMenuCondition: requestMenu === 'candidates'
    },
    {
      id: 'offers',
      label: 'Offers',
      requestMenuCondition: requestMenu === 'offers'
    },
    {
      id: 'talent-review',
      label: 'Review & Contact',
      requestMenuCondition: requestMenu === 'candidate review'
    },
    {
      id: 'offer-review',
      label: 'Review & Acceptance',
      requestMenuCondition: requestMenu === 'offer review'
    },
    {
      id: requestType === 'Talent' ? 'contact-request-talent' : 'contact-request-job',
      label: 'Chat',
      requestMenuCondition: requestMenu === 'chat'
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
      id: 'offers-list',
      cardsDisplayerType: 'offers',
      dataToRender: offersToRender,
      dataToCompare: [],
      requestMenuCondition: 'offers',
      goClickTitleDisabled: '',
      goClickTitleEnabled: 'Review',
      goClick: (value: any) => {
        setRequestMenu('offer review')
        setOfferToReviewId(value)
        setListHover(false)
      }
    },
    {
      id: 'candidate-review',
      cardsDisplayerType: 'review',
      dataToRender: candidateToReview,
      dataToCompare: candidatesContacting[candidatesRequestTalentId]?.map((element) => element.to_user_id),
      requestMenuCondition: 'candidate review',
      goClickTitleDisabled: 'Contacting',
      goClickTitleEnabled: 'Contact',
      goClick: (value: any) => {
        setMessageModal([{
          type: 'question',
          text: 'A contact request will be sent to the candidate. If the candidate accepts, you can start a CHAT',
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
              onSuccess: (insertedId: string) => {
                //requestEditFunction({
                //token: token as string,
                //collection: 'request_job',
                //toRequestId: value,
                //dataToInsert: { notification_id: insertedId, from_request_id: candidatesRequestTalentId },
                //onSuccess: (actionResponse: any) => {},
                //onError: (error: any) => console.error(error)
                //})
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
    },
    {
      id: 'offer-review',
      cardsDisplayerType: 'review',
      dataToRender: offerToReview,
      dataToCompare: Object.keys(offersAccepted).filter(key => offersAccepted[key].length === 0),
      requestMenuCondition: 'offer review',
      goClickTitleDisabled: 'Chat',
      goClickTitleEnabled: 'Accept',
      goClick: (value: any) => {
        //requestMenu === 'offer review' && (() => {
        //console.log('Offers: ', offers);
        //console.log('Offers to render: ', offersToRender);
        //console.log('Offer to review: ', offerToReview);
        //console.log('Offers to review Id: ', offerToReviewId);
        //})
        setMessageModal([{
          type: 'question',
          text: 'Accepting this offer will initiate a CHAT with the Talent Scout',
          click: () => {
            console.log('goClick offers review (value): ', value);
            setLoading(true);
            userDataHandlerFunction({
              token: token as string,
              userId: offerToReviewId,
              action: 'post',
              collectionName: 'notifications',
              data: {
                from_user_id: userId,
                to_request_id: value,
                from_request_id: offerRequestJobId,
                notification_type: 'offer acceptance',
              },
              onSuccess: (insertedId: string) => {
                //console.log('Action response request contact: ', insertedId)
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
              {/**submenu: submitted, candidates, offers, review and chat... */}
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
                      dataToCompare={dataToCompare}
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
