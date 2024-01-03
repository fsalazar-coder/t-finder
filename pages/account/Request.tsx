import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import CardsTitlesRequest from './CardsTitlesRequest';
import RequestDashboard from './RequestDashboard';
import CardsDisplayerRequest from './CardsDisplayerRequest';
//import io from 'socket.io-client';

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
};



export default function Request({ requestType }: any) {
  const { token, userId, collectionToChange, setCollectionToChange,
    update, setUpdate, talentRequestStatus, setTalentRequestStatus, socket } = useAuthData();
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
  const [offers, setOffers] = useState<OffersParams>({});
  const [offerRequestJobId, setOfferRequestJobId] = useState('');
  const [offersToRender, setOffersToRender] = useState<any[]>([]);
  const [offerToAcceptId, setOfferToAcceptId] = useState('');

  const [requestTalentIdFromOfferToAccept, setRequestTalentIdFromOfferToAccept] = useState<string>('');

  const [candidatesContacting, setCandidatesContacting] = useState<CandidatesContacting>({});
  const [offersAccepted, setOffersAccepted] = useState<OffersAccepted>({});
  const [goClickUpdate, setGoClickUpdate] = useState('');

  // Cargar los datos para todas las request
  useEffect(() => {
    if (update === collectionToChange || accountModule === 'Talent' || accountModule === 'Job') {
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
  }, [token, userId, update, collectionToChange, accountModule]);

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

  useEffect(() => {
    if (requestMenu === 'offers' || requestMenu === 'candidates') {

    }
  }, [requestData, requestMenu]);

  const updateRequestData = (requestName: string, data: any) => {
    setRequestData((prevData) => ({
      ...prevData,
      [requestName]: data
    }));
  };

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

  const requestElements: any = {
    'talent submitted': {
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
    'job submitted': {
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
    'offers': {
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
                //webSocket notification:
                socket?.emit('notification', {
                  toUserId: value,
                  message: 'notification update'
                });
              },
              onError: (error: any) => console.error(error)
            });
            setTalentRequestStatus('Acceptance offer')
            setMessageModal([]);
          }
        }])
      }
    },
    'candidates': {
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
    'candidate review': {
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
                //webSocket notification:
                socket?.emit('notification', {
                  toUserId: candidateToReviewId,
                  message: 'notification update'
                });
              },
              onError: (error: any) => console.error(error)
            });
            setTalentRequestStatus('Contacting')
            setMessageModal([]);
          }
        }])
      },
    }
  };

  const isDashboard = accountModule === 'Dashboard';
  const isRequest = requestType === 'Talent' ? requestData?.requestTalent?.length > 0 : requestData?.requestJob?.length > 0;
  const stepsProcess = requests[requestType === 'Talent' ? 0 : 1].stepsProcess;
  const isCardTypeSubmitted = requestMenu === 'talent submitted' || requestMenu === 'job submitted';
  const isButtonBack = !isCardTypeSubmitted;

  const containerClassNames = `${isDashboard ? 'w-full h-full flex-col bg-white border border-color-border shadow-md rounded-lg'
    : screenNarrow ? 'w-full flex-col px-1 py-12' : 'w-[52rem] px-2 lg:px-8 lg:py-9 flex-col'
    } flex justify-between transition-all`;


  return (
    <div className={`${!isDashboard && 'pl-0 lg:pl-60'} w-full h-full flex flex-col items-center`}>
      <div className={containerClassNames}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        <CardsTitlesRequest
          screenNarrow={screenNarrow}
          isDashboard={isDashboard}
          dataType={requestType}
          dataMenuTitles={requestMenuTitles}
          isData={isRequest}
          cardHover={cardHover}
          openAccountModuleClick={() => setAccountModule(requestType)}
          openModalFormClick={() => {
            setRequestModal(requestType);
            setRequestModalAction('post');
            setCollectionToChange(requestType === 'Talent' ? 'request_talent' : 'request_job');
          }}
          isButtonBack={isButtonBack}
          requestBackButton={() => requestBackButton()}
        />
        {
          isDashboard ?
            <RequestDashboard
              isDashboard={isDashboard}
              isRequest={isRequest}
              requestType={requestType}
              stepsProcess={stepsProcess}
              clickAddInfoButton={() => setAccountModule(requestType)}
              selecting={Object.keys(candidates).length > 0}
            />
            :
            <CardsDisplayerRequest
              id={requestElements[requestMenu].id}
              key={requestElements[requestMenu].id}
              cardsDisplayerType={requestElements[requestMenu].cardsDisplayerType}
              dataToRender={requestElements[requestMenu].dataToRender}
              dataToCompare={requestElements[requestMenu].dataToCompare as any}
              requestMenu={requestMenu}
              goClick={requestElements[requestMenu].goClick}
              goClickTitleEnabled={requestElements[requestMenu].goClickTitleEnabled}
              goClickTitleDisabled={requestElements[requestMenu].goClickTitleDisabled}
            />
        }
      </div>
    </div>
  );
};