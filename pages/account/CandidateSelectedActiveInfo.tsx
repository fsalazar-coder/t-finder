import { useState, useEffect } from 'react';
import { useAuthData, useUI } from "../../context/authContext";
import CardsItems from './CardsItems';
import axios from 'axios';


interface UserInfoActive {
  userId: string,
  itemReviewMenu: string
}


export default function CandidateSelectedActiveInfo({userId, itemReviewMenu}: UserInfoActive) {

  const { token } = useAuthData();
  const { screenNarrow } = useUI();
  const [userInfo, setUserInfo] = useState([]);

  const getUserInfo = async () => {
    let collectionName = itemReviewMenu;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.post('/api/userDataApi', {
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
  },[itemReviewMenu, userId]);


  return (
    <div className='w-full flex flex-col'>
      <ul className='w-full p-2 lg:p-8 flex flex-col transition-all'>
        {
          userInfo?.map((element: any, index: any) => {
            return (
              <li
                key={element._id}
                className={
                  `${screenNarrow? 'w-full': 'w-full'} 
                  border-b px-5 py-2 flex flex-col border-color-border transform transition-all`}>
                <CardsItems element={element as any} />
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};