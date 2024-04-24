import React, { useState } from "react";
import { useUI } from "@/context/ContextUI";
import { useAuth } from "@/context/ContextAuth";
import { useAuthData } from "@/context/ContextAuthData";
import { IconAdd, IconDelete, IconEdit, IconMenuI } from "@/icons/icons";
import { userDataHandlerFunction } from "../api/userDataHandlerFunction";

interface ButtonTitleParams {
  itemId: string;
  action: string;
  buttonType: ButtonType;
  dataBaseCollection: string;
  shouldRenderButton: boolean;
}

type ButtonType = 'menu-dashboard' | 'post-dashboard' | 'post-account' | 'update-delete-items';


export default function ButtonPostUpdateDelete({ itemId, action, buttonType, dataBaseCollection, shouldRenderButton }: ButtonTitleParams) {
  const { token } = useAuth();
  const { screenNarrow, setAccountModule, setMessageModal } = useUI();
  const { setProfileModal, setProfileModalAction, setRequestModal, setRequestModalAction, setCollectionToChange, setItemIdToChange, setUserProfileData, setUserRequestData } = useAuthData();
  const { accountModule } = useUI();
  const isDasboard: boolean = accountModule === 'Dashboard';
  const isMenuDashboard = buttonType === 'menu-dashboard';
  const isPostDashboard = buttonType === 'post-dashboard';
  const nameButtonPostAccount: any = { 'Profile': dataBaseCollection, 'Talent': 'request', 'Job': 'request', 'request_talent': 'request', 'request_job': 'request' };
  const nameButtonPostDashboard: any = { 'personal_info': 'personal info', 'request_talent': 'request', 'request_job': 'request' };
  const requestType: any = dataBaseCollection === 'request_talent' ? 'Talent' : 'Job';
  const baseIconClass: any = `${isPostDashboard ? 'text-[8rem]' : 'text-xl lg:text-2xl'}  flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer transition-all`

  const buttonsAction: any = {
    menu: { icon: <IconMenuI />, iconClass: `${baseIconClass} text-color-text-almost-clear` },
    post: { icon: <IconAdd />, iconClass: `${baseIconClass} text-color-highlighted-clear lg:text-color-text-almost-clear lg:hover:text-color-highlighted-clear p-[2px]` },
    update: { icon: <IconEdit />, iconClass: `${baseIconClass} text-color-highlighted-clear lg:text-color-text-almost-clear lg:hover:text-color-highlighted-clear` },
    delete: { icon: <IconDelete />, iconClass: `${baseIconClass} text-red-400 lg:text-color-text-almost-clear lg:hover:text-red-500` },
  };

  const setModalState: any = () => {
    (action === 'update-default' || action === 'update-delete') && setItemIdToChange(itemId);
    setCollectionToChange(dataBaseCollection);
    switch (dataBaseCollection) {
      case 'personal_info':
        setProfileModal('personal-info');
        setProfileModalAction(action);
        break;
      case 'request_talent':
      case 'request_job':
        if (action === 'go-to-request') {
          setAccountModule(requestType)
        } else {
          setRequestModal(requestType);
          setRequestModalAction(action === 'update-delete' ? 'update-default' : 'post');
        }
        break;
      default:
        if (action === 'go-to-profile') {
          setAccountModule('Profile')
        } else {
          setProfileModal(dataBaseCollection);
          setProfileModalAction(action === 'update-delete' ? 'update-default' : 'post');
        }
        break;
    }
  };

  const setDeleteItem: any = () => {
    let elementName: any = () => {
      switch (dataBaseCollection) {
        case 'personal_info':
          return 'personalInfo'
        case 'request_talent':
          return 'requestTalent'
        case 'request_job':
          return 'requestJob';
        default:
          return dataBaseCollection;
      }
    };
    let textToMessageModal: any = () => {
      switch (dataBaseCollection) {
        case 'personal_info':
          return 'personal info'
        case 'request_talent':
          return 'request talent'
        case 'request_job':
          return 'request job';
        default:
          return dataBaseCollection;
      }
    };

    setMessageModal([{
      type: 'delete',
      text: `Do you want to delete this ${textToMessageModal()} item?`,
      click: () => {
        userDataHandlerFunction({
          token: token as string,
          userId: itemId,
          action: 'delete',
          collection: dataBaseCollection,
          data: '',
          onSuccess: () => {
            switch (dataBaseCollection) {
              case 'request_talent':
              case 'request_job':
                setUserRequestData((prevData: any) => ({
                  ...prevData,
                  [elementName()]: prevData[elementName()].filter((element: any) => element._id !== itemId)
                }));
                break;
              default:
                setUserProfileData((prevData: any) => ({
                  ...prevData,
                  [elementName()]: prevData[elementName()].filter((element: any) => element._id !== itemId)
                }));
                break;
            }
            setTimeout(() => {
              setMessageModal([{
                type: 'successful',
                text: `Your ${textToMessageModal()} item has been successfully deleted.`,
                click: () => setMessageModal([])
              }]);
            }, 500);
          },
          onError: (error: any) => {
            console.error(error);
            setMessageModal([{
              type: 'error',
              text: `An error occurred while deleting the ${dataBaseCollection} item.`,
              click: () => setMessageModal([])
            }]);
          }
        });
        setMessageModal([]);
      }
    }]);
  };

  const moduleButtons: any = {
    'menu-dashboard':
      <MenuDashboard
        buttonsAction={buttonsAction}
        renderCondition={shouldRenderButton}
        click={() => setModalState()}
      />,
    'post-dashboard':
      <PostDashboard
        buttonsAction={buttonsAction}
        renderCondition={shouldRenderButton}
        nameButtonPostDashboard={nameButtonPostDashboard[dataBaseCollection]}
        click={() => setModalState()}
      />,
    'post-account':
      <PostAccount
        buttonsAction={buttonsAction}
        screenNarrow={screenNarrow}
        renderCondition={shouldRenderButton}
        nameButtonPostAccount={nameButtonPostAccount[isDasboard ? dataBaseCollection : accountModule]}
        click={() => setModalState()}
      />,
    'update-delete-items':
      <UpdateDeleteItems
        buttonsAction={buttonsAction}
        renderCondition={shouldRenderButton}
        click={(value: string) => {
          switch (value) {
            case 'update-default':
              setModalState();
              break;
            case 'delete':
              setDeleteItem();
              break;
            default:
              break;
          }
        }}
      />
  };

  const ActiveButton: any = moduleButtons[buttonType];


  return (
    <div className={`${isMenuDashboard && 'absolute top-0 right-2'} ${isPostDashboard ? 'w-full' : 'w-fit'} h-full flex flex-row justify-end items-center z-20`}>
      {ActiveButton}
    </div>
  );
}

