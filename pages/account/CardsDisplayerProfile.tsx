import { useState } from "react";
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from "../api/userDataHandlerFunction";
import { IconDelete, IconEdit } from "@/icons/icons";
import UserCardProfile from "./UserCardProfile";
import EditDeleteButtons from "./EditDeleteButtons";

interface CardsDisplayerParams {
  id: string,
  key: string,
  data: string[],
  collectionName: string;
}



export default function CardsDisplayerProfile({ id, key, data, collectionName }: CardsDisplayerParams) {
  const { token, userId, setCollectionToChange, setItemIdToChange, setUpdate } = useAuthData();
  const { setProfileModal, setProfileModalAction, setProfileModalType, accountModule } = useAuthUI();
  const { setMessageModal } = useUI();
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);

  const isDashboard = accountModule === 'Dashboard';
  const shouldRenderData = Array.isArray(data) && data.length > 0;
  const activedCollection = collectionName;

  const editDeleteButtons = [
    {
      id: 'edit-item-profile',
      key: 'edit-item-profile',
      icon: <IconEdit />,
      click: (elementId: string, sectionValue: string) => {
        setProfileModal(true);
        setProfileModalAction('edit');
        setProfileModalType(sectionValue);
        setCollectionToChange(sectionValue);
        setItemIdToChange(elementId);
      },
    },
    {
      id: 'delete-item-profile',
      key: 'delete-item-profile',
      icon: <IconDelete />,
      click: (elementId: string, sectionValue: string) => {
        console.log('section Value profile: ', sectionValue)
        setMessageModal([{
          type: 'delete',
          text: `Delete this ${sectionValue} information with this action`,
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
                  setUpdate(sectionValue);
                  setMessageModal([{
                    type: 'successful',
                    text: `This ${sectionValue} information has been deleted`,
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


  return (
    shouldRenderData &&
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
              <EditDeleteButtons
                elementId={element._id}
                buttons={editDeleteButtons}
                collection={activedCollection}
                listHover={listHover}
                itemHover={itemHover}
                index={index}
              />
              <UserCardProfile data={element} />
            </li>
          )
        })
      }
    </ul>
  )
};