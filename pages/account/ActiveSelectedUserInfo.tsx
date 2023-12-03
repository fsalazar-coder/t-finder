import { useState, useEffect } from 'react';
import { useAuthData, useUI } from "../../context/authContext";
import { fetchDataApi } from '../api/fetchDataApi';
import { IconCircle, IconAlert, IconAdd, IconMenuI, IconUserGraduate, IconBxsBellRing, IconBxErrorCircle, IconCheckCircle, IconCancelCircle, IconEdit } from '@/icons/icons';
import ItemContent from './ItemContent';
import axios from 'axios';


interface UserInfoActive {
  userId: string,
  userItemMenu: string
}


export default function SelectedUserActiveInfo({userId, userItemMenu}: UserInfoActive) {

  const { token } = useAuthData();
  const { screenNarrow } = useUI();

  const [userInfo, setUserInfo] = useState([]);

  const getUserInfo = async () => {
    let collectionName = userItemMenu;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.post('/api/userApi', {
        id: userId,
        collectionName,
        action: 'get',
        data: ''
      }, config);

      const { status, actionResponse } = response.data;
      if (status === 'success') {
        setUserInfo(actionResponse);
      }
    }
    catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  useEffect(() => {
    getUserInfo();
  },[userItemMenu]);


  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <ul className='w-full p-2 lg:p-8 flex flex-wrap transition-all'>
        {
          userInfo?.map((element: any, index: any) => {
            return (
              <li
                key={element._id}
                className={`${screenNarrow? 'w-full': 'w-1/3'} px-5 py-2 flex flex-col transform transition-all border border-red-500`}>
                <ItemContent element={element as any} />
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};