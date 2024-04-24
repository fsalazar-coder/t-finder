import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { userDataHandlerFunction } from "@/pages/api/userDataHandlerFunction";
import { useUI } from "./ContextUI";
import { useAuth } from "./ContextAuth";
import { useAuthData } from "./ContextAuthData";
import io, { Socket } from 'socket.io-client';

interface UserNotificationsData {
  _id: string,
  created_date: string,
  notification_type: string,
  to_request_id: string,
  user_id: string,
  full_name: string,
  user_image_url: string,
  company_name: string,
  job_location: string,
  job_description: string,
  candidate_location: string,
  candidate_talent_category: string,
  notification_status: string
}

interface UserConnectedData {
  _id: string,
  type: string,
  user_id: string,
  user_image_url: string,
  full_name: string,
  profession_occupation: string,
  preferred_language: string,
  location: string,
  created_date: string,
}

interface ChatDataUser {
  user_id: string,
  user_name: string,
  user_image_url: string,
}

interface UserChatsData {
  to_user_id: string,
  from_user_id: string,
  message: string,
  message_date: string,
  message_time: string,
  message_status: string
}

interface UnreadMessagesForUser {
  [key: string]: number
}

interface SocketProviderProps {
  children: ReactNode;
}

interface ContextAuthSocketProps {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  usersConnectedData: UserConnectedData[] | [];
  setUsersConnectedData: React.Dispatch<React.SetStateAction<UserConnectedData[]>>;
  userNotificationsData: UserNotificationsData[] | [];
  setUserNotificationsData: React.Dispatch<React.SetStateAction<UserNotificationsData[] | []>>;
  unreadNotifications: number;
  setUnreadNotifications: React.Dispatch<React.SetStateAction<number>>;
  chatDataUser: {};
  setChatDataUser: React.Dispatch<React.SetStateAction<{} | {}>>;
  chatActived: boolean;
  setChatActived: React.Dispatch<React.SetStateAction<boolean>>;
  userChatsData: UserChatsData[] | [];
  setUserChatsData: React.Dispatch<React.SetStateAction<UserChatsData[]>>;
  isGettingChatData: boolean;
  setIsGettingChatData: React.Dispatch<React.SetStateAction<boolean>>;
  unreadMessages: number;
  setUnreadMessages: React.Dispatch<React.SetStateAction<number>>;
  unreadMessagesForUser: UnreadMessagesForUser;
  setUnreadMessagesForUser: React.Dispatch<React.SetStateAction<UnreadMessagesForUser>>;
}

const ContextAuthSocket = createContext<ContextAuthSocketProps | undefined>(undefined);

