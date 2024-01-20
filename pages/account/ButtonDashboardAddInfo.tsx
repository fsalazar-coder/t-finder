import { IconAdd } from "@/icons/icons";

interface AddInfo {
  id: string,
  comment: string,
  click: () => void
}



export default function ButtonDashboardAddInfo({ id, comment, click }: AddInfo) {

  return (
    <div id={id} className='w-full h-full flex flex-col justify-center items-center transition-all'>
      <button
        className='w-full flex flex-col justify-center items-center hover:cursor-default'
        onClick={() => click()}
      >
        <i className={
          `text-[8rem] text-color-text-clear lg:hover:text-green-200 p-[2px] flex flex-row justify-center items-center rounded-full cursor-default lg:cursor-pointer transition-all`
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
