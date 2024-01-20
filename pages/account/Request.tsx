import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import { userRequestStatusFunction } from '../api/userRequestStatusFunction';
import RequestDashboard from './RequestDashboard';
import RequestsCardsDisplayer from './RequestsCardsDisplayer';
import RequestsCardsTitles from './RequestsCardsTitles';

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

interface ConnectionRequestsParams {
  [key: string]: Array<Offer>;
}

interface Offer {
  user_id: string;
  profile_image: string;
}

interface ConnectionRequestsAccepted {
  [key: string]: Array<Accepted>;
}

interface Accepted {
  from_user_id: string;
}

interface TalentData {
  job_category: string;
  _id: string;
}

interface userRequestData {
  requestTalent: TalentData[];
};

interface RequestStatus {
  request_id: string;
  date: string;
  category: string;
  status: string;
}

interface StatusRequestParams {
  [key: string]: string
}



export default function Request({ requestType }: any) {
  const { token, userId, userRequestData, setUserRequestData, collectionToChange, setCollectionToChange,
    update, setUpdate, updateCounter, setUpdateCounter, talentRequestStatus, setTalentRequestStatus, socket } = useAuthData();
  const { accountModule, setAccountModule, setRequestModal, setRequestModalAction } = useAuthUI();
  const { screenNarrow, setMessageModal, setLoading } = useUI();
  const [listHover, setListHover] = useState(false);
  const [cardHover, setCardHover] = useState(false);
  const [requestMenu, setRequestMenu] = useState<string>('');
  const [candidates, setCandidates] = useState<CandidatesParams>({});
  const [candidatesRequestTalentId, setCandidatesRequestTalentId] = useState('');
  const [candidatesToRender, setCandidatesToRender] = useState<any[]>([]);
  const [candidateToReview, setCandidateToReview] = useState<any[]>([]);
  const [candidateToReviewId, setCandidateToReviewId] = useState('');
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequestsParams>({});
  const [connectionRequestJobId, setConnectionRequestJobId] = useState('');
  const [connectionRequestsToRender, setConnectionRequestsToRender] = useState<any[]>([]);
  const [connectionRequestToAcceptId, setConnectionRequestToAcceptId] = useState('');

  const [requestTalentIdFromOfferToAccept, setRequestTalentIdFromOfferToAccept] = useState<string>('');

  const [candidatesContacting, setCandidatesContacting] = useState<CandidatesContacting>({});
  const [connectionRequestsAccepted, setConnectionRequestsAccepted] = useState<ConnectionRequestsAccepted>({});
  const [goClickUpdate, setGoClickUpdate] = useState('');

  const [statusRequestToRender, setStatusRequestToRender] = useState([]);
  const [statusRequestToChange, setStatusRequestToChange] = useState([]);


  const collectionNameChanger: any = {
    'Talent': 'request_talent',
    'Job': 'request_job'
  };

  const requestNameChanger: any = {
    'request_talent': 'requestTalent',
    'request_job': 'requestJob'
  };

  useEffect(() => {
    setRequestMenu(accountModule === 'Talent' ? 'talent submitted' : 'job submitted')
  }, [accountModule])


  // Cargar los datos para todas las request
  useEffect(() => {
    if (update === 'all' || update === collectionToChange || accountModule === 'Dashboard') {
      setUpdateCounter((counter) => counter + 1);
      const fetchRequest = async () => {
        const collectionName = collectionNameChanger[requestType];
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get',
          collectionName: collectionName,
          data: '',
          onSuccess: (responseData: any) => {
            const requestName = requestNameChanger[collectionName];
            setUserRequestData((prevData) => ({
              ...prevData,
              [requestName]: responseData
            }));
          },
          onError: (error: any) => console.error(error)
        });
      };
      fetchRequest().then(() => {
        setUpdateCounter((counter) => counter - 1);
        setCollectionToChange('');
        if ((update === 'all' && updateCounter === 0) || update === collectionToChange) {
          setUpdate('');
        }
      });
    }
  }, [token, userId, update, accountModule]);



  // Arreglo con todos los candidatos disponibles para cada talent request //
  // y, Arreglo con todos los candidatos que están siendo contactados //
  useEffect(() => {
    if (requestMenu === 'talent submitted' || goClickUpdate === 'candidates contacting') {
      userRequestData.requestTalent.forEach((data: any) => {
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
  }, [token, userId, userRequestData.requestTalent, requestMenu, goClickUpdate]);

  // Arreglo con todas las ofertas disponibles para cada job request //
  useEffect(() => {
    if (requestMenu === 'job submitted' || goClickUpdate === 'request accepted') {
      userRequestData.requestJob.map((data: any) => {
        let requestJobId = data._id;
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-requests',
          collectionName: 'notifications',
          data: requestJobId,
          onSuccess: (responseData: any) => {
            setConnectionRequests((prevData) => ({
              ...prevData,
              [requestJobId]: responseData
            }));
          },
          onError: (error: any) => console.error(error)
        });
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-requests-accepted',
          collectionName: 'notifications',
          data: requestJobId,
          onSuccess: (responseData: any) => {
            setConnectionRequestsAccepted((prevData) => ({
              ...prevData,
              [requestJobId]: responseData
            }));
          },
          onError: (error: any) => console.error(error)
        });
      });
      setGoClickUpdate('');
    }
  }, [token, userId, userRequestData.requestJob, requestMenu, goClickUpdate])

  useEffect(() => {
    switch (requestMenu) {
      case 'candidates':
        const result = candidates[candidatesRequestTalentId];
        (Array.isArray(result)) && setCandidatesToRender(result);
        break;
      case 'requests':
        let connectionRequestsAll = connectionRequests[connectionRequestJobId];
        let matchedOffer = connectionRequestsToRender?.find((offer) => offer.user_id === connectionRequestToAcceptId);
        let toRequestTalentId = matchedOffer ? matchedOffer.request_talent_id : undefined;
        (Array.isArray(connectionRequestsAll)) && setConnectionRequestsToRender(connectionRequestsAll);
        setRequestTalentIdFromOfferToAccept(toRequestTalentId);
        break;
      case 'candidate review':
        setCandidateToReview(
          candidatesToRender.filter((candidate) => candidate.user_id === candidateToReviewId)
        );
        break;
      default:
        break;
    }
  }, [
    candidates, candidatesRequestTalentId, requestMenu,
    connectionRequests, connectionRequestJobId,
    connectionRequestToAcceptId,
    requestMenu, candidateToReviewId
  ]);

  const requestBackButton: any = () => {
    setListHover(false);
    switch (requestMenu) {
      case 'candidates':
        setRequestMenu('talent submitted')
        setCandidatesRequestTalentId('');
        break;
      case 'requests':
        setRequestMenu('job submitted')
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
      id: 'requests-and-cceptance',
      label: 'Requests & Acceptance',
      requestMenuCondition: requestMenu === 'requests'
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

  // status request update
  const statusRequestUpdate: any = (requestId: string, dataBaseCollection: string, status: string) => {
    userRequestStatusFunction({
      token: token as string,
      userId: requestId,
      collectionName: dataBaseCollection,
      action: 'edit-status-request',
      statusRequest: status,
      onSuccess: () => {
        switch (dataBaseCollection) {
          case 'request_talent':
            setUpdate('status-request-talent');
            break;
          case 'request_job':
            setUpdate('status-request-job');
            break;
          default:
            break;
        }
      },
      onError: (error: any) => console.error(error)
    });
  };

  const statusRequestChange: any = ({ requestId, dataBaseCollection, oldStatus, newStatus }: any) => {
    let statusRequest: any = statusRequestToRender
      .filter((request: any) => {
        return (request.requestId === requestId)
      })
      .reduce((accumulator: any, request: any) => {
        accumulator[request.requestId] = request.status;
        return accumulator;
      }, {});
    statusRequest[requestId] === oldStatus && statusRequestUpdate(requestId, dataBaseCollection, newStatus);
  };

  const requestElements: any = {
    'talent submitted': {
      id: 'submitted-talent-request',
      dataToRender: userRequestData.requestTalent,
      dataToCompare: Object.keys(candidates).filter(key => candidates[key].length === 0),
      goClick: (value: string) => {
        statusRequestChange({ requestId: value, dataBaseCollection: 'request_talent', oldStatus: 'Submitted', newStatus: 'Selecting' });
        setRequestMenu('candidates')
        setCandidatesRequestTalentId(value)
      }
    },
    'job submitted': {
      id: 'submitted-job-request',
      dataToRender: userRequestData.requestJob,
      dataToCompare: Object.keys(connectionRequests).filter(key => connectionRequests[key].length === 0),
      goClick: (value: string) => {
        statusRequestChange({ requestId: value, dataBaseCollection: 'request_job', oldStatus: 'Submitted', newStatus: 'Selecting' });
        setRequestMenu('requests')
        setConnectionRequestJobId(value)
      }
    },
    'requests': {
      id: 'requests-list-acceptance',
      dataToRender: connectionRequestsToRender,
      dataToCompare: connectionRequestsAccepted[connectionRequestJobId]?.map((element: any) => element.to_user_id),
      goClick: (value: any) => {
        setListHover(false);
        setConnectionRequestToAcceptId(value)
        const toRequestTalentId = connectionRequestsToRender?.find(offer => offer.user_id === value)?.request_talent_id;
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
                from_request_id: connectionRequestJobId,
                notification_type: 'request accepted',
              },
              onSuccess: () => {
                setGoClickUpdate('request accepted');
                statusRequestChange({ requestId: connectionRequestJobId, dataBaseCollection: 'request_job', oldStatus: 'Selecting', newStatus: 'Accepted' });
                setLoading(false);
                setMessageModal([{
                  type: 'successful',
                  text: `Your offer have been accepted successful`,
                  click: () => setMessageModal([])
                }]);
                userDataHandlerFunction({
                  token: token as string,
                  userId: userId as string,
                  action: 'post',
                  collectionName: 'connections',
                  data: { seeker_talent_id: value },
                  onSuccess: () => { setAccountModule('Connections') },
                  onError: (error: any) => console.error(error)
                });
                //webSocket notification:
                socket?.emit('notification', { to_user_id: value, update_socket: 'notifications' });
              },
              onError: (error: any) => console.error(error)
            });
            setMessageModal([]);
          }
        }])
      }
    },
    'candidates': {
      id: 'candidates-list',
      dataToRender: candidatesToRender,
      dataToCompare: [],
      goClick: (value: any) => {
        setRequestMenu('candidate review')
        setCandidateToReviewId(value)
        setListHover(false)
      }
    },
    'candidate review': {
      id: 'candidate-review',
      dataToRender: candidateToReview,
      dataToCompare: candidatesContacting[candidatesRequestTalentId]?.map((element) => element.to_user_id),
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
                statusRequestChange({ requestId: candidatesRequestTalentId, dataBaseCollection: 'request_talent', oldStatus: 'Selecting', newStatus: 'Contacting' });
                setLoading(false);
                setMessageModal([{
                  type: 'successful',
                  text: `Your request contact have been sent successful`,
                  click: () => setMessageModal([])
                }]);
                //webSocket notification:
                socket?.emit('notification', { to_user_id: candidateToReviewId, update_socket: 'notifications' });
              },
              onError: (error: any) => console.error(error)
            });
            setMessageModal([]);
          }
        }])
      },
    }
  };

  const isDashboard = accountModule === 'Dashboard';
  const shouldRenderRequest = requestType === 'Talent' ? userRequestData?.requestTalent?.length > 0 : userRequestData?.requestJob?.length > 0;
  const isCardTypeSubmitted = requestMenu === 'talent submitted' || requestMenu === 'job submitted';
  const isButtonBack = !isCardTypeSubmitted;

  const containerClassNames = `${isDashboard ? 'w-full h-full flex-col bg-white border border-color-border shadow-md rounded-lg'
    : screenNarrow ? 'w-full flex-col px-5 py-16' : 'w-[52rem] px-2 lg:px-8 lg:py-9 flex-col'
    } flex justify-between transition-all`;

  const goCandidatesFromStatusRequestIdCard: any = (value: string) => {
    if (requestType === 'Talent') {
      setAccountModule('Talent');
      setRequestMenu('talent submitted')
      setTimeout(() => {
        setRequestMenu('candidates')
        setCandidatesRequestTalentId(value)
      }, 250);
    }
    else if (requestType === 'Job') {
      setAccountModule('Job');
      setRequestMenu('requests');
      setConnectionRequestJobId(value)
    }
  }

  //All status from request to render on dashboard
  useEffect(() => {
    if (accountModule === 'Dashboard' || accountModule === 'Talent' || accountModule === 'Job') {
      let anyRequestData: any = requestType === 'Talent' ? userRequestData.requestTalent : userRequestData.requestJob;
      let statusAllAnyRequest: any = anyRequestData.map((request: any) => {
        let requestCategory: any = requestType === 'Talent' ? request.job_category : request.talent_category;
        return (
          {
            requestId: request._id,
            creationDate: request.created_at,
            category: requestCategory,
            status: request.status
          }
        )
      });
      setStatusRequestToRender(statusAllAnyRequest);
    }
  }, [accountModule])


  return (
    <div className={`${!isDashboard && 'pl-0 lg:pl-60'} w-full h-full flex flex-col items-center`}>
      <div className={containerClassNames}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        <RequestsCardsTitles
          screenNarrow={screenNarrow}
          isDashboard={isDashboard}
          dataType={requestType}
          dataMenuTitles={requestMenuTitles}
          isData={shouldRenderRequest}
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
              requestType={requestType}
              statusRequestToRender={statusRequestToRender}
              statusRequestLast={statusRequestToRender.length - 1}
              shouldRenderRequest={shouldRenderRequest}
              goClick={(value: string) => goCandidatesFromStatusRequestIdCard(value)}
            />
            :
            <RequestsCardsDisplayer
              id={requestElements[requestMenu]?.id}
              dataToRender={requestElements[requestMenu]?.dataToRender}
              dataToCompare={requestElements[requestMenu]?.dataToCompare as any}
              requestMenu={requestMenu || ''}
              statusRequestToRender={statusRequestToRender}
              goClick={requestElements[requestMenu]?.goClick}
            />
        }
      </div>
    </div>
  );
};