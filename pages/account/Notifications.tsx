import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import NotificationsCardsDisplayer from './NotificationsCardsDisplayer';
import SectionTitles from '../components/SectionTitles';



export default function Notifications() {
  const { token, userId, update, setUpdate, socket } = useAuthData();
  const { accountModule } = useAuthUI();
  const { screenNarrow } = useUI();
  const [cardHover, setCardHover] = useState(false);
  const [notificationsData, setNotificationsData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    if (accountModule === 'Dashboard' || accountModule === 'Notifications' || update === 'notifications') {
      userDataHandlerFunction({
        token: token as string,
        userId: userId as string,
        action: 'get',
        collectionName: 'notifications',
        data: '',
        onSuccess: (responseData: any) => setNotificationsData(responseData),
        onError: (error: any) => console.error(error)
      });
      if (update === 'notifications') {
        setUpdate('');
      }
    };
  }, [token, userId, accountModule, update]);

  useEffect(() => {
    if (accountModule === 'Dashboard' || accountModule === 'Notifications') {
      const fetchNotifications = async () => {
        const notificationsPromises = notificationsData.map(async (notification: any) => {
          try {
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

            let requestCollectionName = notification?.notification_type === 'request contact' ?
              'request_talent' : notification?.notification_type === 'offer acceptance' && 'request_job';

            let notificationFromRequestId: string = notification.from_request_id;

            const requestInfoResponse: any = await new Promise((resolve, reject) => {
              userDataHandlerFunction({
                token: token as string,
                userId: notification.from_user_id as string,
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
              user_id: personalInfoResponse._id,
              full_name: personalInfoResponse.full_name,
              company_info: requestInfoResponse.company_info,
              company_location: requestInfoResponse.location,
              company_job_title: requestInfoResponse.job_title,
              candidate_location: requestInfoResponse.location,
              candidate_talent_category: requestInfoResponse.talent_category
            };

            return notificationInfo
          }
          catch (error) {
            console.error('Error fetching data for notification:', notification._id, error);
            return null;
          }
        });

        const newNotifications: any = await Promise.all(notificationsPromises);
        setNotifications(newNotifications)
      };

      fetchNotifications();
    }
  }, [token, userId, accountModule, notificationsData]);

  //webSockets to update notifications
  useEffect(() => {
    socket?.on('notificacion', (data: any) => {
      const { toUserId, message } = data;
      if (toUserId === userId) {
        if (message === 'notification update') {
          if (update) {
            setTimeout(() => {
              setUpdate('notifications')
            }, 250);
          };
        }
        else { console.log('Data webSocket value: ', data) }
      }
    });
  }, []);

  const isDashboard = accountModule === 'Dashboard';


  return (
    <div className={`${!isDashboard && 'pl-0 lg:pl-60'} w-full h-full flex flex-col items-center`}>
      <div className={
        `${isDashboard ? 'w-full h-full flex-col bg-white border border-color-border shadow-md rounded-lg'
          : screenNarrow ? 'w-full flex-col px-1 py-16' : 'w-[35rem] px-2 lg:px-8 lg:py-9 flex-col'                   //w-[52rem] (ancho normal para todas las cards)
        } flex justify-between transition-all`
      }
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        {/**title */}
        <div className={
          `${isDashboard ? 'border-b' : 'bg-white border shadow-md rounded-lg'
          } w-full px-5 py-1 flex justify-between flex-row items-center border-color-border`
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
        <NotificationsCardsDisplayer dataToRender={notifications} />
      </div>
    </div>
  )
}  