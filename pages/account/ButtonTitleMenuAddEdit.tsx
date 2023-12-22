import { IconAdd, IconEdit, IconMenuI } from "@/icons/icons";

interface EditButton {
  id: string,
  isRequest: boolean,
  isDashboard: boolean,
  cardHover: boolean,
  screenNarrow: boolean,
  addButtonName: string,
  openAccountModule: () => void,
  openModalForm: () => void
}



export default function ButtonTitleMenuAddEdit(
  { id, isRequest, isDashboard, cardHover, screenNarrow, addButtonName, openAccountModule, openModalForm }: EditButton) {

  return (
    isDashboard ?
      isRequest &&
      /**button menu change to edit with hover */
      <div className="w-fit h-full absolute top-0 right-0 p-2 flex flex-row items-center z-20">
        {
          cardHover ?
            <div id={id} className='w-full h-full flex flex-row items-center transition-all'>
              <button className="flex flex-row justify-center items-center hover:cursor-default">
                <i className='hover:text-green-500 py-[2px] pl-1 text-color-text-tertiary text-xl lg:text-2xl flex flex-row justify-center bg-color-clear rounded-full cursor-default lg:cursor-pointer animate-[appear_0.7s_ease] transition-all'
                  onClick={() => openAccountModule()}
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
      :
      /**button add fix: information or request */
      <div className={
        `${!isRequest ? 'h-full' : 'h-full'
        } w-fit flex flex-row justify-end items-center z-20`
      }>
        <button
          className="w-full h-full flex flex-row justify-end items-center hover:cursor-default"
          onClick={() => openModalForm()}
        >
          <h3 className='pr-2 text-sm text-color-text-tertiary transition-all'>
            {screenNarrow ? 'Add' : `${addButtonName}`}
          </h3>
          <i className='p-[2px] text-color-text-tertiary lg:hover:text-green-500 text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer transition-all'>
            <IconAdd />
          </i>
        </button>
      </div >

  )
}