export const AuthSocketProvider = ({ children }: SocketProviderProps): JSX.Element => {
  const { accountModule } = useUI();
  const { token, userId, isLoggingOut, setCleanupDone } = useAuth();
  const { update, setUpdate, updateCounter, setUpdateCounter } = useAuthData();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [usersConnectedData, setUsersConnectedData] = useState<UserConnectedData[]>([]);
  const [userNotificationsData, setUserNotificationsData] = useState<UserNotificationsData[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const [isGettingNotificationsData, setIsGettingNotificationsData] = useState(true);
  const [chatDataUser, setChatDataUser] = useState<ChatDataUser | {}>({});
  const [chatActived, setChatActived] = useState<boolean>(false);
  const [userChatsData, setUserChatsData] = useState<any[]>([]);
  const [isGettingChatData, setIsGettingChatData] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [unreadMessagesForUser, setUnreadMessagesForUser] = useState<UnreadMessagesForUser>({});
  const isNotifications: boolean = accountModule === 'Notifications';

  const userNotificationsDataUpdate = (data: NotificationsParams) => {
    userDataHandlerFunction({
      token: token as string,
      userId: userId as string,
      action: 'get-one-user-notification-data',
      collection: 'notifications',
      data: data,
      onSuccess: (responseData: any) => {
        setUserNotificationsData(prevNotifications => [...prevNotifications, responseData]);
      },
      onError: (error: any) => console.error(error)
    });
  };

  //web-socket connection
  useEffect(() => {
    if (token && userId) {
      const newSocket = io('http://localhost:3000', { query: { token: token as string } });
      newSocket.on('connect', () => {
        console.log('Conectado al servidor WebSocket')
      });
      setSocket(newSocket);
    }
    else if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [token, userId]);

  // get connections
  useEffect(() => {
    if (token && userId && (update === 'all' || update === 'connections')) {
      setUpdateCounter((counter) => counter + 1);
      const fetchConnectedUserData = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-connected-user-info',
          collection: 'connections',
          data: '',
          onSuccess: (responseData: any) => {
            setUsersConnectedData(responseData);
          },
          onError: (error: any) => console.error(error)
        });
      }
      fetchConnectedUserData().then(() => {
        setUpdateCounter((counter) => counter - 1);
        if ((update === 'all' && updateCounter === 0) || update === 'connections') {
          setUpdate('');
        }
      })
    };
  }, [token, userId, update]);

  // get notifications
  useEffect(() => {
    if (token && userId && (update === 'all' || update === 'notifications')) {
      setUpdateCounter((counter) => counter + 1);
      const fetchUserNotificationsData = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-default',
          collection: 'notifications',
          data: '',
          onSuccess: (responseData: any) => {
            setUserNotificationsData(responseData);
          },
          onError: (error: any) => console.error(error)
        });
      }
      fetchUserNotificationsData().then(() => {
        setIsGettingNotificationsData(false);
        setUpdateCounter((counter) => counter - 1);
        if ((update === 'all' && updateCounter === 0) || update === 'notifications') {
          setUpdate('');
        }
      })
    };
  }, [token, userId, update]);

  ///get unread notifications 
  useEffect(() => {
    if (token && userId && update === 'all') {
      setUpdateCounter((counter) => counter + 1);
      const fetchUnreadNotifications = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-unread-notifications',
          collection: 'notifications',
          data: '',
          onSuccess: (responseData: any) => {
            setUnreadNotifications(responseData);
          },
          onError: (error: any) => console.error(error)
        });
      };
      fetchUnreadNotifications().then(() => {
        setUpdateCounter((counter) => counter - 1);
        if (update === 'all' && updateCounter === 0) {
          setUpdate('');
        }
      });
    };
  }, [token, userId, update]);

  //actualizacion de las notificaciones de UNREAD a READ
  useEffect(() => {
    if (token && userId && isNotifications) {
      const fetchChats = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'update-notifications-unread-to-read',
          collection: 'notifications',
          data: '',
          onSuccess: () => {
            setUnreadNotifications(0);
            setUserNotificationsData(userNotificationsData.map((notification) =>
              notification.notification_status === 'unread' ? { ...notification, notification_status: 'read' } : notification
            ));
          },
          onError: (error: any) => console.error(error)
        });
      }
      fetchChats().then(() => { })
    };
  }, [token, userId, accountModule]);

  //web-socket notifications listener
  useEffect(() => {
    if (token && socket && !isGettingNotificationsData) {
      socket.on('notification', (data: NotificationsParams) => {
        userNotificationsDataUpdate(data);
        const { notification_type } = data;
        notification_type === 'request-accepted' && setUpdate('connections');
        if (!isNotifications) { setUnreadNotifications((prevUnread: number) => prevUnread + 1) }
      });
      return () => { socket.off('notification') };
    }
  }, [token, socket, isGettingNotificationsData]);

  ///get unread messages on chats 
  useEffect(() => {
    if (token && userId && update === 'all') {
      setUpdateCounter((counter) => counter + 1);
      const fetchUnreadMessage = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get-unread-messages',
          collection: 'connections',
          data: '',
          onSuccess: (responseData: any) => {
            setUnreadMessagesForUser(responseData.unreadMessagesByUser);
            setUnreadMessages(responseData.totalUnreadMessages);
          },
          onError: (error: any) => console.error(error)
        });
      };
      fetchUnreadMessage().then(() => {
        setUpdateCounter((counter) => counter - 1);
        if (update === 'all' && updateCounter === 0) {
          setUpdate('');
        }
      });
    };
  }, [token, userId, update]);

  //web-socket message listener
  useEffect(() => {
    if (token && socket && chatActived && !isGettingChatData) {
      socket.on('message', (data: MessagesParams) => {
        setUserChatsData(prevChats => [...prevChats, data])
      });
      return () => { socket.off('message') };
    }
    else if (token && socket && !chatActived) {
      socket.on('message', (data: MessagesParams) => {
        const { from_user_id } = data;
        setUnreadMessages((prevUnread: number) => prevUnread + 1);
        setUnreadMessagesForUser((prevMessages: UnreadMessagesForUser) => ({
          ...prevMessages,
          [from_user_id]: (prevMessages[from_user_id] || 0) + 1
        }));
      });
      return () => { socket.off('message') };
    }
  }, [token, socket, chatActived, isGettingChatData]);

  /// logout, clear data
  useEffect(() => {
    if (isLoggingOut) {
      setUsersConnectedData([]);
      setUserNotificationsData([]);
      setUnreadNotifications(0);
      setIsGettingNotificationsData(true);
      setChatDataUser({});
      setChatActived(false);
      setUserChatsData([]);
      setIsGettingChatData(true);
      setUnreadMessages(0);
      setUnreadMessagesForUser({});
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      setCleanupDone(prev => ({ ...prev, authSocketCleaned: true }));
    }
  }, [isLoggingOut, setCleanupDone]);


  return (
    <ContextAuthSocket.Provider value={{
      socket, setSocket,
      usersConnectedData, setUsersConnectedData,
      userNotificationsData, setUserNotificationsData,
      unreadNotifications, setUnreadNotifications,
      chatDataUser, setChatDataUser,
      chatActived, setChatActived,
      userChatsData, setUserChatsData,
      isGettingChatData, setIsGettingChatData,
      unreadMessages, setUnreadMessages,
      unreadMessagesForUser, setUnreadMessagesForUser,
    }}>
      {children}
    </ContextAuthSocket.Provider>
  );
}

export function useAuthSocket(): ContextAuthSocketProps {
  const context = useContext(ContextAuthSocket)!;
  return context;
};