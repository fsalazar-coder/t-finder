import React, { useState } from "react";
import { useAuthData, useAuthUI, useUI } from "@/context/authContext";
import { IconAdd, IconDelete, IconEdit, IconMenuI } from "@/icons/icons";
import { userDataHandlerFunction } from "../api/userDataHandlerFunction";

interface ButtonTitleParams {
  id: string;
  isData: boolean;
  buttonType: string;
  dataBaseCollection: string;
  shouldRenderButton: boolean;
}

interface ButtonConfig {
  id: string;
  action: 'edit' | 'delete';
  icon: JSX.Element;
  click: () => void;
}



export default function ButtonTitleCards({ id, isData, buttonType, dataBaseCollection, shouldRenderButton }: ButtonTitleParams) {
  const { screenNarrow, setMessageModal } = useUI();
  const { token, setCollectionToChange, setItemIdToChange, setUpdate } = useAuthData();
  const { accountModule, setAccountModule, setProfileModal, setProfileModalAction, setRequestModal, setRequestModalAction } = useAuthUI();
  const [menuDashboardVisible, setMenuDashboardVisible] = useState<boolean>(true);

  const isDashboard = accountModule === 'Dashboard';
  const isButtonItems = buttonType === 'profile-items' || buttonType === 'request-items';
  const nameButtonAddOnTitle: any = { 'profile-title': dataBaseCollection, 'request-title': 'request' };
  const requestType: any = dataBaseCollection === 'request_talent' ? 'Talent' : 'Job';

  const buttonActions: any = {
    edit: { icon: <IconEdit />, colorClass: 'text-green-300' },
    delete: { icon: <IconDelete />, colorClass: 'text-red-300' },
  };

  const getButton: any = (config: ButtonConfig) => (
    <button
      key={config.id}
      className="pl-1 flex flex-row justify-center items-center hover:cursor-default transition-all"
      onClick={config.click}
    >
      <i className={`${buttonActions[config.action].colorClass} lg:text-color-text-clear lg:hover:text-green-500 text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer transition-all`}>
        {buttonActions[config.action].icon}
      </i>
    </button>
  );

  const buttonsConfig: any = {
    'personal-info': [
      {
        id: 'edit-personal-info',
        action: 'edit',
        click: () => setModalState('edit', buttonType, dataBaseCollection, id)
      }
    ],
    'profile-title-dashboard': [
      {
        id: 'edit-profile-dashboard',
        action: 'edit',
        click: () => setAccountModule('Profile')
      }
    ],
    'request-title-dashboard': [
      {
        id: 'edit-request-dashboard',
        action: 'edit',
        click: () => setAccountModule(requestType)
      }
    ],
    'profile-items': [
      {
        id: 'edit-item-profile',
        action: 'edit',
        click: () => setModalState('edit', buttonType, dataBaseCollection, id)
      },
      {
        id: 'delete-item-profile',
        action: 'delete',
        click: () => deleteItem(dataBaseCollection, id)
      }
    ],
    'request-items': [
      {
        id: 'edit-item-request',
        action: 'edit',
        click: () => setModalState('edit', buttonType, dataBaseCollection, id)
      },
      {
        id: 'delete-item-request',
        action: 'delete',
        click: () => deleteItem(dataBaseCollection, id)
      }
    ],
  };

  const setModalState = (action: string, modalType: string, collection: string, itemId: string) => {
    const isEdit = action === 'edit';
    setCollectionToChange(collection);
    if (modalType === 'profile-title' || modalType === 'personal-info') {
      setProfileModal(collection);
      setProfileModalAction(isEdit ? 'edit' : 'post');
    }
    else if (modalType === 'request-title') {
      setRequestModal(requestType);
      setRequestModalAction(isEdit ? 'edit' : 'post');
    }
    if (isEdit) {
      setItemIdToChange(itemId);
    }
  };

  const deleteItem = (collection: string, itemId: string) => {
    setMessageModal([{
      type: 'delete',
      text: `Are you sure you want to delete this ${collection} item?`,
      click: () => {
        userDataHandlerFunction({
          token: token as string,
          userId: itemId,
          action: 'delete',
          collectionName: collection,
          data: '',
          onSuccess: () => {
            setCollectionToChange(collection);
            setTimeout(() => {
              setUpdate(collection);
              setMessageModal([{
                type: 'successful',
                text: `The ${collection} item has been successfully deleted.`,
                click: () => setMessageModal([])
              }]);
            }, 500);
          },
          onError: (error: any) => {
            console.error(error);
            setMessageModal([{
              type: 'error',
              text: `An error occurred while deleting the ${collection} item.`,
              click: () => setMessageModal([])
            }]);
          }
        });
        setMessageModal([]);
      }
    }]);
  };


  return (
    <div
      className={`${isDashboard && 'absolute top-0 right-2'} w-fit h-full flex flex-row justify-end items-center z-20`}
      onMouseEnter={() => setMenuDashboardVisible(false)}
      onMouseLeave={() => setMenuDashboardVisible(true)}
    >
      {
        isDashboard && isData && menuDashboardVisible &&
        <i className='w-fit text-color-text-almost-clear text-2xl flex flex-row justify-center cursor-pointer transition-all'>
          <IconMenuI />
        </i>
      }
      {
        isDashboard && isData && !menuDashboardVisible &&
        buttonsConfig[buttonType]?.map(getButton)
      }
      {
        !isDashboard && !isButtonItems && shouldRenderButton &&
        <ButtonAddOnTitle
          screenNarrow={screenNarrow}
          nameButtonAddOnTitle={nameButtonAddOnTitle[buttonType] as string}
          clickAddButton={() => setModalState('post', buttonType, dataBaseCollection, id)}
        />
      }
      {
        !isDashboard && isData && isButtonItems && shouldRenderButton &&
        buttonsConfig[buttonType]?.map(getButton)
      }
    </div>
  );
}

function ButtonAddOnTitle({ screenNarrow, nameButtonAddOnTitle, clickAddButton }: { screenNarrow: boolean, nameButtonAddOnTitle: string, clickAddButton: () => void }) {
  return (
    <button
      className="h-full flex flex-row items-center lg:hover:cursor-pointer transition-all"
      onClick={clickAddButton}
    >
      <h3 className='pr-2 text-base text-color-text-almost-clear transition-all'>
        {screenNarrow ? 'Add' : `Add ${nameButtonAddOnTitle}`}
      </h3>
      <i className='p-[2px] text-color-text-almost-clear lg:hover:text-green-500 text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer transition-all'>
        <IconAdd />
      </i>
    </button>
  );
}
