import { useState, useEffect } from "react";
import { useUI } from "@/context/ContextUI";
import RequestsCard from "./RequestsCard";

interface CardsDisplayerParams {
  id: string,
  requestType: string,
  dataToRender: string[],
  dataToCompare: string[],
  statusRequestToRender: any,
  goClick: (e: any) => void,
}


export default function RequestsCardContent({ id, requestType, dataToRender, dataToCompare, statusRequestToRender, goClick }: CardsDisplayerParams) {
  const { screenNarrow, accountModule, requestMenu } = useUI();
  const isDashboard = accountModule === 'Dashboard';
  const isData = Array.isArray(dataToRender) && dataToRender.length > 0;

  return (
    isData ?
      <CardContent
        id={id}
        requestType={requestType}
        isDashboard={isDashboard}
        screenNarrow={screenNarrow}
        requestMenu={requestMenu}
        dataToRender={dataToRender}
        dataToCompare={dataToCompare}
        statusRequestToRender={statusRequestToRender}
        goClick={goClick}
      />
      :
      <div className={`w-full p-5 flex flex-col justify-center transform transition-all`}>
        <h2 className='w-fit h-full text-color-text-medium flex'>
          {`You do not have any request ${requestType === 'Talent' ? 'talent' : 'job'} to show`}
        </h2>
      </div>
  )
};


const CardContent: any = ({ id, requestType, isDashboard, screenNarrow, requestMenu, dataToRender, dataToCompare, statusRequestToRender, goClick }: any) => {
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);
  const [dataToCompareUpdated, setDataToCompareUpdated] = useState(dataToCompare);
  const isRequestMenuReview: boolean = requestMenu === 'candidate-review';
  const isRequestMenuSubmitted = requestMenu === 'talent-submitted' || requestMenu === 'job-submitted';
  const collection: string = requestMenu === 'talent-submitted' ? 'request_talent' : requestMenu === 'job-submitted' ? 'request_job' : '';

  useEffect(() => {
    setDataToCompareUpdated(dataToCompare)
  }, [dataToCompare]);


  return (
    <ul
      id={id}
      className={`${!isDashboard && ''} ${(screenNarrow || isRequestMenuReview || isDashboard || isRequestMenuSubmitted) ? 'flex flex-col'
        : 'grid grid-cols-3 gap-x-6 gap-y-4'} w-full h-full`}
    >
      {
        dataToRender?.map((element: any, index: any) => {
          let changeId = (requestMenu === 'candidate-review' || requestMenu === 'requests') ? element.user_id : element._id;
          let dataToRenderLength: number = dataToRender.length;
          let borderBottom: boolean = index < (dataToRenderLength - 1);
          return (
            <li
              key={`${changeId}-${index}`}
              className={`${listHover && (itemHover !== index && 'opacity-25')} ${isDashboard ? 'flex-col lg:flex-row' : 'flex-col'} ${borderBottom && isRequestMenuSubmitted && 'border-b border-color-border'} w-full pt-2 pb-4 flex transform transition-all`}
              onMouseEnter={() => { setItemHover(index); setListHover(true) }}
              onMouseLeave={() => { setItemHover(null); setListHover(false) }}
            >
              <RequestsCard
                data={element}
                requestType={requestType}
                dataBaseCollection={collection}
                editDeleteButtonVisible={screenNarrow || (listHover && (itemHover === index))}
                goClickCondition={dataToCompareUpdated?.includes(changeId)}
                statusRequestToRender={statusRequestToRender}
                goClick={(e: any) => goClick(e)}
                value={changeId}
              />
            </li>
          )
        })
      }
    </ul>
  )
}