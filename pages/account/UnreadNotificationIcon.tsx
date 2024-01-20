import { useUI } from "../../context/authContext";

interface UnreadNotificationParams {
  icon: any,
  textDescription: string,
  value: number,
  goClick: () => void
}



export default function UnreadNotificationIcon({ icon, textDescription, value, goClick }: UnreadNotificationParams) {

  const { screenNarrow } = useUI();
  const shouldRender: boolean = value > 0;

  return (
    <div className={`${screenNarrow ? 'h-7' : 'h-9'} pr-4 text-color-text-almost-clear hover:text-color-highlighted-clear flex flex-col items-center hover:cursor-pointer`}
      onClick={() => goClick()}
    >
      <div className='relative flex'>
        <i className='h-fit text-xl lg:text-2xl flex flex-col justify-center items-center'>
          {icon}
        </i>
        {
          shouldRender &&
          <div className='w-5 h-5 absolute -top-1 -right-[10px] bg-color-notification-alert border-2 border-white rounded-full'>
            <h6 className='text-white text-[10px] text-center font-bold'>
              {value}
            </h6>
          </div>
        }
      </div>
      <h6 className='w-full h-fit text-xs text-center'>
        {textDescription}
      </h6>
    </div>
  )
}