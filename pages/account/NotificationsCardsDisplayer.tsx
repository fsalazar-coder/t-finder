import { useState, useEffect } from "react";
import { useUI } from "@/context/ContextUI";
import NotificationCard from "./NotificationCard";



export default function NotificationsCardsDisplayer({ notificationsToRender }: any) {
  const { accountModule } = useUI();
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);
  const isDashboard = accountModule === 'Dashboard';
  const shouldRenderNotifications = notificationsToRender.length > 0;

  return (
    <div
      id='card-notifications'
      className={`${!isDashboard && 'my-1'} w-full h-full flex`}>
      {
        shouldRenderNotifications ?
          <div
            className={`${isDashboard && 'overflow-y-auto'} w-full h-full flex`}
            onMouseEnter={() => setListHover(true)}
            onMouseLeave={() => setListHover(false)}
          >
            <ul className={`${isDashboard && 'overflow-y-auto'} w-full h-full flex flex-col`}>
              {
                notificationsToRender?.map((notificacion: any, index: any) => {
                  let evenIndex = index % 2 === 0;
                  return (
                    <li key={index}
                      className={
                        `${listHover && (itemHover === index ? '' : 'opacity-25')}
                        ${isDashboard ? 'p-1 hover:cursor-pointer' : 'py-1'} w-full relative flex flex-col transform transition-all`
                      }
                      onMouseEnter={() => { setItemHover(index); setListHover(true); }}
                      onMouseLeave={() => { setItemHover(null); setListHover(false); }}
                    >
                      <div className={
                        `${(isDashboard && evenIndex) ? 'bg-color-clear rounded-md'
                          : !isDashboard && 'bg-white border border-color-border shadow-md rounded-lg'
                        } w-full px-4 py-3 flex flex-col transform transition-all`
                      }>
                        <NotificationCard data={notificacion} />
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          :
          <div className={`${!isDashboard && 'mt-1 bg-white border border-color-border shadow-md rounded-lg transform transition-all'} w-full px-5 py-5 flex flex-col transition-all`}>
            <h2 className='w-fit text-color-text-medium'>
              {`You do not have ${isDashboard ? 'unread notifications' : 'any notification'}`}
            </h2>
          </div>
      }
    </div>
  )
};