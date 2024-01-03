import { useState, useEffect } from 'react';
import { useAuthUI, useAuthData, useUI } from "../../context/authContext";
import { IconUser, IconDelete } from '@/icons/icons';
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import EditDeleteButtons from './EditDeleteButtons';
import Image from 'next/image';

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
  user_image: string
}



export default function NotificationsCard({ data, indexCard, listHover, itemHover, isDashboard }: NotificationCardParams) {
  const { token, userId, setCollectionToChange, setItemIdToChange, setUpdate } = useAuthData();
  const { accountModule, setAccountModule, setChatActived, setChatDataUser } = useAuthUI();
  const { screenNarrow, setMessageModal } = useUI();

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

  let companyInfo = data?.company_info || '';
  let companyLocation = data?.company_location || '';
  let companyJobTitle = data?.company_job_title || '';
  let candidateLocation = data?.candidate_location || '';
  let candidateTalentCategory = data?.candidate_talent_category || '';

  const notificationType: string = data?.notification_type;
  const message = notificationType === 'request contact' ?
    `from ${companyInfo} (${companyLocation}), wants to contact you about a job opportunity: ${companyJobTitle}. Reviews your offer and accepts your request to contact you to initiate a chat, to coordinate an interview or to discuss the terms of a contract...`
    : notificationType === 'offer acceptance' && `from ${candidateLocation} has accepted your contact request to work like ${candidateTalentCategory}. Initiate a chat to coordinate interviews or discuss contract terms...`;

  const goToClick: any = () => {
    if (notificationType === 'request contact') {
      setAccountModule('Job');
    }
    else if (notificationType === 'offer acceptance') {
      let dataUser: DataUser = {
        user_id: data?.user_id,
        user_name: data?.full_name,
        user_image: data?.profile_image
      };
      setChatDataUser(dataUser);
      setChatActived(true);
    }
  }

  const buttonText = notificationType === 'request contact' ? 'Review'
    : notificationType === 'offer acceptance' && 'Chat';


  return (
    <div
      className="w-full h-full relative flex flex-row"
      onClick={() => isDashboard && goToClick()}
    >
      {/**edit delete buttons */}
      <div className="w-full absolute top-0 right-0 flex flex-row justify-end items-center transition-all z-20">
        {
          !isDashboard && listHover && (itemHover === indexCard) && (
            buttonNotificationDelete.map((button: any) => {
              return (
                <EditDeleteButtons
                  id={button.id}
                  key={button.key}
                  icon={button.icon}
                  elementId={data?._id}
                  collection='notifications'
                  handleClick={button.click}
                />
              )
            })
          )
        }
      </div>
      {/**fullname, message, date ... */}
      <div className="w-full pr-2 flex flex-col">
        <h5 className='w-full text-color-text-dark text-xs text-justify'>
          <a className='text-color-primary-clear font-semibold'>
            {`${data?.full_name}, `}
          </a>
          {message}
        </h5>
        <h6 className='w-full text-color-text-medium text-[10px] text-end'>
          {data?.created_date}
        </h6>
      </div>
      {/**user profile image and button */}
      <div className={`${isDashboard ? 'w-14' : 'w-32'} h-full flex flex-col justify-between items-center`}>
        <div className={
          `${isDashboard ? 'items-end' : 'items-center justify-center'} w-full my-1 flex flex-col`}>
          {
            data?.profile_image ?
              <Image
                className={`${isDashboard ? 'w-10 h-10' : 'w-20 h-20 mb-1'} flex flex-col justify-center items-center rounded-full`}
                width={400}
                height={400}
                src={data?.profile_image}
                alt='user-image'
              />
              :
              <i className={
                `${isDashboard ? 'w-10 h-10 text-2xl' : 'w-20 h-20 mb-1 text-4xl'
                } text-color-text-almost-clear font-light flex flex-row justify-center items-center border border-color-border rounded-full transition-all`
              }>
                <IconUser />
              </i>
          }
        </div>
        {
          !isDashboard &&
          <div className={`w-full flex flex-row justify-center z-40`}>
            <button
              id='button-go-to'
              className={
                `${'hover:font-bold bg-green-400 hover:bg-green-500 bg-opacity-40 hover:bg-opacity-100'
                } w-full px-4 py-[6px] flex flex-row justify-center items-center rounded-lg font-semibold transition-all`}
              onClick={() => goToClick()}
            >
              <h4 className="h-4 text-white text-[14px] flex flex-row items-center">
                {buttonText}
              </h4>
            </button>
          </div>
        }
      </div>
    </div>
  )
}  