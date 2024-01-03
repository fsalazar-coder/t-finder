import { IconAdd, IconEdit, IconMenuI } from "@/icons/icons";

interface EditButton {
  id: string,
  isData: boolean,
  isDashboard: boolean,
  cardHover: boolean,
  screenNarrow: boolean,
  addButtonName: string,
  openAccountModuleClick: () => void,
  openModalFormClick: () => void
}



export default function ButtonTitleMenuAddEdit(
  { id, isData, isDashboard, cardHover, screenNarrow, addButtonName, openAccountModuleClick, openModalFormClick }: EditButton) {

  return (
    isDashboard ?
      isData &&
      /**button menu change to edit with hover */
      <div className="w-fit h-full absolute top-0 right-0 p-2 flex flex-row items-center z-20">
        {
          cardHover ?
            <div id={id} className='w-full h-full flex flex-row items-center transition-all'>
              <button className="flex flex-row justify-center items-center hover:cursor-default">
                <i className='hover:text-green-500 py-[2px] pl-1 text-color-text-almost-clear text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer animate-[appear_0.7s_ease] transition-all'
                  onClick={() => openAccountModuleClick()}
                >
                  <IconEdit />
                </i>
              </button>
            </div>
            :
            <i className='py-[2px] text-color-text-almost-clear text-2xl flex flex-row justify-center cursor-pointer animate-[appear_0.7s_ease] transition-all'>
              <IconMenuI />
            </i>
        }
      </div>
      :
      /**button add fix: information or request */
      <div className={
        `${!isData ? 'h-full' : 'h-full'
        } w-fit flex flex-row justify-end items-center z-20`
      }>
        <button
          className="w-full h-full flex flex-row justify-end items-center hover:cursor-default"
          onClick={() => openModalFormClick()}
        >
          <h3 className='pr-2 text-sm text-color-text-almost-clear transition-all'>
            {screenNarrow ? 'Add' : `${addButtonName}`}
          </h3>
          <i className='p-[2px] text-color-text-almost-clear lg:hover:text-green-500 text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer transition-all'>
            <IconAdd />
          </i>
        </button>
      </div>
  )
}



