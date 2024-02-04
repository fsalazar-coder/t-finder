import { useState, useEffect } from "react";

import { useUI } from "@/context/ContextUI";
import { useAuth } from "@/context/ContextAuth";
import { useAuthData } from "@/context/ContextAuthData";

import RequestsCard from "./RequestsCard";

interface CardsDisplayerParams {
  id: string,
  dataToRender: string[],
  dataToCompare: string[],
  statusRequestToRender: any,
  goClick: (e: any) => void,
  shouldRenderComponent: boolean
}


export default function RequestsCardsDisplayer({ id, dataToRender,
  dataToCompare, statusRequestToRender, goClick, shouldRenderComponent }: CardsDisplayerParams) {
  const { screenNarrow, accountModule, requestMenu } = useUI();
  const [dataToCompareUpdated, setDataToCompareUpdated] = useState(dataToCompare);
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);
  const isDashboard = accountModule === 'Dashboard';
  const isRequestMenuReview: boolean = requestMenu === 'candidate-review';
  const collection: string = requestMenu === 'talent-submitted' ? 'request_talent' : requestMenu === 'job-submitted' ? 'request_job' : '';
  const shouldRenderData = Array.isArray(dataToRender) && dataToRender.length > 0;

  useEffect(() => {
    setDataToCompareUpdated(dataToCompare)
  }, [dataToCompare])


  return (
    shouldRenderComponent && (
      shouldRenderData ?
        <ul
          id={id}
          className={`${!isDashboard && 'py-1'} ${(screenNarrow || isRequestMenuReview) ? 'flex flex-col' : 'grid grid-cols-3 gap-x-2 gap-y-1'} w-full h-full`}>
          {
            dataToRender?.map((element: any, index: any) => {
              const changeId = (requestMenu === 'candidate-review' || requestMenu === 'requests') ? element.user_id : element._id;
              return (
                <li
                  key={`${changeId}-${index}`}
                  className={`${listHover && (itemHover !== index && 'opacity-25')} w-full relative py-1 flex flex-col transform transition-all`}
                  onMouseEnter={() => { setItemHover(index); setListHover(true) }}
                  onMouseLeave={() => { setItemHover(null); setListHover(false) }}
                >
                  <RequestsCard
                    data={element}
                    dataBaseCollection={collection}
                    editDeleteButtonVisible={screenNarrow || (listHover && (itemHover === index))}
                    goClickCondition={dataToCompareUpdated?.includes(changeId)}
                    statusRequestToRender={statusRequestToRender}
                    value={changeId}
                    goClick={(e: any) => goClick(e)}
                  />
                </li>
              )
            })
          }
        </ul>
        :
        <div className="w-full mt-1 px-5 py-5 flex flex-col bg-white border border-color-border shadow-md rounded-lg transform transition-all">
          <h2 className='w-fit text-color-text-medium'>
            {`You do not have any request ${accountModule === 'Talent' ? 'talent' : 'job'} to show`}
          </h2>
        </div>
    ))
};