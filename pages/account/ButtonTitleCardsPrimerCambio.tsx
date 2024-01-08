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

interface MenuDashboardParams {
  shouldRenderCondition: boolean;
}

interface ButtonEditTitleDashboardParams {
  buttons: ButtonConfig[];
  shouldRenderCondition: boolean;
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
  const { accountModule, setAccountModule, setProfileModal, setProfileModalType, setProfileModalAction, setRequestModal, setRequestModalAction } = useAuthUI();
  const [menuDashboardVisible, setMenuDashboardVisible] = useState<boolean>(true);

  const isDashboard: boolean = accountModule === 'Dashboard';
  const isButtonItems: boolean = buttonType === 'profile-items' || buttonType === 'request-items';

  const nameButtonAddOnTitle: any = {
    'profile-title': dataBaseCollection,
    'request-title': 'request'
  };

  const buttonsEditDashboard: any = {
    'personal-info': [
      {
        id: 'edit-personal-info',
        action: 'edit',
        icon: <IconEdit />,
        click: () => {
          setProfileModal(true);
          setProfileModalAction('edit');
          setProfileModalType(dataBaseCollection);
          setCollectionToChange(dataBaseCollection)
        },
      }
    ],
    'profile-title-dashboard': [
      {
        id: 'edit-profile-dashboard',
        action: 'edit',
        icon: <IconEdit />,
        click: () => {
          setAccountModule('Profile');
        },
      },
    ],
    'request-title-dashboard': [
      {
        id: 'edit-request-dashboard',
        action: 'edit',
        icon: <IconEdit />,
        click: () => {
          setAccountModule(dataBaseCollection === 'request_talent' ? 'Talent' : 'Job');
        },
      },
    ],
  };

  const buttonsAdd: any = {
    'profile-title': {
      click: () => {
        setProfileModal(true);
        setProfileModalAction('post');
        setProfileModalType(dataBaseCollection);
        setCollectionToChange(dataBaseCollection)
      },
    },
    'request-title': {
      click: () => {
        setRequestModal(dataBaseCollection === 'request_talent' ? 'Talent' : 'Job');
        setRequestModalAction('post');
        setCollectionToChange(dataBaseCollection);
      },
    },
  };

  const buttonsEditDelete: any = {
    'profile-items': [
      {
        id: 'edit-item-profile',
        action: 'edit',
        icon: <IconEdit />,
        click: () => {
          setProfileModal(true);
          setProfileModalAction('edit');
          setProfileModalType(dataBaseCollection);
          setCollectionToChange(dataBaseCollection);
          setItemIdToChange(id);
        },
      },
      {
        id: 'delete-item-profile',
        action: 'delete',
        icon: <IconDelete />,
        click: () => {
          setMessageModal([{
            type: 'delete',
            text: `Delete this ${dataBaseCollection} information with this action`,
            click: () => {
              userDataHandlerFunction({
                token: token as string,
                userId: id,
                action: 'delete',
                collectionName: dataBaseCollection,
                data: '',
                onSuccess: () => {
                  setTimeout(() => {
                    setUpdate(dataBaseCollection);
                    setMessageModal([{
                      type: 'successful',
                      text: `This ${dataBaseCollection} information has been deleted`,
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
    ],
    'request-items': [
      {
        id: 'edit-item-request',
        action: 'edit',
        icon: <IconEdit />,
        click: () => {
          setRequestModal(dataBaseCollection === 'request_talent' ? 'Talent' : 'Job');
          setRequestModalAction('edit');
          setCollectionToChange(dataBaseCollection);
          setItemIdToChange(id);
        },
      },
      {
        id: 'delete-item-request',
        action: 'delete',
        icon: <IconDelete />,
        click: () => {
          setMessageModal([{
            type: 'delete',
            text: `Delete this request with this action`,
            click: () => {
              userDataHandlerFunction({
                token: token as string,
                userId: id,
                action: 'delete',
                collectionName: dataBaseCollection,
                data: '',
                onSuccess: () => {
                  setTimeout(() => {
                    setUpdate(dataBaseCollection);
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
      }
    ],
  };


  return (
    <div
      className="w-fit h-full absolute top-0 right-0 flex flex-row justify-end items-center z-20"
      onMouseEnter={() => setMenuDashboardVisible(false)}
      onMouseLeave={() => setMenuDashboardVisible(true)}
    >
      {
        isDashboard && isData && menuDashboardVisible &&
        <ButtonsMenuDashboard
          shouldRenderCondition
        />
      }
      {
        isDashboard && isData && !menuDashboardVisible &&
        <ButtonsEditOnDashboard
          buttons={buttonsEditDashboard[buttonType]}
          shouldRenderCondition
        />
      }
      {
        !isDashboard && !isButtonItems && shouldRenderButton &&
        <ButtonAddOnTitle
          screenNarrow={screenNarrow}
          nameButtonAddOnTitle={nameButtonAddOnTitle[buttonType]}
          clickAddButton={() => buttonsAdd[buttonType].click()}
          shouldRenderCondition
        />
      }
      {
        !isDashboard && isData && isButtonItems && shouldRenderButton &&
        <ButtonsEditDelete
          buttons={buttonsEditDelete[buttonType]}
          shouldRenderCondition
        />
      }
    </div>
  );
};

export function ButtonsMenuDashboard({ shouldRenderCondition }: MenuDashboardParams) {
  return (
    shouldRenderCondition &&
    <i className='w-fit text-color-text-almost-clear text-2xl flex flex-row justify-center cursor-pointer transition-all'>
      <IconMenuI />
    </i>
  )
};

export function ButtonsEditOnDashboard({ buttons, shouldRenderCondition }: ButtonEditTitleDashboardParams) {
  return (
    shouldRenderCondition &&
    buttons.map((button) => (
      <button
        key={button.id}
        className="pl-1 flex flex-row justify-center items-center hover:cursor-default transition-all"
        onClick={button.click}
      >
        <i className={
          `${button.action === 'edit' ? 'text-green-300' : 'text-red-300'
          } lg:text-color-text-clear lg:hover:text-green-500 text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer transition-all`
        }>
          {button.icon}
        </i>
      </button>
    )))
};

export function ButtonAddOnTitle({ screenNarrow, nameButtonAddOnTitle, clickAddButton, shouldRenderCondition }: any) {
  return (
    shouldRenderCondition &&
    <button
      className="w-fit h-full flex flex-row items-center lg:hover:cursor-pointer transition-all"
      onClick={clickAddButton}
    >
      <h3 className='pr-2 text-sm text-color-text-almost-clear transition-all'>
        {screenNarrow ? 'Add' : `Add ${nameButtonAddOnTitle}`}
      </h3>
      <i className='p-[2px] text-color-text-almost-clear lg:hover:text-green-500 text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer transition-all'>
        <IconAdd />
      </i>
    </button>
  )
};

export function ButtonsEditDelete({ buttons, shouldRenderCondition }: ButtonEditTitleDashboardParams) {
  return (
    shouldRenderCondition &&
    buttons.map(button => (
      <button
        key={button.id}
        className="pl-1 flex flex-row justify-center items-center hover:cursor-default transition-all"
        onClick={button.click}
      >
        <i className={
          `${button.action === 'edit' ? 'text-green-300' : 'text-red-300'
          } lg:text-color-text-clear lg:hover:text-green-500 text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer transition-all`
        }>
          {button.icon}
        </i>
      </button>
    )))
};