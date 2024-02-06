import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./ContextAuth";


interface MessagesModal {
  type: string,     // types: successful, error, question, logout, delete
  text: string,
  click: () => void
}

interface UIProviderProps {
  children: ReactNode;
}

/// interface about UI context props unauthenticated and authenticated
interface ContextUIProps {
  screenNarrow: boolean;
  setScreenNarrow: React.Dispatch<React.SetStateAction<boolean>>;
  hamburguerMenuActive: boolean;
  setHamburguerMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownHome: boolean;
  setDropdownHome: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownAuth: boolean;
  setDropdownAuth: React.Dispatch<React.SetStateAction<boolean>>;
  accountActived: boolean;
  setAccountActived: React.Dispatch<React.SetStateAction<boolean>>;
  accountModule: string;
  setAccountModule: React.Dispatch<React.SetStateAction<string>>;
  requestMenu: string;
  setRequestMenu: React.Dispatch<React.SetStateAction<string>>;
  blogModal: boolean;
  setBlogModal: React.Dispatch<React.SetStateAction<boolean>>;
  messageModal: MessagesModal[] | [];
  setMessageModal: React.Dispatch<React.SetStateAction<MessagesModal[] | []>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContextUI = createContext<ContextUIProps | undefined>(undefined);

export const UIProvider = ({ children }: UIProviderProps): JSX.Element => {
  const { joinModal, setJoinModal, loginModal, setLoginModal,
    passwordResetModal, setPasswordResetModal, isLoggingOut, setCleanupDone } = useAuth();
  const [screenNarrow, setScreenNarrow] = useState<boolean>(false);
  const [hamburguerMenuActive, setHamburguerMenuActive] = useState<boolean>(false);
  const [dropdownHome, setDropdownHome] = useState<boolean>(false);
  const [dropdownAuth, setDropdownAuth] = useState<boolean>(false);
  const [accountActived, setAccountActived] = useState<boolean>(false);
  const [accountModule, setAccountModule] = useState<string>('');
  const [requestMenu, setRequestMenu] = useState<string>('');
  const [blogModal, setBlogModal] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<MessagesModal[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const screenNarrowHandle: any = () => {
    window.innerWidth < 768 ? setScreenNarrow(true) : setScreenNarrow(false);
  };

  const isMessageModal: boolean = messageModal.length > 0;

  const modalCloseEscapeHandle = (e: any) => {
    if ((e.charCode | e.keyCode) === 27) {
      blogModal && setBlogModal(false);
      joinModal && setJoinModal(false);
      loginModal && setLoginModal(false);
      passwordResetModal && setPasswordResetModal(false);
      messageModal && setMessageModal([]);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', screenNarrowHandle);
    screenNarrowHandle();
    return () => { window.removeEventListener('resize', screenNarrowHandle) };
  });

  useEffect(() => {
    document.addEventListener('keydown', modalCloseEscapeHandle);
    return () => { document.removeEventListener('keydown', modalCloseEscapeHandle) };
  }, [joinModal, loginModal, isMessageModal, blogModal]);

  useEffect(() => {
    const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;
    if (joinModal || loginModal || isMessageModal || blogModal) {
      const scrollbarWidth = getScrollbarWidth();
      document.body.style.overflowY = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;     ///`${scrollbarWidth}px`
    } else {
      document.body.style.overflowY = 'auto';
      document.body.style.paddingRight = '0px';
    }
  }, [joinModal, loginModal, isMessageModal, blogModal]);

  /// logout, clear data
  useEffect(() => {
    if (isLoggingOut) {
      setDropdownAuth(false);
      setAccountActived(false);
      setAccountModule('');
      setRequestMenu('');
      setMessageModal([]);
      setCleanupDone(prev => ({ ...prev, uiCleaned: true }));
    };
  }, [isLoggingOut, setCleanupDone]);


  return (
    <ContextUI.Provider value={
      {
        screenNarrow, setScreenNarrow,
        hamburguerMenuActive, setHamburguerMenuActive,
        dropdownHome, setDropdownHome,
        dropdownAuth, setDropdownAuth,
        accountActived, setAccountActived,
        accountModule, setAccountModule,
        requestMenu, setRequestMenu,
        blogModal, setBlogModal,
        messageModal, setMessageModal,
        loading, setLoading,
      }
    }>
      {children}
    </ContextUI.Provider>
  );
}

export function useUI(): ContextUIProps {
  const context = useContext(ContextUI)!;
  return context;
};