import { useState, useEffect, useRef } from 'react';
import { useAuthData, useAuthUI } from "../../context/authContext";
import { IconBxChevronUp, IconCancel, IconSendMessage } from '../../icons/icons';
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import dateTimeFunction from '../api/dateTimeFunction';
import ImageIconUser from './ImageIconUser';
//import SimpleBar from 'simplebar-react';
//import 'simplebar/dist/simplebar.min.css';


interface ChatDataUser {
  user_id: string,
  user_name: string,
  user_image_url: string
};

interface UnreadMessagesForUser {
  [key: string]: number
}

interface ChatData {
  to_user_id: string;
  message: string;
}

type RoundedSide = 'right' | 'left';
type PositionType = 'start' | 'center' | 'end' | 'single';



export default function ChatCard() {

  const { token, userId, userChatsData, setUserChatsData, setIsGettingChatData, socket, setUnreadMessagesForUser } = useAuthData();
  const { accountModule, chatActived, setChatActived, chatDataUser, setChatDataUser, } = useAuthUI();
  const [message, setMessage] = useState('');
  const [messageChange, setMessageChange] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [lastMessageDate, setLastMessageDate] = useState('');

  const chatListRef = useRef<HTMLUListElement>(null);
  const chatUserId: string = (chatDataUser as ChatDataUser).user_id;
  const chatUserName: string = (chatDataUser as ChatDataUser).user_name;
  const chatUserImageUrl: string = (chatDataUser as ChatDataUser).user_image_url;

  ///get chats 
  useEffect(() => {
    if (token && userId && chatActived) {
      const fetchChats = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get',
          collectionName: 'chats',
          data: { from_user_id: chatUserId },
          onSuccess: (responseData: any) => {
            setUserChatsData(responseData);
          },
          onError: (error: any) => console.error(error)
        });
      }
      fetchChats().then(() => {
        setIsGettingChatData(false);
        setUnreadMessagesForUser((prevMessages: UnreadMessagesForUser) => ({
          ...prevMessages,
          [chatUserId]: 0
        }));
      })
    };
  }, [chatActived]);

  //web-socket listener
  ///useEffect(() => {
  ///  if (token && socket && chatActived && !getChatData) {
  ///    socket.on('message', (data: SocketsMessages) => { setChatsData(prevChats => [...prevChats, data]) });
  ///    return () => { socket.off('message') };
  ///  }
  ///}, [socket, getChatData]);

  useEffect(() => {
    let lastChatItem = chatListRef.current?.lastChild;
    if (lastChatItem && lastChatItem instanceof HTMLElement) {
      lastChatItem.scrollIntoView({ behavior: 'smooth' });
    }
  }, [userChatsData]);

  useEffect(() => { !isConnections && setChatActived(false) }, [accountModule]);

  const messageChatSubmitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    const date: any = dateTimeFunction('date');
    const time: any = dateTimeFunction('time');
    const data: SocketsMessages = {
      to_user_id: chatUserId,
      from_user_id: userId as string,
      message: message,
      message_date: date,
      message_time: time,
      message_status: 'unread',
    };
    await userDataHandlerFunction({
      token: token as string,
      userId: userId as string,
      action: 'post',
      collectionName: 'chats',
      data: data,
      onSuccess: () => { socket?.emit('message', data) },                     //webSocket notification
      onError: (error: any) => console.error(error)
    });
    setUserChatsData(prevChats => [...prevChats, data]);
    setMessage('');
  };

  function messageValues(chat: any, index: number, chatsData: any) {
    let fromUserId = chat.from_user_id;
    let isMyMessage = fromUserId === userId;
    let messageDate = chat.message_date;
    let messageDatePrevious = index === 0 ? '' : chatsData[index - 1].message_date;
    let isDifferentDate = messageDate !== messageDatePrevious;
    let fromUserIdPrevious = index === 0 ? '' : chatsData[index - 1].from_user_id;
    let fromUserIdNext = index + 1 < chatsData.length ? chatsData[index + 1].from_user_id : '';
    let isMessageStart = fromUserId !== fromUserIdPrevious && fromUserId === fromUserIdNext;
    let isMessageCenter = fromUserId === fromUserIdPrevious && fromUserId === fromUserIdNext;
    let isMessageEnd = fromUserId === fromUserIdPrevious && fromUserId !== fromUserIdNext;
    let roundedSide = isMyMessage ? 'right' : 'left';
    let positionType = isMessageStart ? 'start' : isMessageCenter ? 'center' : isMessageEnd ? 'end' : 'single';

    return { isMyMessage, isDifferentDate, roundedSide, positionType };
  };

  function effectRoundedChat(roundedSide: RoundedSide, positionType: PositionType): string {
    const roundedStyles: Record<RoundedSide, Record<PositionType, string>> = {
      right: {
        start: 'rounded-tr-2xl rounded-l-2xl',
        center: 'rounded-l-2xl',
        end: 'rounded-br-2xl rounded-l-2xl',
        single: 'rounded-2xl'
      },
      left: {
        start: 'rounded-tl-2xl rounded-r-2xl',
        center: 'rounded-r-2xl',
        end: 'rounded-bl-2xl rounded-r-2xl',
        single: 'rounded-2xl'
      }
    };
    return roundedStyles[roundedSide][positionType] || 'rounded-2xl';
  };

  function effectPadding(positionType: string) {
    switch (positionType) {
      case 'end':
        return 'mb-1';
      case 'start':
        return 'mt-1';
      case 'single':
        return 'my-1';
      default:
        break;
    }
  };

  const isConnections: boolean = accountModule === 'Connections';


  return (
    (isConnections && chatActived) &&
    <div
      className={
        `${chatActived ?
          'flex flex-col scale-100 animate-[appear-bottom_0.50s]' : 'scale-0 animate-[zoom-out_0.30s] flex-none'} 
          ${chatMinimized ? 'translate-y-[90%]' : 'translate-y-[0%]'}
          container w-80 h-[90%] lg:h-[75%] fixed bottom-1 right-1 items-center bg-white border border-color-border rounded-md shadow-lg transform transition-all z-[100]`
      }
    >
      {/**content */}
      <div className='w-full h-full flex flex-col justify-start items-center'>
        {/**header form */}
        <div className='w-full h-[12%] p-2 flex flex-row justify-between items-center bg-color-highlighted rounded-t-md'>
          {/**profile image from user contacted */}
          <div className='w-10 h-10 flex flex-row items-center'>
            <ImageIconUser
              type={'title-chat'}
              otherUserImageUrl={chatUserImageUrl}
            />
          </div>
          {/**full name from user contacted */}
          <div className='w-52 h-fit flex flex-row'>
            <h2 className='w-full pl-2 text-white text-sm lg:text-base'>
              {chatUserName}
            </h2>
          </div>
          {/**icon-close and minimize */}
          <div className='w-14 h-fit flex flex-row justify-between'>
            <i
              className={
                `${!chatMinimized && 'rotate-180'} h-fit text-white lg:text-color-highlighted-clear lg:hover:text-white text-2xl lg:xl flex justify-center cursor-default lg:cursor-pointer transform transition-all`}
              onClick={() => setChatMinimized(!chatMinimized)}
            >
              <IconBxChevronUp />
            </i>
            <i
              className='h-fit text-white lg:text-color-highlighted-clear lg:hover:text-white text-2xl lg:xl flex justify-center cursor-default lg:cursor-pointer'
              onClick={() => {
                setChatActived(false);
                setChatMinimized(false);
                setLastMessageDate('');
                setUserChatsData([]);
                setChatDataUser({});
              }}
            >
              <IconCancel />
            </i>
          </div>
        </div>
        {/**form container */}
        <div className='w-full h-[88%] flex flex-col'>
          <div className='w-full h-[86%] flex'>
            <ul
              className='w-full h-full flex flex-col items-center overflow-y-auto'
              ref={chatListRef}
            >
              {
                userChatsData?.map((chat: any, index: any) => {
                  let { isMyMessage, isDifferentDate, roundedSide, positionType } = messageValues(chat, index, userChatsData);
                  let messageEffectBorder = effectRoundedChat(roundedSide as any, positionType as any);
                  let chatProfileImageUrlToRender: any = isMyMessage ? '' : chatUserImageUrl;
                  let messageEffectPadding: any = effectPadding(positionType);

                  return (
                    <li key={index} className={`w-[95%] flex flex-col items-center`}>
                      {
                        isDifferentDate &&
                        /**date */
                        <div className={`w-full relative my-2 flex flex-row justify-center`}>
                          <h6 className='w-fit h-fit py-1 px-4 flex text-color-text-medium text-[10px] bg-white border border-color-border outline outline-white rounded-full z-10'>
                            {chat.message_date}
                          </h6>
                          <div className='w-full h-fit absolute top-1/2 bg-white border-b border-color-border rounded-full z-0' />
                        </div>
                      }
                      <div className={`${isMyMessage ? 'flex-row justify-end' : 'flex-row-reverse'} ${messageEffectPadding} w-full py-[1px] flex items-end`}>
                        <div className={`${isMyMessage && 'justify-end'} w-[88%] flex flex-row`}>
                          <div className={`${isMyMessage && 'bg-color-clear'} ${messageEffectBorder} px-4 py-1 flex flex-col border border-color-border`}>
                            {/**message */}
                            <h4 className='w-full text-color-text-dark text-sm'>
                              {chat.message}
                            </h4>
                            {/**message time */}
                            <div className='w-full flex flex-row justify-end'>
                              <h6 className='w-fit flex text-color-text-medium text-[10px]'>
                                {chat.message_time}
                              </h6>
                            </div>
                          </div>
                        </div>
                        {/** profile images to messages */}
                        <div className='w-[12%] pb-1 flex flex-row justify-center items-center'>
                          <div className='w-8 h-8 flex flex-col justify-center items-center z-20'>
                            {
                              (positionType === 'end' || positionType === 'single') &&
                              <ImageIconUser
                                type={'message-chat'}
                                otherUserImageUrl={chatProfileImageUrlToRender}
                              />
                            }
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          {/**form-box */}
          <form
            className='w-full h-[14%] px-2 flex flex-row justify-center items-center border-t border-color-border'
            onSubmit={(e) => messageChatSubmitHandle(e)}
          >
            {/**messages input */}
            <div className='w-5/6 h-10 flex flex-col justify-start items-start border border-color-border rounded-full'>
              <input
                type='text'
                id='message-chat'
                name='chat'
                className={`w-full h-fit pl-4 py-1 text-sm lg:text-base bg-transparent outline-none transition-all overflow-x-auto z-10`}
                placeholder={`write a message`}
                required
                value={message}
                onFocus={() => setMessageChange(true)}
                onBlur={(e) => setMessageChange(false)}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {/**button submit message */}
            <div className='w-11 h-10 pl-1 flex flex-col justify-center items-center'>
              <button
                type='submit'
                className={
                  `${message ?
                    'font-bold bg-color-highlighted lg:bg-color-highlighted-clear lg:hover:bg-color-highlighted cursor-default lg:cursor-pointer' :
                    'bg-slate-400 cursor-default'} 
                    w-full h-full text-slate-50 lg:hover:text-white lg:hover:font-bold flex flex-row justify-center items-center rounded-full transition-all z-30`
                }
              >
                <i className='w-fit h-fit flex text-2xl leading-none tracking-wider'>
                  <IconSendMessage />
                </i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}