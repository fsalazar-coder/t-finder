import SectionTitles from "../components/SectionTitles";
import ButtonPostUpdateDelete from "./ButtonPostUpdateDelete";
import { IconBxChevronLeft } from "@/icons/icons";


export default function RequestsCardsTitles(
  {
    isDashboard,
    dataType,
    dataMenuTitles,
    isData,
    isButtonBack,
    requestBackButton
  }: any) {

  return (
    <div className={
      `${isDashboard && 'px-5 border-b'      /// bg-white border shadow-md rounded-lg
      } w-full relative py-1 mb-2 flex justify-between flex-row items-center border-color-border`
    }>
      <div className='w-full flex flex-row items-center'>
        <div className="h-full pr-5">
          <SectionTitles
            sectionTitle={`${dataType} request`}
            sectionType='account'
          />
        </div>
        {
          !isDashboard &&
          /**submenu: submitted, candidates, offers, review and chat... */
          <div className={`w-auto h-full flex px-5 flex-row items-center border-x border-color-border`}>
            {
              dataMenuTitles?.map(({ id, label, requestMenuCondition }: any) => (
                requestMenuCondition &&
                <div key={id} className='cursor-default'>
                  <h4 className={`text-color-text-highlighted text-base font-semibold`}>
                    {label}
                  </h4>
                </div>
              ))
            }
          </div>
        }
        <div className="w-fit h-full pl-5 flex flex-row items-center">
          {
            !isButtonBack ?
              <ButtonPostUpdateDelete
                itemId={`button-title-request-${dataType}`}
                action={isDashboard ? 'go-to-request' : 'post'}
                buttonType={isDashboard ? 'menu-dashboard' : 'post-account'}
                dataBaseCollection={dataType === 'Talent' ? 'request_talent' : 'request_job'}
                shouldRenderButton={(isDashboard && isData) ? true : (!isDashboard && !isButtonBack) ? true : false}
              />
              :
              /**back button */
              <button
                id='button-back'
                className={`w-fit h-full cursor-pointer flex flex-row items-center`}
                onClick={() => requestBackButton()}
              >
                <h4 className="h-fit flex flex-row text-[16px] text-color-text-almost-clear">
                  Back
                </h4>
                <i className='mt-1 flex flex-row justify-center text-[16px] text-color-text-almost-clear transition-all'>
                  <IconBxChevronLeft />
                </i>
              </button>
          }
        </div>
      </div>
    </div>
  )
};
