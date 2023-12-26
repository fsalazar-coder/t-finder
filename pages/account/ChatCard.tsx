import { useState, useEffect } from 'react';
import { useAuthUI, useUI } from "../../context/authContext";
import { IconBxChevronUp, IconCancel, IconUser } from '../../icons/icons';
import Image from 'next/image';
import axios from 'axios';

interface ChatDataUser {
  user_id: string,
  user_name: string,
  user_image: string
}


export default function ChatCard() {

  const { chatActived, setChatActived, chatDataUser } = useAuthUI();
  const [message, setMessage] = useState('');
  const [messageChange, setMessageChange] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);

  const messageChatSubmitHandle = async (e: React.FormEvent) => {
    e.preventDefault();

  };

  const chatUserId = (chatDataUser as ChatDataUser).user_id;
  const userName = (chatDataUser as ChatDataUser).user_name;
  const userImage = (chatDataUser as ChatDataUser).user_image;


  return (
    chatActived &&
    <div
      className={
        `${chatActived ?
          'flex flex-col scale-100 animate-[zoom-in_0.50s]' : 'scale-0 animate-[zoom-out_0.30s] flex-none'} 
          ${chatMinimized ? 'translate-y-[90%]' : 'translate-y-[0%]'}
          container w-[95%] lg:w-80 h-[90%] lg:h-[75%] fixed bottom-1 right-1 items-center bg-white rounded-md shadow-lg transform transition-all z-[100]`
      }
    >
      {/**content */}
      <div className='w-full h-full flex flex-col justify-start items-center'>
        {/**header form */}
        <div className='w-full h-14 p-2 flex flex-row justify-between bg-slate-950 rounded-t-md'>
          {/**profile image from user contacted */}
          <div className='w-8 lg:w-10 h-8 lg:h-10 flex flex-row items-center'>
            {
              userImage ?
                <div className='w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-fuchsia-400 to-fuchsia-950 rounded-full z-20'>
                  <Image
                    className={`w-[95%] h-[95%] flex flex-col justify-center items-center rounded-full border-[1px] border-white`}
                    width={800}
                    height={800}
                    src={userImage}
                    alt='profile-image'
                  />
                </div>
                :
                <i className={`w-full h-full text-2xl text-slate-50 font-light flex flex-row justify-center items-center border border-slate-50 rounded-full transition-all`}>
                  <IconUser />
                </i>
            }

          </div>
          {/**full name from user contacted */}
          <div className='w-8 lg:w-52 h-full flex flex-row'>
            <h2 className='w-full pl-2 text-white text-sm lg:text-base'>
              {userName}
            </h2>
          </div>
          {/**icon-close and minimize */}
          <div className='lg:w-14 h-full flex flex-row justify-between'>
            <i
              className={
                `${!chatMinimized && 'rotate-180'} h-fit text-white lg:text-gray-600 lg:hover:text-white text-2xl lg:xl flex justify-center cursor-default lg:cursor-pointer transform transition-all`}
              onClick={() => setChatMinimized(!chatMinimized)}
            >
              <IconBxChevronUp />
            </i>
            <i
              className='h-fit text-white lg:text-gray-600 lg:hover:text-white text-2xl lg:xl flex justify-center cursor-default lg:cursor-pointer'
              onClick={() => setChatActived(false)}
            >
              <IconCancel />
            </i>
          </div>
        </div>
        {/**form container */}
        <div className='w-full h-full p-2 lg:p-4 flex flex-col'>
          <div className='w-full h-full p-2 lg:p-4'>
            messages
          </div>
          {/**form-box */}
          <form
            className='w-full h-fit flex flex-row justify-center'
            onSubmit={(e) => messageChatSubmitHandle(e)}
          >
            {/**messages input */}
            <div className='w-5/6 h-10 flex flex-col justify-start items-start border border-color-border-clear rounded-full'>
              <input
                type='text'
                id='message-chat'
                name='chat'
                className={`w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent outline-none transition-all z-10`}
                placeholder={`write a message`}
                value={message}
                required
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
                    'font-bold bg-green-400 lg:bg-green-300 lg:hover:bg-green-400 cursor-default lg:cursor-pointer' :
                    'bg-slate-400 cursor-default'} 
                    w-full h-full text-slate-50 lg:hover:text-white lg:hover:font-bold flex flex-row justify-center items-center rounded-full transition-all z-30`
                }
              >
                <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                  S
                </h5>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}