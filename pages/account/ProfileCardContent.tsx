import { useState } from "react";
import { useUI } from "@/context/ContextUI";
import ProfileCard from "./ProfileCard";


export default function ProfileCardsDisplayer({ shouldRender, data, dataBaseCollection }: any) {
  const { screenNarrow, accountModule } = useUI();
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);
  const isDashboard = accountModule === 'Dashboard';
  const shouldRenderData = Array.isArray(data) && data?.length > 0;

  return (
    shouldRender && data && (
      shouldRenderData ?
        <ul
          id={dataBaseCollection}
          className={`${!isDashboard && 'py-1'} w-full h-full flex flex-col`}
        >
          {
            data?.map((element: any, index: any) => {
              let dataToRenderLength: number = data.length;
              let borderBottom: boolean = index < (dataToRenderLength - 1);
              return (
                <li
                  key={`profile-${element._id}`}
                  className={`${listHover && (itemHover !== index && 'opacity-25')} ${borderBottom && 'border-b border-color-border'} w-full relative pt-2 pb-4 flex flex-col transform transition-all`}
                  onMouseEnter={() => { setItemHover(index); setListHover(true); }}
                  onMouseLeave={() => { setItemHover(null); setListHover(false); }}
                >
                  <ProfileCard
                    data={element}
                    editDeleteButtonVisible={screenNarrow || (listHover && (itemHover === index))}
                    dataBaseCollection={dataBaseCollection}
                  />
                </li>
              )
            })
          }
        </ul>
        :
        <div className="w-full p-5 flex flex-col transform transition-all">
          <h2 className='w-fit text-color-text-medium'>
            {`You do not have any ${dataBaseCollection} to show`}
          </h2>
        </div>
    ))
};