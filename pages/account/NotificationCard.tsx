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
  goClickValue: string,
}



export default function NotificationsCard({ data, indexCard, listHover, itemHover, isDashboard, goClickValue }: NotificationCardParams) {
  const { token, userId, setCollectionToChange, setItemIdToChange, setUpdate } = useAuthData();
  const { setRequestModal, setRequestModalAction, accountModule, setAccountModule } = useAuthUI();
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

  const message = data?.notification_type === 'request contact' ?
    'wants to contact you about a job, accept his invitation and start chatting.'
    : data?.notification_type === 'offer acceptance' && 'has accepted your request to meet to discuss your job offer.'


  return (
    <div
      className="w-full h-full relative flex flex-row"
      onClick={() => isDashboard && setAccountModule('Notifications')}
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
      {/**fullname, message, date and button */}
      <div className="w-full pr-2 flex flex-col justify-between">
        <h5 className='w-full text-color-text-secondary text-xs text-justify'>
          <a className='text-color-primary-clear font-semibold'>
            {`${data?.full_name}, `}
          </a>
          {message}
        </h5>
        <h6 className='w-full text-color-text-secondary text-[10px] text-end'>
          {data?.created_date}
        </h6>
      </div>
      {/**user profile image */}
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
                } text-color-text-tertiary font-light flex flex-row justify-center items-center border border-color-border-clear rounded-full transition-all`
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
              disabled={false}
              onClick={() => setAccountModule(goClickValue)}
            >
              <h4 className="h-4 text-color-text-clear text-[14px] flex flex-row items-center">
                review
              </h4>
            </button>
          </div>
        }
      </div>
    </div>
  )
}  