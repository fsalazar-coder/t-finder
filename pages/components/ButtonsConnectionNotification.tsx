import { useUI } from '@/context/ContextUI';
import { useAuthSocket } from '@/context/ContextAuthSocket';
import { IconBxsBellRing, IconMessageNotification } from '@/icons/icons';
import IconUnread from '../account/IconUnread';

interface NavbarElementsProps {
  navbarAccountElements: NavbarElement[];
};

interface NavbarElement {
  title: string;
  clickGoTo: string;
  icon: JSX.Element;
}


export default function ButtonsConnectionNotification({ shouldRender }: any) {
  const { unreadMessages, unreadNotifications } = useAuthSocket();
  const { setAccountActived, setAccountModule, screenNarrow, setDropdownAuth } = useUI();
  const connectionNotificationElements = [
    { title: 'Connections', clickGoTo: 'Connections', icon: <IconMessageNotification /> },
    { title: 'Notifications', clickGoTo: 'Notifications', icon: <IconBxsBellRing /> },
  ];

  const getIconUnread = (type: string) => {
    switch (type) {
      case 'Connections':
        return <IconUnread value={unreadMessages} />
      case 'Notifications':
        return <IconUnread value={unreadNotifications} />
      default:
        break;
    }
  }

  return (
    shouldRender &&
    <div className={`${screenNarrow ? 'w-full' : ''} h-full flex flex-row justify-end items-center`}>
      <nav className='w-fit h-full px-3 flex flex-row items-center'>
        {
          connectionNotificationElements?.map(({ title, clickGoTo, icon }: any, index: any) => {
            return (
              <li key={index} className={
                `${'text-color-secondary-clear lg:text-color-secondary lg:hover:text-color-secondary-clear lg:cursor-pointer'
                } w-full h-[3.75rem] px-3 flex flex-col justify-center items-center transition-all z-[70]`
              }
                onClick={() => {
                  setAccountActived(true);
                  setAccountModule(clickGoTo);
                  setDropdownAuth(false)
                }}
              >
                <div className='flex relative'>
                  <i className={`w-fit h-fit text-[1.35rem] lg:text-2xl flex flex-col justify-center items-center`}>
                    {icon}
                  </i>
                  {getIconUnread(title)}
                </div>
              </li>
            )
          })
        }
      </nav>
    </div>
  )
};

