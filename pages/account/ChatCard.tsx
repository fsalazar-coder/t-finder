import { useState, useEffect, useRef } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { IconBxChevronUp, IconCancel, IconSendMessage, IconUser } from '../../icons/icons';
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import Image from 'next/image';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


interface ChatDataUser {
  user_id: string,
  user_name: string,
  user_image: string
};

type RoundedSide = 'right' | 'left';
type PositionType = 'start' | 'center' | 'end' | 'single';



export default function ChatCard() {

  const { token, userId, userProfileImage, socket } = useAuthData();
  const { chatActived, setChatActived, chatDataUser } = useAuthUI();
  const [message, setMessage] = useState('');
  const [messageChange, setMessageChange] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [chatsData, setChatsData] = useState([]);
  const [updateChats, setUpdateChats] = useState<boolean>(false);
  const [lastMessageDate, setLastMessageDate] = useState('');

  const chatListRef = useRef<HTMLUListElement>(null);
  const chatUserName = (chatDataUser as ChatDataUser).user_name;
  const chatUserImage = (chatDataUser as ChatDataUser).user_image;
  const chatUserId = (chatDataUser as ChatDataUser).user_id;

  useEffect(() => {
    if (chatActived || updateChats) {
      userDataHandlerFunction({
        token: token as string,
        userId: userId as string,
        action: 'get',
        collectionName: 'chats',
        data: { to_user_id: chatUserId },
        onSuccess: (responseData: any) => setChatsData(responseData),
        onError: (error: any) => console.error(error)
      });
      setUpdateChats(false);
    };
  }, [token, userId, chatActived, updateChats]);

  useEffect(() => {
    socket?.on('notificacion', (data: any) => {
      const { toUserId, message } = data;
      if (toUserId === userId) {
        if (message === 'chat update') {
          setUpdateChats(true)
        }
        else { console.log('Data webSocket value: ', data) }
      }
    });
  }, []);

  useEffect(() => {
    const lastChatItem = chatListRef.current?.lastChild;
    if (lastChatItem && lastChatItem instanceof HTMLElement) {
      lastChatItem.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatsData]);


  const messageChatSubmitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      to_user_id: chatUserId,
      message: message
    };

    try {
      await userDataHandlerFunction({
        token: token as string,
        userId: userId as string,
        action: 'post',
        collectionName: 'chats',
        data: data,
        onSuccess: () => {
          socket?.emit('notification', { toUserId: chatUserId, message: 'chat update' });     //webSocket notification
        },
        onError: (error: any) => console.error(error)
      });
    }
    catch (error) {
      console.error('Error to send message:', error);
    }
    finally {
      setMessage('');
      setUpdateChats(true);
    }
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
  }

  function effectRoundedChat(roundedSide: RoundedSide, positionType: PositionType): string {
    const roundedStyles: Record<RoundedSide, Record<PositionType, string>> = {
      right: {
        start: 'rounded-tr-4xl rounded-l-4xl',
        center: 'rounded-l-4xl',
        end: 'rounded-br-4xl rounded-l-4xl',
        single: 'rounded-4xl'
      },
      left: {
        start: 'rounded-tl-4xl rounded-r-4xl',
        center: 'rounded-r-4xl',
        end: 'rounded-bl-4xl rounded-r-4xl',
        single: 'rounded-4xl'
      }
    };
    return roundedStyles[roundedSide][positionType] || 'rounded-4xl';
  }


  return (
    chatActived &&
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
            {
              chatUserImage ?
                <div className='w-full h-full flex flex-col justify-center items-center bg-white rounded-full z-20'>
                  <Image
                    className={`w-[95%] h-[95%] flex flex-col justify-center items-center rounded-full border-[1px] border-white`}
                    width={800}
                    height={800}
                    src={chatUserImage}
                    alt='profile-image'
                  />
                </div>
                :
                <i className={`w-full h-full text-2xl text-white font-light flex flex-row justify-center items-center border border-white rounded-full transition-all`}>
                  <IconUser />
                </i>
            }
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
              }}
            >
              <IconCancel />
            </i>
          </div>
        </div>
        {/**form container */}
        <div className='w-full h-[88%] flex flex-col'>
          <div className='w-full h-[86%] flex'>
            <SimpleBar
              className='simplebar-scrollbar w-full h-full flex flex-row justify-center'
              style={{ maxHeight: 350 }}
            >
              <ul
                className='w-full h-full pr-[5px] flex flex-col items-center'
                ref={chatListRef}
              >
                {
                  chatsData?.map((chat: any, index: any) => {
                    let { isMyMessage, isDifferentDate, roundedSide, positionType } = messageValues(chat, index, chatsData);
                    let messageEffect = effectRoundedChat(roundedSide as any, positionType as any);
                    let chatProfileImage = isMyMessage ? userProfileImage : chatUserImage

                    return (
                      <li className={`w-[98%] flex flex-col items-center`}>
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
                        <div className={
                          `${isMyMessage ? 'flex-row justify-end' : 'flex-row-reverse'} 
                      ${positionType === 'end' ? 'mb-1' : positionType === 'start' ? 'mt-1' : positionType === 'single' && 'my-1'} w-full py-[1px] flex`
                        }>
                          {/**message and time */}
                          <div className={`${isMyMessage && 'justify-end'} w-[88%] flex flex-row`}>
                            <div className={
                              `${isMyMessage && 'bg-color-clear'} ${messageEffect} px-4 py-1 flex flex-col border border-color-border`}>
                              <h4 className='w-full text-color-text-dark text-sm'>
                                {chat.message}
                              </h4>
                              <div className='w-full flex flex-row justify-end'>
                                <h6 className='w-fit flex text-color-text-medium text-[10px]'>
                                  {chat.message_time}
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className='w-[12%] flex flex-row justify-center items-center'>
                            <div className='w-8 h-8 flex flex-col justify-center items-center z-20'>
                              {
                                //profile image from messaging user
                                (positionType === 'end' || positionType === 'single') && (
                                  chatProfileImage ?
                                    <Image
                                      className={`w-[95%] h-[95%] flex flex-col justify-center items-center rounded-full border border-color-highlighted`}
                                      width={800}
                                      height={800}
                                      src={chatProfileImage}
                                      alt='profile-image'
                                    />
                                    :
                                    <i className={`w-[95%] h-[95%] text-2xl text-color-clear font-light flex flex-row justify-center items-center border border-color-border rounded-full transition-all`}>
                                      <IconUser />
                                    </i>
                                )}
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </SimpleBar>
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