import { useUI } from "@/context/ContextUI";
import { useAuthData } from "@/context/ContextAuthData";
import ImageIconUser from './ImageIconUser';

interface Notification {
  full_name: string;
  created_date: string;
  notification_type: 'request-contact' | 'request-accepted';
  company_name?: string;
  job_location?: string;
  job_description?: string;
  candidate_location?: string;
  candidate_talent_category?: string;
  to_request_id: string;
  user_image_url?: string;
  notification_status: 'read' | 'unread';
}

interface NotificationCardProps {
  data: Notification;
}



export default function NotificationsCard({ data }: NotificationCardProps) {
  const { accountModule, setAccountModule } = useUI();
  const { setGoto, setGotoCounter } = useAuthData();
  const isDashboard: boolean = accountModule === 'Dashboard';
  const notificationStatus: any = data?.notification_status;
  const notificationType: any = data?.notification_type;

  const message = {
    'request-contact': `from ${data?.company_name} (${data?.job_location}), wants to contact you${isDashboard ? "..." : ` about a job opportunity: ${data?.job_description}. Accepts your contact request to connect with him/her, coordinate any interview or discuss contract terms...`}`,
    'request-accepted': `from ${data?.candidate_location} ${isDashboard ? "has accepted your contact request to work like" : "accepted your contact request to work like"} ${data?.candidate_talent_category}...`,
  }[data?.notification_type];


  const titleCard = () => {
    switch (accountModule) {
      case 'Dashboard':
        return 'notifications details'
      case 'Notifications':
        if (notificationType === 'request-contact' && (notificationStatus === 'read' || notificationStatus === 'unread')) {
          return 'request & acceptance'
        } else {
          return 'connections'
        };
      default:
        return 'connections'
    }
  }

  const handleCardClick = () => {
    switch (accountModule) {
      case 'Notifications':
        if (notificationType === 'request-contact' && (notificationStatus === 'read' || notificationStatus === 'unread')) {
          setGotoCounter(0);
          setGoto({ account: 'Job', menu: 'requests', requestId: data?.to_request_id })
        } else {
          setAccountModule('Connections')
        };
        break;
      default:
        setAccountModule('Notifications');
        break;
    }
  };


  return (
    <div
      className="w-full h-full relative flex flex-row"
      title={`Click to go to ${titleCard()}`}
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
    >
      {/**fullname, message, date ... */}
      <div className="w-full pr-2 flex flex-col justify-center hover:cursor-pointer">
        <h5 className='w-full text-color-text-dark text-xs text-justify'>
          <a className='text-color-primary-clear font-semibold'> {`${data?.full_name} `} </a>
          {message}
        </h5>
        <h6 className='w-full text-color-text-medium text-[10px] text-end'>{data?.created_date}</h6>
      </div>
      {/**user profile image and buttons */}
      <div className={`${isDashboard ? 'w-9' : 'w-16'} h-full flex flex-col justify-between items-center`}>
        <div className={`${isDashboard ? 'w-9 h-9 items-end' : 'w-16 h-16 items-center justify-center'} flex flex-col`}>
          <ImageIconUser
            type={'notifications'}
            otherUserImageUrl={data?.user_image_url as string}
          />
        </div>
      </div>
    </div>
  )
}  