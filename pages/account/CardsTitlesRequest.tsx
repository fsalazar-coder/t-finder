import SectionTitles from "../components/SectionTitles";
import ButtonTitleMenuAddEdit from "./ButtonTitleMenuAddEdit";
import { IconBxChevronLeft } from "@/icons/icons";



export default function CardsTitlesRequest(
  {
    screenNarrow,
    isDashboard,
    dataType,
    dataMenuTitles,
    isData,
    cardHover,
    openAccountModuleClick,
    openModalFormClick,
    isButtonBack,
    requestBackButton
  }: any) {

  return (
    <div className={
      `${isDashboard ? 'border-b' : 'bg-white border shadow-md rounded-lg'
      } w-full relative px-5 py-1 flex justify-between flex-row items-center border-color-border`
    }>
      <div className='w-full flex flex-row justify-between items-center'>
        <div className='w-2/3 flex flex-row items-center'>
          <div className="pr-5">
            <SectionTitles
              sectionTitle={`${dataType} request`}
              sectionType='account'
            />
          </div>
          {
            !isDashboard &&
            /**submenu: submitted, candidates, offers, review and chat... */
            <div className={`w-fit flex flex-row items-center`}>
              {
                dataMenuTitles.map(({ id, label, requestMenuCondition }: any) => (
                  requestMenuCondition &&
                  <div
                    key={id}
                    className='px-5 border-l border-color-border cursor-default'
                  >
                    <h4 className={`text-color-text-highlighted font-semibold`}>
                      {label}
                    </h4>
                  </div>
                ))
              }
            </div>
          }
        </div>
        <div className="w-1/3 h-full relative flex flex-row justify-end items-center">
          {
            !isButtonBack ?
              <ButtonTitleMenuAddEdit
                id={`button-title-request-${dataType}`}
                isData={isData}
                isDashboard={isDashboard}
                cardHover={cardHover}
                screenNarrow={screenNarrow}
                addButtonName={`New request`}
                openAccountModuleClick={() => openAccountModuleClick()}
                openModalFormClick={() => openModalFormClick()}
              />
              :
              /**back button */
              <button
                id='button-back'
                className={
                  `w-fit h-full flex flex-row justify-end items-center`}
                onClick={() => requestBackButton()}
              >
                <i className='w-6 pr-1 flex flex-row justify-center text-color-text-medium text-lg hover:text-color-highlighted cursor-pointer transition-all'>
                  <IconBxChevronLeft />
                </i>
                <h4 className="flex flex-row">
                  Back
                </h4>
              </button>
          }
        </div>
      </div>
    </div>
  )
};
