import { useState, useEffect } from "react";
import { useAuthUI } from "../../context/authContext";
import UserCard from "./UserCard";

interface CardsDisplayerParams {
  id: string,
  dataToRender: string[],
  dataToCompare: string[],
  cardsDisplayerType: string,
  requestMenu: string,
  goClickTitleEnabled: string,
  goClickTitleDisabled: string,
  goClick: (e: any) => void,
}



export default function CardsDisplayer({
  id, dataToRender, dataToCompare, cardsDisplayerType, requestMenu,
  goClickTitleEnabled, goClickTitleDisabled, goClick }: CardsDisplayerParams) {

  const { accountModule } = useAuthUI();
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);

  const isDashboard = accountModule === 'Dashboard';
  const shouldRenderData = Object.keys(dataToRender).length > 0;


  return (
    shouldRenderData &&
    <div
      id={id}
      key={id}
      className={`${!isDashboard && 'my-1'} w-full h-full flex flex-col`}>
      <div
        className="w-full h-full flex flex-col"
        onMouseEnter={() => setListHover(true)}
        onMouseLeave={() => setListHover(false)}
      >
        <div className='w-full flex flex-col'>
          <div className='w-full flex flex-col justify-center items-center'>
            <ul className='w-full flex flex-col'>
              {
                dataToRender?.map((element: any, index: any) => {
                  const changeId = (requestMenu === 'candidate review' || requestMenu === 'offer review') ? element.user_id : element._id

                  return (
                    <li key={`${changeId}-${index}`}
                      className={
                        `${listHover && (itemHover === index ? '' : 'opacity-25')} 
                        w-full relative py-1 flex flex-col transform transition-all`
                      }
                      onMouseEnter={() => { setItemHover(index); setListHover(true); }}
                      onMouseLeave={() => { setItemHover(null); setListHover(false); }}
                    >
                      <div className="w-full px-5 py-3 flex flex-col bg-color-clear border border-color-border-clear shadow-md rounded-lg transform transition-all">
                        <UserCard
                          key={`changeId-${index}`}   
                          data={element}
                          indexCard={index}
                          listHover={listHover}
                          itemHover={itemHover}
                          userCardType={cardsDisplayerType}
                          requestMenu={requestMenu}
                          goClickCondition={dataToCompare.includes(changeId)}
                          goClickTitleEnabled={goClickTitleEnabled}
                          goClickTitleDisabled={goClickTitleDisabled}
                          value={changeId}
                          goClick={(e: any) => goClick(e)}
                        />
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};