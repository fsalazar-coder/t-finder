import { IconEdit, IconMenuI } from "@/icons/icons";

interface EditButton {
  id: string,
  cardHover: boolean,
  click: () => void
}


export default function DashboardEditButton({ id, cardHover, click }: EditButton) {

  return (
    <div className="w-fit h-full absolute top-0 right-0 p-2 flex flex-row items-center z-20">
      {
        cardHover ?
          <div id={id} className='w-full h-full flex flex-row items-center transition-all'>
            <button className="flex flex-row justify-center items-center hover:cursor-default">
              <i className='hover:text-green-500 py-[2px] pl-1 text-color-text-tertiary text-xl lg:text-2xl flex flex-row justify-center bg-color-clear rounded-full cursor-default lg:cursor-pointer animate-[appear_0.7s_ease] transition-all'
                onClick={() => click()}
              >
                <IconEdit />
              </i>
            </button>
          </div>
          :
          <i className='py-[2px] text-color-text-tertiary text-2xl flex flex-row justify-center cursor-pointer animate-[appear_0.7s_ease] transition-all'>
            <IconMenuI />
          </i>
      }
    </div>
  )
}
