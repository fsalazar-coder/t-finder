import { useState } from "react";
import { useAuthUI } from "../../context/authContext";
import UserCardProfile from "./UserCardProfile";
import ButtonTitleCards from "./ButtonTitleCards";

interface CardsDisplayerParams {
  id: string,
  key: string,
  data: string[],
  collectionName: string;
}



export default function CardsDisplayerProfile({ id, key, data, collectionName }: CardsDisplayerParams) {
  const { accountModule } = useAuthUI();
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);

  const isDashboard = accountModule === 'Dashboard';
  const shouldRenderData = Array.isArray(data) && data.length > 0;
  const activedCollection = collectionName;


  return (
    shouldRenderData ?
      <ul id={id} key={key} className={`${!isDashboard && 'py-1'} w-full h-full flex flex-col`}>
        {
          data?.map((element: any, index: any) => {
            return (
              <li
                key={`profile-key-${index}`}
                className={`${listHover && (itemHover !== index && 'opacity-25')} w-full relative py-1 flex flex-col transform transition-all`}
                onMouseEnter={() => { setItemHover(index); setListHover(true); }}
                onMouseLeave={() => { setItemHover(null); setListHover(false); }}
              >
                <UserCardProfile
                  data={element}
                  editDeleteButtonVisible={listHover && (itemHover === index)}
                  dataBaseCollection={collectionName}
                />
              </li>
            )
          })
        }
      </ul>
      :
      <div className="w-full mt-1 px-5 py-5 flex flex-col bg-white border border-color-border shadow-md rounded-lg transform transition-all">
        <h2 className='w-fit text-color-text-medium'>
          {`There is not ${activedCollection} to show`}
        </h2>
      </div>
  )
};