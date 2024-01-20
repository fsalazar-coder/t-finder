import { useState, useEffect } from "react";
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import RequestsCard from "./RequestsCard";

interface CardsDisplayerParams {
  id: string,
  dataToRender: string[],
  dataToCompare: string[],
  requestMenu: string,
  statusRequestToRender: any,
  goClick: (e: any) => void,
}


interface StatusRequestParams {
  string: string
}



export default function RequestsCardsDisplayer({ id, dataToRender,
  dataToCompare, requestMenu, statusRequestToRender, goClick }: CardsDisplayerParams) {

  const { screenNarrow } = useUI();
  const { accountModule } = useAuthUI();
  const [dataToCompareUpdated, setDataToCompareUpdated] = useState(dataToCompare);
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);

  const isDashboard = accountModule === 'Dashboard';
  const isRequestMenuReview: boolean = requestMenu === 'candidate review';
  const collection: string = requestMenu === 'talent submitted' ? 'request_talent' : requestMenu === 'job submitted' ? 'request_job' : '';
  const shouldRenderData = Array.isArray(dataToRender) && dataToRender.length > 0;


  useEffect(() => {
    setDataToCompareUpdated(dataToCompare)
  }, [dataToCompare])


  return (
    shouldRenderData &&
    <ul
      id={id}
      className={`${!isDashboard && 'py-1'} ${(screenNarrow || isRequestMenuReview) ? 'flex flex-col' : 'grid grid-cols-3 gap-x-2 gap-y-1'} w-full h-full`}>
      {
        dataToRender?.map((element: any, index: any) => {
          const changeId = (requestMenu === 'candidate review' || requestMenu === 'requests') ? element.user_id : element._id;
          return (
            <li
              key={`${changeId}-${index}`}
              className={`${listHover && (itemHover === index ? '' : 'opacity-25')} w-full relative py-1 flex flex-col transform transition-all`}
              onMouseEnter={() => { setItemHover(index); setListHover(true) }}
              onMouseLeave={() => { setItemHover(null); setListHover(false) }}
            >
              <RequestsCard
                data={element}
                dataBaseCollection={collection}
                requestMenu={requestMenu}
                editDeleteButtonVisible={listHover && (itemHover === index)}
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
  )
};