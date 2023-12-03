import { IconAdd } from "@/icons/icons";

interface AddInfo {
  id: string,
  isDashboard: boolean,
  comment: string,
  click: () => void
}



export default function DashboardAddInfo({ id, isDashboard, comment, click }: AddInfo) {

  return (
    <div id={id} className='w-full h-full flex flex-col justify-center items-center transition-all'>
      <button
        className='w-full flex flex-col justify-center items-center hover:cursor-default'
        onClick={() => click()}
      >
        <i className={
          `${isDashboard ? 'text-[8rem] text-color-text-quaternary lg:hover:text-green-200' :
            'text-xl lg:text-2xl text-color-text-tertiary lg:hover:text-green-500'
          } p-[2px] flex flex-row justify-center items-center bg-color-clear rounded-full cursor-default lg:cursor-pointer transition-all`
        }>
          <IconAdd />
        </i>
        <h3 className='pr-2 text-sm text-color-text-tertiary transition-all'>
          {comment}
        </h3>
      </button>
    </div>
  )
}
