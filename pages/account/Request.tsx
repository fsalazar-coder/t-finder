import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { fetchDataApi } from '../api/fetchDataApi';
import RequestCard from './RequestCard';
import axios from 'axios';
import UserCard from './UserCard';
import UserSelected from './UserSelected';
import RequestDashboard from './RequestDashboard';



export default function Request({ requestType }: any) {
  const { token, userId, userScore, setUserScore, collectionToChange, setCollectionToChange, update, setUpdate } = useAuthData();
  const { accountModule } = useAuthUI();
  const { screenNarrow } = useUI();
  const [requestStep, setRequestStep] = useState('submitted');
  const [requestData, setRequestData] = useState({
    requestTalent: [],
    requestJob: [],
  });
  const [searchResult, setSearchResult] = useState([]);
  const [userIdSelected, setUserIdSelected] = useState('');
  const [itemSelected, setItemSelected] = useState('');
  const [listHover, setListHover] = useState(false);

  const requests = [
    {
      id: 'talent',
      title: 'Talent request',
      data: requestData.requestTalent,
      collection: 'request_talent',
      shouldRender: requestData.requestTalent.length > 0,
      stepsProcess: ['Submmission', 'Options list', 'Selection', 'Hiring']
    },
    {
      id: 'job',
      title: 'Job request',
      data: requestData.requestJob,
      collection: 'request_job',
      shouldRender: requestData.requestJob.length > 0,
      stepsProcess: ['Submmission', 'Options list', 'Application', 'Aceptance']
    }
  ];

  const updateRequestData = (requestName: string, data: any) => {
    setRequestData((prevData) => ({
      ...prevData,
      [requestName]: data
    }));
  };

  const handleSearch = async (collectionToSearch: string, keyword: string) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.post('/api/searchApi',
        {
          collectionToSearch,
          keyword
        },
        config
      );
      const { status, searchResponse } = response.data;
      if (status === 'success') {
        setSearchResult(searchResponse);
      }
    }
    catch {
      (error: any) => console.log(error)
    }
  };

  // Cargar los datos para todas las request
  useEffect(() => {
    if (!update || update === collectionToChange) {
      requests.forEach((request) => {
        let collectionName = request.collection;
        fetchDataApi({
          token: token as string,
          userId: userId as string,
          collectionName,
          onSuccess: (data: any) => {
            let requestName = collectionName === 'request_talent' ? 'requestTalent' : 'requestJob';
            updateRequestData(requestName, data);
            const collectionToSearch = collectionName === 'request_talent' ? 'request_job' : 'request_talent';
            const keyword = collectionToSearch === 'request_talent' ? data[0].talent_category : data[0].job_category;
            handleSearch(collectionToSearch, keyword);
          },
          onError: (error: any) => console.error(error)
        });
        if (update) {
          setUpdate('');
          setCollectionToChange('');
        }
      })
    }
  }, [token, userId, update, setUpdate, collectionToChange, setCollectionToChange]);

  const isDashboard = accountModule === 'Dashboard';


  return (
    <div className={`${!isDashboard && 'pl-0 lg:px-60'} w-full h-full flex flex-col`}>
      <div className={
        `${isDashboard ? 'h-full flex-row' : screenNarrow ? 'flex-col px-1 py-12' :
          'px-2 lg:px-8 lg:py-9 flex-col'} w-full flex justify-between transition-all`
      }>
        {
          isDashboard ?
            <RequestDashboard
              requestType={requestType}
              isDashboard={isDashboard}
              data={requestType === 'talent' ? requestData?.requestTalent : requestData?.requestJob}
            />
            :
            <>
              {/**submenu: submitted, response, selected */}
              <div
                className={
                  `${screenNarrow ? 'px-5' : 'px-5'
                  } w-full py-1 flex flex-row items-center bg-color-clear border border-color-border-clear shadow-md rounded-lg`
                }>
                <button
                  className='pr-4 border-r border-color-border-clear'
                  value='submitted'
                  onClick={(e) => setRequestStep(e.currentTarget.value)}
                >
                  <h4 className={`${requestStep === 'submitted' ? 'text-color-secondary font-extrabold' : 'text-color-text-secondary font-extralight'}`}>
                    Request
                  </h4>
                </button>
                <button className={`${!searchResult ? 'cursor-default' : 'cursor-pointer'} px-4 border-r border-color-border-clear`}
                  value={requestType === 'talent' ? 'candidates' : 'opportunities'}
                  onClick={(e) => setRequestStep(searchResult ? e.currentTarget.value : requestStep)}
                >
                  <h4 className={`${(requestStep === 'candidates' || requestStep === 'opportunities') ? 'text-color-secondary font-extrabold' : 'text-color-text-secondary font-extralight'}`}>
                    {requestType === 'talent' ? 'Candidates' : 'Opportunities'}
                  </h4>
                </button>

                <button className={`${!userIdSelected ? 'cursor-default' : 'cursor-pointer'} px-4 border-r border-color-border-clear`}
                  value='selected'
                  onClick={(e) => setRequestStep(userIdSelected ? e.currentTarget.value : requestStep)}
                >
                  <h4 className={`${userIdSelected ? requestStep === 'selected' ? 'text-color-secondary font-extrabold' : 'text-color-text-secondary font-extralight' : 'text-color-text-tertiary'}`}>
                    Selected
                  </h4>
                </button>
              </div>
              {
                /**request card: talent or job */
                requestStep === 'submitted' ?
                  requests?.filter((item) => item.id === requestType)
                    .map((request: any, index: any) => {
                      return (
                        <li
                          id={request.id}
                          key={`${index}-${request.title}`}
                          className={`${!isDashboard && 'my-1'} w-full h-full flex flex-col`}>
                          <RequestCard
                            id={request.id}
                            title={request.title}
                            value={request.collection}
                            data={request.data}
                            shouldRender={request.shouldRender}
                            stepsProcess={request.stepsProcess}
                          />
                        </li>
                      )
                    })
                  :
                  /**candidates section */
                  requestStep === 'candidates' ?
                    <ul
                      className='w-full h-full py-2 flex flex-col'
                      onMouseEnter={() => setListHover(true)}
                      onMouseLeave={() => setListHover(false)}
                    >
                      {
                        searchResult?.map((user: any, index: any) => {
                          return (
                            index < 3 &&
                            <li id={user.user_id} key={`${index}`} className={`w-full h-full pb-2`}>
                              <UserCard
                                data={user}
                                listHover={listHover}
                                requestStep={requestStep}
                                click={() => {
                                  setUserIdSelected(user.user_id)
                                  setRequestStep('selected')
                                  setListHover(false)
                                }}
                              />
                            </li>
                          )
                        })
                      }
                    </ul>
                    :
                    requestStep === 'selected' &&
                    searchResult?.map((user: any, index: any) => {
                      return (
                        user.user_id === userIdSelected &&
                        <UserSelected
                          data={user}
                          listHover={listHover}
                          requestStep={requestStep}
                          click={() => {
                            setRequestStep('contact')
                          }}
                        />
                      )
                    })
              }
            </>
        }
      </div>
    </div>
  );
};