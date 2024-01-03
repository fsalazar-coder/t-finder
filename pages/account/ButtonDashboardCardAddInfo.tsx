import { IconAdd } from "@/icons/icons";

interface AddInfo {
  id: string,
  isDashboard: boolean,
  comment: string,
  click: () => void
}



export default function ButtonDashboardCardAddInfo({ id, isDashboard, comment, click }: AddInfo) {

  return (
    <div id={id} className='w-full h-full flex flex-col justify-center items-center transition-all'>
      <button
        className='w-full flex flex-col justify-center items-center hover:cursor-default'
        onClick={() => click()}
      >
        <i className={
          `${isDashboard ? 'text-[8rem] text-color-text-almost-clear lg:hover:text-green-200' :
            'text-xl lg:text-2xl text-color-text-clear lg:hover:text-green-500'
          } p-[2px] flex flex-row justify-center items-center rounded-full cursor-default lg:cursor-pointer transition-all`
        }>
          <IconAdd />
        </i>
        <h3 className='pr-2 text-sm text-color-text-almost-clear transition-all'>
          {comment}
        </h3>
      </button>
    </div>
  )
}
