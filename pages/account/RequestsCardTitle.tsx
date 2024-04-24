import { useState } from "react";
import SectionTitles from "../components/SectionTitles";
import ButtonPostUpdateDelete from "./ButtonPostUpdateDelete";
import { IconBxChevronLeft } from "@/icons/icons";



export default function RequestsCardTitle(
  {
    isDashboard,
    isRequestMenuSubmitted,
    dataType,
    dashboardRequestClick,
    dataMenuTitles,
    isData,
    isButtonBack,
    requestBackButton
  }: any) {

  const requestToView: any = [
    { id: 'Talent', label: 'Talent' },
    { id: 'Job', label: 'Job' }
  ];


  return (
    <div className={`${(isDashboard || isRequestMenuSubmitted) && 'border-b border-color-border'} w-full relative px-5 py-2 flex justify-between flex-row items-center`}>
      <div className='w-auto flex flex-row justify-between items-center'>
        <div className="h-full pr-5">
          <SectionTitles
            sectionTitle={`${isDashboard ? 'Request' : `${dataType} request`}`}
            sectionType='account'
          />
        </div>
        <RequestMenuDashboard
          shouldRender={isDashboard}
          dashboardRequestType={dataType}
          requestToView={requestToView}
          itemClick={(e: any) => dashboardRequestClick(e)}
        />
        <RequestMenuNoDashboard
          shouldRender={!isDashboard}
          isData={isData}
          dataType={dataType}
          dataMenuTitles={dataMenuTitles}
          isDasboard={isDashboard}
          isButtonBack={isButtonBack}
          requestBackButton={() => requestBackButton()}
        />
      </div>
      <div className="w-fit h-full flex flex-row items-center">
        {
          !isButtonBack ?
            <ButtonPostUpdateDelete
              itemId={`button-title-request-${dataType}`}
              action='post'  ///isDashboard ? 'go-to-request' : 'post'
              buttonType='post-account'
              dataBaseCollection={dataType === 'Talent' ? 'request_talent' : 'request_job'}
              shouldRenderButton={(isDashboard && isData) ? true : (!isDashboard && !isButtonBack) ? true : false}
            />
            :
            <BackButton requestBackButton={requestBackButton} />
        }
      </div>
    </div>
  )
};


const RequestMenuDashboard: any = ({ shouldRender, dashboardRequestType, requestToView, itemClick }: any) => (
  shouldRender &&
  <ul className={`w-fit flex flex-row items-center`}>
    {
      requestToView?.map(({ id, label }: any, index: any) => {
        let activedRequest: boolean = dashboardRequestType === id;
        return (
          <li
            key={index}
            className='px-5 border-l border-color-border cursor-default'
            onClick={() => itemClick(id)}
          >
            <button className='w-full'>
              <h4 className={`${activedRequest ? 'text-color-highlighted font-semibold' : 'text-color-text-almost-clear'} text-base`}>
                {label}
              </h4>
            </button>
          </li>
        )
      })
    }
  </ul>
);


///**submenu: submitted, candidates, offers, review and chat... */
const RequestMenuNoDashboard: any = ({ shouldRender, dataMenuTitles }: any) => (
  shouldRender &&
  <div className={`w-auto h-full flex px-5 flex-row items-center border-l border-color-border`}>
    {
      dataMenuTitles?.map(({ id, label, requestMenuCondition }: any) => (
        requestMenuCondition &&
        <div key={id} className='cursor-default'>
          <h4 className={`text-color-highlighted text-base font-semibold`}>
            {label}
          </h4>
        </div>
      ))
    }
  </div>
);


const BackButton: any = ({ requestBackButton }: any) => (
  <button
    id='button-back'
    className={`w-fit h-full cursor-pointer flex flex-row items-center`}
    onClick={requestBackButton}
  >
    <h4 className="h-fit flex flex-row text-[16px] text-color-text-almost-clear">
      Back
    </h4>
    <i className='mt-1 flex flex-row justify-center text-[16px] text-color-text-almost-clear transition-all'>
      <IconBxChevronLeft />
    </i>
  </button>
);