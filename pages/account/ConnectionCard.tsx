import { useAuthSocket } from "@/context/ContextAuthSocket";
import ImageIconUser from "./ImageIconUser";
import { IconMessageNotification } from "@/icons/icons";

interface ConnectionCardParams {
  data: any,
  unreadMessagesToConnectedUser: number
}

interface ChatDataUser {
  user_id: string,
  user_name: string,
  user_image_url: string
}


export default function ConnectionCard({ data, unreadMessagesToConnectedUser }: ConnectionCardParams) {
  const { chatActived, setChatActived, setChatDataUser } = useAuthSocket();

  const chatsHandle = () => {
    const dataUser: ChatDataUser = {
      user_id: data?.user_id,
      user_name: data?.full_name,
      user_image_url: data?.user_image_url
    };

    if (chatActived) {
      setChatDataUser({});
      setChatActived(false);
      const timeoutId = setTimeout(() => {
        setChatDataUser(dataUser);
        setChatActived(true);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
    else {
      setChatDataUser(dataUser);
      setChatActived(true);
    }
  };


  return (
    <div className={`w-full h-[400px] px-5 py-2 flex flex-col bg-white border-2 border-transparent md:hover:border-color-highlighted-clear shadow-outner md:hover:shadow-none rounded-lg transform transition-all`}>
      <div className={`w-full h-full flex flex-col`}>
        <div className={`flex-col justify-between w-full h-full flex`}>
          <div className={`flex-col w-full flex`}>
            {
              // user profile image
              <div className={`w-full border-b py-2 flex flex-row justify-center items-center border-color-border`}>
                <div className="w-24 h-24 relative flex flex-col justify-center items-center">
                  <ImageIconUser
                    type={'request'}
                    otherUserImageUrl={data?.user_image_url as string}
                  />
                  {
                    unreadMessagesToConnectedUser > 0 &&
                    <div className="w-fit h-fit absolute right-0 bottom-2 flex flex-col justify-center items-center">
                      <div className="w-6 h-6 relative flex flex-row justify-center items-center bg-color-notification-alert rounded-full">
                        <i className="absolute top-[3px] flex text-white text-xl stroke-1 stroke-white z-0">
                          <IconMessageNotification />
                        </i>
                        <h6 className="w-fit h-fit pb-[2px] flex text-color-notification-alert text-[10px] font-bold text-center z-10">
                          {unreadMessagesToConnectedUser < 10 ? unreadMessagesToConnectedUser : '+9'}
                        </h6>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
            <ul className={`w-full flex-col py-2 flex`}>
              <li className={`w-full pb-2 flex flex-col`}>
                <h4 className='w-full text-color-text-dark text-sm font-bold'>
                  {data?.full_name}
                </h4>
              </li>
              <li className={`w-full pb-2 flex flex-col`}>
                <h4 className='w-full text-color-text-dark text-sm'>
                  {data?.profession_occupation}
                </h4>
                <h5 className='w-full text-color-text-almost-clear text-xs'>
                  Profession or occupation
                </h5>
              </li>
              <li className={`w-full pb-2 flex flex-col`}>
                <h4 className='w-full text-color-text-dark text-sm'>
                  {data?.preferred_language}
                </h4>
                <h5 className='w-full text-color-text-almost-clear text-xs'>
                  Preferred language
                </h5>
              </li>
              <li className={`w-full pb-2 flex flex-col`}>
                <h4 className='w-full text-color-text-dark text-sm'>
                  {data?.location}
                </h4>
                <h5 className='w-full text-color-text-almost-clear text-xs'>
                  Location
                </h5>
              </li>
              <li className={`w-full pb-2 flex flex-col`}>
                <h4 className='w-full text-color-text-dark text-sm'>
                  {data?.created_date}
                </h4>
                <h5 className='w-full text-color-text-almost-clear text-xs'>
                  Connection creat date
                </h5>
              </li>
            </ul>
          </div>
          {/**buttons go to: candidates, offers or rivew */}
          <div className={`w-full h-fit pb-2 flex flex-row justify-end`}>
            <button
              id='button-go-to'
              className={
                `bg-color-highlighted hover:bg-color-highlighted-clear w-full px-4 py-2 flex flex-row justify-center items-center rounded-lg font-semibold transition-all`}
              onClick={() => chatsHandle()}
            >
              <h4 className="h-4 text-white text-[14px] flex flex-row items-center">
                Connect
              </h4>
            </button>
          </div>
        </div>
      </div>
    </div >
  )
};
