import { useAuthUI, useAuthData, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import { IconDelete } from '@/icons/icons';
import ImageIconUser from './ImageIconUser';

interface NotificationCardParams {
  data: { [key: string]: string },
  indexCard: number,
  listHover: boolean,
  itemHover: null,
  isDashboard: boolean,
};

interface DataUser {
  user_id: string,
  user_name: string,
  user_image_url: string
}



export default function NotificationsCard({ data, indexCard, listHover, itemHover, isDashboard }: NotificationCardParams) {
  const { setMessageModal } = useUI();
  const { token, userId, update, setUpdate } = useAuthData();
  const { accountModule, setAccountModule, setChatActived, setChatDataUser } = useAuthUI();

  const buttonNotificationDelete = [
    {
      id: 'delete-item-notification',
      icon: <IconDelete />,
      click: (elementId: string, sectionValue: string) => {
        setMessageModal([{
          type: 'delete',
          text: `Delete this notification with this action`,
          click: () => {
            let collectionName = sectionValue;
            let itemIdToChange: string = elementId;
            userDataHandlerFunction({
              token: token as string,
              userId: collectionName === 'personal_info' ? userId as string : itemIdToChange,
              action: 'delete',
              collectionName: collectionName,
              data: '',
              onSuccess: (status: string) => {
                status === 'success' &&
                  setTimeout(() => {
                    setUpdate(sectionValue);
                    setMessageModal([{
                      type: 'successful',
                      text: `This notification has been deleted`,
                      click: () => setMessageModal([])
                    }])
                  }, 500);
              },
              onError: (error: any) => console.error(error)
            });
            setMessageModal([])
          }
        }]);
      }
    },
  ];

  let notificacionUserImageUrl: string = data?.user_image_url || '';
  let companyInfo: string = data?.company_name || '';
  let jobLocation: string = data?.job_location || '';
  let companyJobTitle: string = data?.job_description || '';
  let candidateLocation: string = data?.candidate_location || '';
  let candidateTalentCategory: string = data?.candidate_talent_category || '';

  const notificationType: any = data?.notification_type;

  const message: any = () => {
    let message: string;
    switch (notificationType) {
      case 'request contact':
        if (isDashboard) {
          message = `from ${companyInfo} (${jobLocation}), wants to contact you...`
        }
        else {
          message = `from ${companyInfo} (${jobLocation}), wants to contact you about a job opportunity: ${companyJobTitle}. Accepts your contact request to connect with him/her, coordinate any interview or discuss contract terms...`
        }
        return message
      case 'request accepted':
        if (isDashboard) {
          message = `from ${candidateLocation}, accepted your contact request to work like ${candidateTalentCategory}...`
        }
        else {
          message = `from ${candidateLocation}, accepted your contact request to work like ${candidateTalentCategory}. Connect whit him/her to coordinate any interviews or discuss contract terms...`
        }
        return message
      default:
        break;
    }
  };

  const goToClick: any = () => {
    switch (accountModule) {
      case 'Dashboard':
        setAccountModule('Notifications')
        break;
      case 'Notifications':
        if (notificationType === 'request contact') {
          setAccountModule('Job');
        }
        else if (notificationType === 'request accepted') {
          setAccountModule('Connections');
        }
        break;
      default:
        break;
    }
  };

  const buttonText = notificationType === 'request contact' ? 'Review'
    : notificationType === 'request accepted' && 'Chat';


  return (
    <div
      className="w-full h-full relative flex flex-row"
      onClick={() => isDashboard && goToClick()}
    >
      {/**edit delete buttons */}
      <div className="w-full absolute top-0 right-0 flex flex-row justify-end items-center transition-all z-20">

        {
          //!isDashboard && listHover && (itemHover === indexCard) && (
          //buttonNotificationDelete.map((button: any) => {
          //return (
          //<EditDeleteButtons
          //id={button.id}
          //icon={button.icon}
          //elementId={data?._id}
          //collection='notifications'
          //handleClick={button.click}
          ///>
          //)
          //})
          //)
        }

      </div>
      {/**fullname, message, date ... */}
      <div className="w-full pr-2 flex flex-col hover:cursor-pointer"
        onClick={() => goToClick()}
      >
        <h5 className='w-full text-color-text-dark text-xs text-justify'>
          <a className='text-color-primary-clear font-semibold'>
            {`${data?.full_name} `}
          </a>
          {message()}
        </h5>
        <h6 className='w-full text-color-text-medium text-[10px] text-end'>
          {data?.created_date}
        </h6>
      </div>
      {/**user profile image and buttons */}
      <div className={`${isDashboard ? 'w-9' : 'w-16'} h-full flex flex-col justify-between items-center`}>
        <div className={`${isDashboard ? 'w-9 h-9 items-end' : 'w-16 h-16 items-center justify-center'} my-1 flex flex-col`}>
          <ImageIconUser
            type={'notifications'}
            otherUserImageUrl={notificacionUserImageUrl as string}
          />
        </div>
      </div>
    </div>
  )
}  