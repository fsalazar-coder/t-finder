import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { fetchDataApi } from '../api/fetchDataApi';
import RequestCard from './RequestCard';



export default function Request(props: any) {


  const { token, userId, collectionToChange, setCollectionToChange, update, setUpdate } = useAuthData();

  const [requestData, setRequestData] = useState({
    requestTalent: [],
    requestJob: [],
  });

  const requests = [
    {
      id: 'talent',
      title: 'Request talent',
      data: requestData.requestTalent,
      collection: 'request_talent',
      shouldRender: requestData.requestTalent.length > 0
    },
    {
      id: 'job',
      title: 'Request job',
      data: requestData.requestJob,
      collection: 'request_job',
      shouldRender: requestData.requestJob.length > 0
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
      requests.forEach((request) => {
        let collectionName = request.collection;
        fetchDataApi({
          token: token as string,
          userId: userId as string,
          collectionName,
          onSuccess: (data: any) => {
            let requestName = collectionName === 'request_talent' ? 'requestTalent' : 'requestJob';
            updateRequestData(requestName, data);
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


  return (
    <div className='w-full h-full pl-0 lg:px-60 flex flex-row bg-slate-50'>
      <ul className='container w-full py-12 px-2 pb-2 lg:p-8 flex flex-col transition-all'>
        {
          /**request card: talent & job */
          requests?.map((request: any, index: any) => {
            return (
              <li
                id={request.id}
                key={`${index}-${request.title}`}
                className='w-full relative my-1 flex flex-col bg-white border border-slate-200 rounded-lg'
              >
                <RequestCard
                  id={request.id}
                  title={request.title}
                  value={request.collection}
                  data={request.data}
                  shouldRender={request.shouldRender}
                />
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};