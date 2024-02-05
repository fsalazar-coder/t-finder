import { useState, useEffect } from 'react';
import { useUI } from "@/context/ContextUI";
import { useAuth } from "@/context/ContextAuth";
import { useAuthData } from "@/context/ContextAuthData";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import { userRequestStatusFunction } from '../api/userRequestStatusFunction';
import RequestDashboard from './RequestDashboard';
import RequestsCardsDisplayer from './RequestsCardsDisplayer';
import RequestsCardsTitles from './RequestsCardsTitles';
import dateTimeFunction from '../api/dateTimeFunction';
import { useAuthSocket } from '@/context/ContextAuthSocket';

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

interface RequestTalent {
  _id: string,
  title: string,
  job_category: string,
  job_description: string,
  required_skills: string,
  required_experience_years: string,
  modality_work: string,
  company_name: string,
  location: string,
  offered_compensation: string,
  status: string
}

interface RequestJob {
  _id: string,
  title: string,
  talent_category: string,
  talent_description: string,
  offered_skills: string,
  experience_years: string,
  modality_work: string,
  availability: string,
  location: string,
  desired_compensation: string,
  status: string
}

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
  const { token, userId } = useAuth();
  const { userNotificationsData, setUserNotificationsData, socket } = useAuthSocket();
  const { setRequestModal, setRequestModalAction, userRequestData, setUserRequestData,
    connectionRequestJobId, setConnectionRequestJobId, userRequestStatusData, setCollectionToChange, setUpdate } = useAuthData();
  const { accountModule, setAccountModule, requestMenu, setRequestMenu } = useUI();
  const { screenNarrow, setMessageModal, setLoading } = useUI();
  const [listHover, setListHover] = useState(false);
  const [cardHover, setCardHover] = useState(false);
  const [candidates, setCandidates] = useState<CandidatesParams>({});
  const [candidatesRequestTalentId, setCandidatesRequestTalentId] = useState('');
  const [candidatesToRender, setCandidatesToRender] = useState<any[]>([]);
  const [candidateToReview, setCandidateToReview] = useState<any[]>([]);
  const [candidateToReviewId, setCandidateToReviewId] = useState('');
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequestsParams>({});
  const [connectionRequestsToRender, setConnectionRequestsToRender] = useState<any[]>([]);
  const [connectionRequestToAcceptId, setConnectionRequestToAcceptId] = useState('');
  const [requestTalentIdFromOfferToAccept, setRequestTalentIdFromOfferToAccept] = useState<string>('');
  const [candidatesContacting, setCandidatesContacting] = useState<CandidatesContacting>({});
  const [connectionRequestsAccepted, setConnectionRequestsAccepted] = useState<ConnectionRequestsAccepted>({});
  const [goClickUpdate, setGoClickUpdate] = useState('');
  const [statusRequestToRender, setStatusRequestToRender] = useState([]);


  useEffect(() => {
    setRequestMenu(accountModule === 'Talent' ? 'talent-submitted' : 'job-submitted')
  }, [accountModule, setRequestMenu]);

  // Arreglo con todos los candidatos disponibles para cada talent request //
  // y, Arreglo con todos los candidatos que están siendo contactados //
  useEffect(() => {
    if (requestMenu === 'talent-submitted' || goClickUpdate === 'candidates-contacting') {
      if (Array.isArray(userRequestData.requestTalent)) {
        userRequestData.requestTalent.forEach((data: RequestTalent) => {
          const keyword = data.job_category;
          let requestTalentId = data._id;
          userDataHandlerFunction({
            token: token as string,
            userId: userId as string,
            action: 'get-candidates',
            collection: 'request_job',
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
            collection: 'notifications',
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
      }
      setGoClickUpdate('');
    }
  }, [token, userId, userRequestData.requestTalent, requestMenu, goClickUpdate]);

  // Arreglo con todas las ofertas disponibles para cada job request //
  useEffect(() => {
    if (requestMenu === 'job-submitted' || goClickUpdate === 'request-accepted') {
      if (Array.isArray(userRequestData.requestJob)) {
        userRequestData?.requestJob?.map((data: RequestJob) => {
          let requestJobId = data._id;
          userDataHandlerFunction({
            token: token as string,
            userId: userId as string,
            action: 'get-requests',
            collection: 'notifications',
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
            collection: 'notifications',
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
      }
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
      case 'candidate-review':
        setCandidateToReview(
          candidatesToRender.filter((candidate) => candidate.user_id === candidateToReviewId)
        );
        break;
      default:
        break;
    }
  }, [
    candidates, candidatesRequestTalentId, requestMenu, connectionRequests, 
    connectionRequestJobId, connectionRequestToAcceptId, requestMenu, 
    candidateToReviewId, candidatesToRender, connectionRequestsToRender
  ]);

  //All status from request to render on dashboard
  useEffect(() => {
    let anyRequestData: any = requestType === 'Talent' ? userRequestStatusData?.requestTalent : userRequestStatusData?.requestJob;
    setStatusRequestToRender(anyRequestData);
  }, [userRequestStatusData, requestType]);

  const requestBackButton: any = () => {
    setListHover(false);
    switch (requestMenu) {
      case 'candidates':
        setRequestMenu('talent-submitted')
        setCandidatesRequestTalentId('');
        break;
      case 'requests':
        setRequestMenu('job-submitted')
        break;
      case 'candidate-review':
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
      requestMenuCondition: requestMenu === 'talent-submitted'
    },
    {
      id: `job-submitted`,
      label: 'Submitted',
      requestMenuCondition: requestMenu === 'job-submitted'
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
      requestMenuCondition: requestMenu === 'candidate-review'
    }
  ];

  // status request update
  const statusRequestUpdate: any = (requestId: string, dataBaseCollection: string, newStatus: string) => {
    userRequestStatusFunction({
      token: token as string,
      userId: requestId,
      action: 'update-status-request',
      collection: dataBaseCollection,
      statusRequest: newStatus,
      onSuccess: () => {
        const userRequestDataUpdate: any = async () => {
          let requestElementNameModule: any = { 'request_talent': 'requestTalent', 'request_job': 'requestJob' };
          let requestElementName: string = requestElementNameModule[dataBaseCollection];
          setUserRequestData((prevData: any) => ({
            ...prevData, [requestElementName]: prevData[requestElementName].map((request: any) =>
              request._id === requestId ? { ...request, status: newStatus } : request
            )
          }));
        };
        userRequestDataUpdate().then(() => { setUpdate('requests-status') })
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
    'talent-submitted': {
      id: 'submitted-talent-request',
      dataToRender: userRequestData?.requestTalent,
      dataToCompare: Object.keys(candidates).filter(key => candidates[key].length === 0),
      goClick: (value: string) => {
        setRequestMenu('candidates');
        setCandidatesRequestTalentId(value);
        statusRequestChange({
          requestId: value,
          dataBaseCollection: 'request_talent',
          oldStatus: 'Submitted',
          newStatus: 'Selecting'
        });
      }
    },
    'job-submitted': {
      id: 'submitted-job-request',
      dataToRender: userRequestData?.requestJob,
      dataToCompare: Object.keys(connectionRequests).filter(key => connectionRequests[key].length === 0),
      goClick: (value: string) => {
        setRequestMenu('requests')
        setConnectionRequestJobId(value)
        statusRequestChange({
          requestId: value,
          dataBaseCollection: 'request_job',
          oldStatus: 'Submitted',
          newStatus: 'Selecting'
        });
      }
    },
    'requests': {
      id: 'requests-list-acceptance',
      dataToRender: connectionRequestsToRender,
      dataToCompare: connectionRequestsAccepted[connectionRequestJobId]?.map((element: any) => element.to_user_id),
      goClick: (value: any) => {
        const toRequestTalentId = connectionRequestsToRender?.find(offer => offer.user_id === value)?.request_talent_id;
        let data: NotificationsParams = {
          from_user_id: userId as string,
          to_user_id: value,
          from_request_id: connectionRequestJobId,
          to_request_id: toRequestTalentId,
          notification_type: 'request-accepted',
          created_at: dateTimeFunction('date') as string,
          notification_status: 'unread',
        };
        setListHover(false);
        setConnectionRequestToAcceptId(value);
        setMessageModal([{
          type: 'question',
          text: 'Do you accept this contact request from Talent Scout?',
          click: () => {
            setMessageModal([]);
            setLoading(true);
            let postNotification = async () => {
              userDataHandlerFunction({
                token: token as string,
                userId: value,
                action: 'post',
                collection: 'notifications',
                data: data,
                onSuccess: () => {
                  setGoClickUpdate('request-accepted');
                  let requestChange: any = async () => {
                    statusRequestChange({
                      requestId: connectionRequestJobId,
                      dataBaseCollection: 'request_job',
                      oldStatus: 'Selecting',
                      newStatus: 'Connected'
                    });
                  };
                  requestChange().then(() => {
                    statusRequestChange({
                      requestId: toRequestTalentId,
                      dataBaseCollection: 'request_talent',
                      oldStatus: 'Contacting',
                      newStatus: 'Connected'
                    });
                  })
                  let notificationRequestContactUpdate = async () => {
                    userDataHandlerFunction({
                      token: token as string,
                      userId: userId as string,
                      action: 'update-notification-request-contact-read-to-accepted',
                      collection: 'notifications',
                      data: toRequestTalentId,     /// to_request_id (id de la notificacion request-contact enviada desde el request talent)
                      onSuccess: () => {
                        setUserNotificationsData(userNotificationsData.map((notification: any) =>
                          (notification.from_request_id === toRequestTalentId && notification.notification_type === 'request-contact') ? { ...notification, notification_status: 'accepted' } : notification
                        ));
                      },
                      onError: (error: any) => console.error(error)
                    });
                  }
                  notificationRequestContactUpdate().then(() => { })

                },
                onError: (error: any) => console.error(error)
              });
            };
            postNotification().then(() => {
              let postConnection = async () => {
                userDataHandlerFunction({
                  token: token as string,
                  userId: userId as string,
                  action: 'post',
                  collection: 'connections',
                  data: { seeker_talent_id: value },
                  onSuccess: () => {
                    setLoading(false);
                    setMessageModal([{
                      type: 'successful',
                      text: `Your offer have been accepted successful`,
                      click: () => setMessageModal([])
                    }]);
                  },
                  onError: (error: any) => console.error(error)
                });
              };
              postConnection().then(() => {
                socket?.emit('notification', data);                //webSocket notification
                setAccountModule('Connections');
                setUpdate('connections');
              })
            });
          }
        }]);
      }
    },
    'candidates': {
      id: 'candidates-list',
      dataToRender: candidatesToRender,
      dataToCompare: [],
      goClick: (value: any) => {
        setRequestMenu('candidate-review')
        setCandidateToReviewId(value)
        setListHover(false)
      }
    },
    'candidate-review': {
      id: 'candidate-review',
      dataToRender: candidateToReview,
      dataToCompare: candidatesContacting[candidatesRequestTalentId]?.map((element) => element.to_user_id),
      goClick: (value: any) => {
        let data: NotificationsParams = {
          from_user_id: userId as string,
          to_user_id: candidateToReviewId,
          from_request_id: candidatesRequestTalentId,
          to_request_id: value,
          notification_type: 'request-contact',
          created_at: dateTimeFunction('date') as string,
          notification_status: 'unread',
        };
        setMessageModal([{
          type: 'question',
          text: 'Do you want to send this candidate a CHAT request?',
          click: () => {
            setLoading(true);
            userDataHandlerFunction({
              token: token as string,
              userId: candidateToReviewId,
              action: 'post',
              collection: 'notifications',
              data: data,
              onSuccess: () => {
                socket?.emit('notification', data);                //webSocket notification
                setGoClickUpdate('candidates-contacting');
                setLoading(false);
                statusRequestChange({
                  requestId: candidatesRequestTalentId,
                  dataBaseCollection: 'request_talent',
                  oldStatus: 'Selecting',
                  newStatus: 'Contacting'
                });
                setMessageModal([{
                  type: 'successful',
                  text: `Your request contact have been sent successful`,
                  click: () => setMessageModal([])
                }]);
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
  const isCardTypeSubmitted = requestMenu === 'talent-submitted' || requestMenu === 'job-submitted';
  const isButtonBack = !isCardTypeSubmitted;

  const containerClassNames = `${isDashboard ? 'w-full h-full flex-col bg-white border border-color-border shadow-md rounded-lg'
    : screenNarrow ? 'w-full flex-col px-5 py-16' : 'w-[52rem] px-2 lg:px-8 lg:py-9 flex-col'
    } flex justify-between transition-all`;

  const goCandidatesFromStatusRequestIdCard: any = (value: string) => {
    if (requestType === 'Talent') {
      setAccountModule('Talent');
      setRequestMenu('talent-submitted')
      setCandidatesRequestTalentId(value)      ////revisar esta funcion... al hacer click sobre el request carrusel debe ir hasta el request especifico
      setTimeout(() => {
        setRequestMenu('candidates')
      }, 250);
    }
    else if (requestType === 'Job') {
      setAccountModule('Job');
      setRequestMenu('requests');
      setConnectionRequestJobId(value)
    }
  }


  return (
    <div className={`w-full h-full flex flex-col items-center`}>
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
        <RequestDashboard
          requestType={requestType}
          statusRequestToRender={statusRequestToRender}
          statusRequestLast={statusRequestToRender.length - 1}
          goClick={(value: string) => goCandidatesFromStatusRequestIdCard(value)}
          shouldRenderComponent={isDashboard}
          shouldRenderRequest={shouldRenderRequest}
        />
        <RequestsCardsDisplayer
          id={requestElements[requestMenu]?.id}
          dataToRender={requestElements[requestMenu]?.dataToRender}
          dataToCompare={requestElements[requestMenu]?.dataToCompare as any}
          statusRequestToRender={statusRequestToRender}
          goClick={requestElements[requestMenu]?.goClick}
          shouldRenderComponent={!isDashboard}
        />
      </div>
    </div>
  );
};