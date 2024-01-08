import { useState, useEffect } from "react";
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from "../api/userDataHandlerFunction";
import { IconDelete, IconEdit } from "@/icons/icons";
import UserCardRequest from "./UserCardRequest";

interface CardsDisplayerParams {
  id: string,
  key: string,
  dataToRender: string[],
  dataToCompare: string[],
  cardsDisplayerType: string,
  requestMenu: string,
  goClickTitleEnabled: string,
  goClickTitleDisabled: string,
  goClick: (e: any) => void,
}



export default function CardsDisplayerRequest({id, key, dataToRender, 
  dataToCompare, cardsDisplayerType, requestMenu, goClick }: CardsDisplayerParams) {

  const { screenNarrow, setMessageModal } = useUI();
  const { accountModule, setRequestModal, setRequestModalAction } = useAuthUI();
  const { token, userId, setCollectionToChange, setItemIdToChange, setUpdate } = useAuthData();
  const [dataToCompareUpdated, setDataToCompareUpdated] = useState(dataToCompare);
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);

  const isDashboard = accountModule === 'Dashboard';
  const isRequestMenuReview: boolean = requestMenu === 'candidate review';
  const collection: string = requestMenu === 'talent submitted' ? 'request_talent' : requestMenu === 'job submitted' ? 'request_job' : '';
  const shouldRenderData = Array.isArray(dataToRender) && dataToRender.length > 0;

  const editDeleteButtons = [
    {
      id: 'edit-item-request',
      icon: <IconEdit />,
      click: (requestType: string, elementId: string, value: string) => {
        setRequestModal(requestType);
        setRequestModalAction('edit');
        setCollectionToChange(value);
        setItemIdToChange(elementId);
      },
    },
    {
      id: 'delete-item-request',
      icon: <IconDelete />,
      click: (elementId: string, sectionValue: string) => {
        setMessageModal([{
          type: 'delete',
          text: `Delete this request with this action`,
          click: () => {
            let collectionName = sectionValue;
            let itemIdToChange: string = elementId;
            userDataHandlerFunction({
              token: token as string,
              userId: collectionName === 'personal_info' ? userId as string : itemIdToChange,
              action: 'delete',
              collectionName: collectionName,
              data: '',
              onSuccess: () => {
                setTimeout(() => {
                  setUpdate(collectionName);
                  setMessageModal([{
                    type: 'successful',
                    text: `This request has been deleted`,
                    click: () => setMessageModal([])
                  }])
                }, 500);
              },
              onError: (error: any) => console.error(error)
            });
            setMessageModal([])
          }
        }]);
      }
    },
  ];

  useEffect(() => {
    setDataToCompareUpdated(dataToCompare)
  }, [dataToCompare])


  return (
    shouldRenderData &&
    <ul
      id={id}
      key={key}
      className={`${!isDashboard && 'py-1'} ${(screenNarrow || isRequestMenuReview) ? 'flex flex-col' : 'grid grid-cols-3 gap-x-2 gap-y-1'} w-full h-full`}>
      {
        dataToRender?.map((element: any, index: any) => {
          const changeId = (requestMenu === 'candidate review' || requestMenu === 'offers') ? element.user_id : element._id;
          return (
            <li
              key={`${changeId}-${index}`}
              className={`${listHover && (itemHover === index ? '' : 'opacity-25')} w-full relative py-1 flex flex-col transform transition-all`}
              onMouseEnter={() => { setItemHover(index); setListHover(true) }}
              onMouseLeave={() => { setItemHover(null); setListHover(false) }}
            >
              <UserCardRequest
                data={element}
                dataBaseCollection={collection}
                userCardType={cardsDisplayerType}
                requestMenu={requestMenu}
                editDeleteButtonVisible={listHover && (itemHover === index)}
                goClickCondition={dataToCompareUpdated?.includes(changeId)}
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