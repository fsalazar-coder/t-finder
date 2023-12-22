import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import SectionTitles from '../components/SectionTitles';
import NotificationsCardsDisplayer from './NotificationsCardsDisplayer';
import axios from 'axios';


export default function Notifications(props: any) {
  const { token, userId, update, setUpdate } = useAuthData();
  const { accountModule, setAccountModule } = useAuthUI();
  const { screenNarrow, setMessageModal } = useUI();
  const [cardHover, setCardHover] = useState(false);
  const [notificationsData, setNotificationsData] = useState([]);
  const [notifications, setNotifications] = useState([]);



  useEffect(() => {
    if (accountModule === 'Dashboard' || accountModule === 'Notifications') {
      const handleNotifications = async () => {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        try {
          const response = await axios.post('/api/userDataApi', {
            id: userId,
            collectionName: 'notifications',
            action: 'get-notifications',
            data: ''
          }, config);

          const { status, notificationsResponse } = response.data;
          if (status === 'success') {
            setNotificationsData(notificationsResponse);
          }
        }
        catch {
          (error: any) => console.log(error)
        }
      };

      handleNotifications()
    }
  }, [token, userId, accountModule]);


  useEffect(() => {
    if (accountModule === 'Dashboard' || accountModule === 'Notifications') {
      const fetchNotifications = async () => {
        const notificationsPromises = notificationsData.map(async (notification: any) => {
          try {
            const profileImageResponse: any = await new Promise((resolve, reject) => {
              userDataHandlerFunction({
                token: token as string,
                userId: notification.from_user_id as string,
                action: 'get',
                collectionName: 'profile_image',
                data: '',
                onSuccess: resolve,
                onError: reject
              });
            });

            const personalInfoResponse: any = await new Promise((resolve, reject) => {
              userDataHandlerFunction({
                token: token as string,
                userId: notification.from_user_id as string,
                action: 'get',
                collectionName: 'personal_info',
                data: '',
                onSuccess: resolve,
                onError: reject
              });
            });

            return {
              _id: notification._id,
              notification_type: notification.notification_type,
              profile_image: profileImageResponse.image_url,
              full_name: personalInfoResponse.full_name,
              message: notification.message,
              created_date: notification.created_at
            };
          }
          catch (error) {
            console.error('Error fetching data for notification:', notification._id, error);
            return null;
          }
        });

        const newNotifications: any = await Promise.all(notificationsPromises);
        //console.log('New notifications: ', newNotifications)
        setNotifications(newNotifications)
      };

      fetchNotifications();
    }
  }, [token, userId, accountModule, notificationsData]);

  const isDashboard = accountModule === 'Dashboard';


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
          } w-full px-5 py-1 flex justify-between flex-row items-center border-color-border-clear`
        }>
          <div className='w-fit flex flex-row'>
            <SectionTitles
              sectionTitle={`Notifications`}
              sectionType='account'
            />
          </div>
        </div>
        <NotificationsCardsDisplayer
          dataToRender={notifications}
          goClick={(goClickValue: string) => {
            setAccountModule(goClickValue)
          }}
        />
      </div>
    </div>
  )
}  