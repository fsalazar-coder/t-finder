import { useState, useEffect } from "react";
import { useAuthUI } from "../../context/authContext";
import NotificationCard from "./NotificationCard";

interface NotificationsCardsDisplayerParams {
  dataToRender: string[],
}



export default function NotificationsCardsDisplayer({ dataToRender }: NotificationsCardsDisplayerParams) {

  const { accountModule, setAccountModule } = useAuthUI();
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);

  const isDashboard = accountModule === 'Dashboard';

  useEffect(() => {
    if (accountModule === 'Dashboard' || accountModule === 'Notifications') {
      //console.log('Data to render: ', dataToRender)
    }
  }, [accountModule]);


  return (
    <div
      id='card-notifications'
      className={`${!isDashboard && 'my-1'} w-full h-full flex`}>
      <div
        className="w-full h-full flex"
        onMouseEnter={() => setListHover(true)}
        onMouseLeave={() => setListHover(false)}
      >
        <ul className='w-full h-full flex flex-col'>
          {
            dataToRender?.map((element: any, index: any) => {
              let notificationType = element?.notification_type || '';
              let goToAccountModule = notificationType === 'request contact' ? 'Job' : notificationType === 'offer acceptance' ? 'Talent' : '';
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
                    `${(isDashboard && evenIndex) ? 'bg-slate-50 rounded-md'
                      : !isDashboard && 'bg-color-clear border border-color-border-clear shadow-md rounded-lg'
                    } w-full px-4 py-3 flex flex-col transform transition-all`
                  }>
                    <NotificationCard
                      data={element}
                      indexCard={index}
                      listHover={listHover}
                      itemHover={itemHover}
                      isDashboard={isDashboard}
                    />
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
};