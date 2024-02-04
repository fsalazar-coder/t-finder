import { useState, useEffect } from 'react';
import { useUI } from "@/context/ContextUI";
import { useAuthSocket } from '@/context/ContextAuthSocket';
import NotificationsCardsDisplayer from './NotificationsCardsDisplayer';
import SectionTitles from '../components/SectionTitles';

interface UserNotificationsData {
  _id: string,
  created_date: string,
  notification_type: string,
  user_id: string,
  full_name: string,
  user_image_url: string,
  company_name: string,
  job_location: string,
  job_description: string,
  candidate_location: string,
  candidate_talent_category: string,
  notification_status: string
}


export default function Notifications() {
  const { screenNarrow, accountModule } = useUI();
  const { userNotificationsData } = useAuthSocket();
  const [cardHover, setCardHover] = useState(false);
  const [notificationsToRender, setNotificationsToRender] = useState<UserNotificationsData[]>([]);
  const isDashboard = accountModule === 'Dashboard';
  const isNotifications = accountModule === 'Notifications';

  useEffect(() => {
    if (isDashboard || isNotifications) {
      let notificationsSelected: any;
      switch (accountModule) {
        case 'Dashboard':
          notificationsSelected = userNotificationsData.filter(notification => notification.notification_status === 'unread');
          break;
        case 'Notifications':
          notificationsSelected = userNotificationsData;
          break;
        default:
          notificationsSelected = []; // or some default value
          break;
      }
      setNotificationsToRender(notificationsSelected);
    }
  }, [accountModule, userNotificationsData, isDashboard, isNotifications]);

  const containerClassNames = `${isDashboard ? 'w-full h-full flex-col bg-white border border-color-border shadow-md rounded-lg'
    : screenNarrow ? 'w-full flex-col px-5 py-16' : 'w-[52rem] px-2 lg:px-8 lg:py-9 flex-col'
    } flex justify-between transition-all`;


  return (
    <div className={`w-full h-full flex flex-col items-center`}>
      <div className={containerClassNames}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        {/**title */}
        <div className={
          `${isDashboard && 'px-5 pb-4 border-b'     // or bg-white border shadow-md rounded-lg
          } w-full py-1 flex justify-between flex-row items-center border-color-border`
        }>
          <div className='w-full flex flex-row justify-between items-center'>
            <div className='w-full flex flex-row items-center'>
              <SectionTitles
                sectionTitle='Notifications'
                sectionType='account'
              />
            </div>
          </div>
        </div>
        <NotificationsCardsDisplayer notificationsToRender={notificationsToRender} />
      </div>
    </div>
  )
}  