const MenuDashboard: any = ({ renderCondition, buttonsAction, click }: any) => {
  const [menuDashboardVisible, setMenuDashboardVisible] = useState<boolean>(true);

  return (
    renderCondition &&
    <div className="w-fit flex"
      onMouseEnter={() => setMenuDashboardVisible(false)}
      onMouseLeave={() => setMenuDashboardVisible(true)}
    >
      {
        menuDashboardVisible ?
          <i className={`${buttonsAction?.menu.iconClass}`}>
            {buttonsAction?.menu.icon}
          </i>
          :
          <button
            className="pl-1 flex flex-row justify-center items-center hover:cursor-default transition-all"
            onClick={() => click()}
          >
            <i className={`${buttonsAction?.update.iconClass}`}>
              {buttonsAction?.update.icon}
            </i>
          </button>
      }
    </div>
  )
}

const PostDashboard: any = ({ renderCondition, buttonsAction, nameButtonPostDashboard, click }: any) => {
  return (
    renderCondition &&
    <div id={`new-post`} className='w-full h-full flex flex-col justify-center items-center transition-all'>
      <button
        className='w-full flex flex-col justify-center items-center hover:cursor-default'
        onClick={() => click()}
      >
        <i className={`${buttonsAction?.post.iconClass}`}>
          {buttonsAction?.post.icon}
        </i>
        <h3 className='text-sm text-color-text-almost-clear transition-all'>
          {`Add ${nameButtonPostDashboard}`}
        </h3>
      </button>
    </div>
  )
}

const PostAccount: any = ({ buttonsAction, screenNarrow, nameButtonPostAccount, renderCondition, click }: any) => {
  return (
    renderCondition &&
    <button
      className="h-full flex flex-row items-center lg:hover:cursor-pointer transition-all"
      onClick={() => click()}
    >
      <h3 className='pr-2 text-base text-color-text-almost-clear transition-all'>
        {screenNarrow ? 'Add' : `Add ${nameButtonPostAccount}`}
      </h3>
      <i className={`${buttonsAction?.post.iconClass}`}>
        {buttonsAction?.post.icon}
      </i>
    </button>
  );
}

const UpdateDeleteItems: any = ({ buttonsAction, renderCondition, click }: any) => {
  return (
    renderCondition &&
    <>
      <button
        className="pl-1 flex flex-row justify-center items-center hover:cursor-default transition-all"
        onClick={() => click('update-default')}
      >
        <i className={`${buttonsAction?.update.iconClass}`}>
          {buttonsAction?.update.icon}
        </i>
      </button>
      <button
        className="pl-1 flex flex-row justify-center items-center hover:cursor-default transition-all"
        onClick={() => click('delete')}
      >
        <i className={`${buttonsAction?.delete.iconClass}`}>
          {buttonsAction?.delete.icon}
        </i>
      </button>
    </>
  )
};