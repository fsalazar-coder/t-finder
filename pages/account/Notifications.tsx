import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import NotificationsCardsDisplayer from './NotificationsCardsDisplayer';
import SectionTitles from '../components/SectionTitles';



export default function Notifications() {
  const { screenNarrow } = useUI();
  const { accountModule } = useAuthUI();
  const { token, userId, userNotificationsData, setUserNotificationsData, update, setUpdate, updateCounter, setUpdateCounter, socket } = useAuthData();
  const [cardHover, setCardHover] = useState(false);

  const fetchNotificationsAllInfo = async (notifications: any) => {
    const notificationsPromises = notifications.map(async (notification: any) => {
      let notificationFromRequestId: string = notification.from_request_id;
      let notificationFromUserId: string = notification.from_user_id;
      let requestCollectionName: any = notification?.notification_type === 'request contact' ?
        'request_talent' : notification?.notification_type === 'request accepted' && 'request_job';

      try {
        const notificationUserImageResponse: any = await new Promise((resolve, reject) => {
          userDataHandlerFunction({
            token: token as string,
            userId: notificationFromUserId,
            action: 'get',
            collectionName: 'profile_image',
            data: '',
            onSuccess: resolve,
            onError: reject
          });
        });
        const notificationPersonalInfoResponse: any = await new Promise((resolve, reject) => {
          userDataHandlerFunction({
            token: token as string,
            userId: notificationFromUserId,
            action: 'get',
            collectionName: 'personal_info',
            data: '',
            onSuccess: resolve,
            onError: reject
          });
        });
        const notificationRequestInfoResponse: any = await new Promise((resolve, reject) => {
          userDataHandlerFunction({
            token: token as string,
            userId: notificationFromUserId,
            action: 'get-one-request',
            collectionName: requestCollectionName as string,
            data: notificationFromRequestId,
            onSuccess: resolve,
            onError: reject
          });
        });

        let notificationInfo = {
          _id: notification._id,
          created_date: notification.created_at,
          notification_type: notification.notification_type,
          user_id: notificationPersonalInfoResponse[0]._id,
          full_name: notificationPersonalInfoResponse[0].full_name,
          user_image_url: notificationUserImageResponse.image_url,
          company_name: notificationRequestInfoResponse.company_name,
          job_location: notificationRequestInfoResponse.location,
          job_description: notificationRequestInfoResponse.job_description,
          candidate_location: notificationRequestInfoResponse.location,
          candidate_talent_category: notificationRequestInfoResponse.talent_category
        };

        return notificationInfo
      }
      catch (error) {
        console.error('Error fetching data for notification:', notification._id, error);
        return null;
      }
    });
    const notificationsAllInfo: any = await Promise.all(notificationsPromises);
    setUserNotificationsData(notificationsAllInfo)
  };

  // get notifications
  useEffect(() => {
    if (token && userId && (update === 'all' || update === 'notifications' || accountModule === 'Dashboard' || accountModule === 'Notifications')) {
      setUpdateCounter((counter) => counter + 1);
      const fetchNotifications = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get',
          collectionName: 'notifications',
          data: '',
          onSuccess: (responseData: any) => {
            fetchNotificationsAllInfo(responseData);
          },
          onError: (error: any) => console.error(error)
        });
      }
      fetchNotifications().then(() => {
        setUpdateCounter((counter) => counter - 1);
        if ((update === 'all' && updateCounter === 0) || update === 'notifications') {
          setUpdate('');
        }
      })
    };
  }, [token, userId, update]);

  //webSockets to active update notifications  
  useEffect(() => {
    socket?.on('notificacion', (data: SocketsNotifications) => {
      const { to_user_id, update_socket } = data;
      if (to_user_id === userId) {
        update_socket === 'notifications' && setUpdate('notifications');
      }
    });
  }, [])

  const isDashboard = accountModule === 'Dashboard';
  const isNotifications = accountModule === 'Notifications';


  return (
    <div className={`${!isDashboard && 'pl-0 lg:pl-60'} w-full h-full flex flex-col items-center`}>
      <div className={
        `${isDashboard ? 'w-full h-full flex-col bg-white border border-color-border shadow-md rounded-lg'
          : screenNarrow ? 'w-full flex-col px-5 py-16' : 'w-[35rem] px-2 lg:px-8 lg:py-9 flex-col'                   //w-[52rem] (ancho normal para todas las cards)
        } flex justify-between transition-all`
      }
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        {/**title */}
        <div className={
          `${isDashboard ? ' px-5 border-b' : ''     // bg-white border shadow-md rounded-lg
          } w-full py-1 flex justify-between flex-row items-center border-color-border`
        }>
          <div className='w-full flex flex-row justify-between items-center'>
            <div className='w-2/3 flex flex-row items-center'>
              <SectionTitles
                sectionTitle={`Notifications`}
                sectionType='account'
              />
            </div>
          </div>
        </div>
        <NotificationsCardsDisplayer notificationsToRender={userNotificationsData} />
      </div>
    </div>
  )
}  