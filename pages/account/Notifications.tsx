import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import NotificationsCardsDisplayer from './NotificationsCardsDisplayer';
import SectionTitles from '../components/SectionTitles';
import { IconBxChevronLeft } from '@/icons/icons';



export default function Notifications() {
  const { token, userId, update, setUpdate } = useAuthData();
  const { accountModule, setAccountModule } = useAuthUI();
  const { screenNarrow, setMessageModal } = useUI();
  const [cardHover, setCardHover] = useState(false);
  const [notificationsData, setNotificationsData] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (accountModule === 'Dashboard' || accountModule === 'Notifications') {
      userDataHandlerFunction({
        token: token as string,
        userId: userId as string,
        action: 'get',
        collectionName: 'notifications',
        data: '',
        onSuccess: (responseData: any) => setNotificationsData(responseData),
        onError: (error: any) => console.error(error)
      });
    };
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
              profile_image: profileImageResponse.image_url,
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
          <div className='w-full flex flex-row justify-between items-center'>
            <div className='w-2/3 flex flex-row items-center'>
              <SectionTitles
                sectionTitle={`Notifications`}
                sectionType='account'
              />
            </div>
          </div>
        </div>
        <NotificationsCardsDisplayer
          dataToRender={notifications}
        />
      </div>
    </div >
  )
}  