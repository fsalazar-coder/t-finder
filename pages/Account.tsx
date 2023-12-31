"use client"
import { useEffect } from "react";
import { useAuthData, useAuthUI, useUI } from "../context/authContext";
import Dropdown from './components/Dropdown';
import AccountNavbar from "./account/AccountNavbar";
import Dashboard from "./account/Dashboard";
import Profile from "./account/Profile";
import ProfileModal from "./account/ProfileModal";
import TalentRequest from "./account/TalentRequest";
import JobRequest from "./account/JobRequest";
import RequestModal from "./account/RequestModal";
import Notifications from "./account/Notifications";
import Settings from "./account/Settings";
import MessageModal from './components/MessageModal';
import {
  IconBxlLinkedin,
  IconFacebook,
  IconInstagram,
  IconTwitter
} from '../icons/icons';
import ChatCard from "./account/ChatCard";

// Define a type for the modules object
type ModuleComponents = {
  [key: string]: React.ComponentType<any>;
};

const navegationC: any = [
  { id: 'icon-facebook', icon: <IconFacebook /> },
  { id: 'icon-twitter', icon: <IconTwitter /> },
  { id: 'icon-linkedin', icon: <IconBxlLinkedin /> },
  { id: 'icon-instagram', icon: <IconInstagram /> }
];

export default function Account() {

  const { token } = useAuthData();
  const { accountActived, accountModule } = useAuthUI();
  const { screenNarrow, setDropdown } = useUI();

  useEffect(() => {
    if (accountActived && !screenNarrow) {
      setDropdown(false);
    }
  }, [accountActived, screenNarrow, setDropdown]);

  const modules: ModuleComponents = {
    'Dashboard': Dashboard,
    'Profile': Profile,
    'Talent': TalentRequest,
    'Job': JobRequest,
    'Notifications': Notifications,
    'Settings': Settings,
  };

  const ActiveModule = modules[accountModule as keyof ModuleComponents] || Dashboard;


  if (!token) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center bg-slate-100'>
        <h1 className="w-screen py-10 text-xl text-white text-center font-bold bg-slate-950">
          You is not login!!
        </h1>
      </main>
    )
  }

  return (
    <main className='w-full relative font-montserrat select-none flex flex-col items-center bg-color-clear'>
      <div className='w-auto h-auto'>
        <AccountNavbar />
      </div>
      <div className="w-full min-h-screen flex flex-col justify-between items-center">
        {/**dashboard, profile, requests, notifications, account settings, help and support */}
        <div className='w-full lg:pl-1/6'>
          {(!screenNarrow || accountModule !== 'Dashboard') && <ActiveModule />}
        </div>
        {/***Copyright footer***/}
        <div className="w-full flex flex-col border-t border-color-border-clear bg-transparent">
          <div
            id='contact'
            className='w-full h-auto lg:h-10 pl-[17rem] pr-8 py-5 lg:py-2 flex flex-col-reverse lg:flex-row justify-between items-center'>
            <h2 className='w-1/2 h-full text-color-text-medium text-xs lg:text-sm text-center sm:text-start pt-2 sm:pt-0'>
              © 2023 - Decalin-stack all right reserved
            </h2>
            <ul className='w-1/2 h-full flex flex-row justify-center sm:justify-end items-center list-none'>
              {
                navegationC.map((element: any) => {
                  return (
                    <li
                      key={element.id}
                      className='w-fit h-full px-5 sm:px-0 sm:pl-10 flex flex-col justify-center sm:items-center cursor-pointer'>
                      <i className='w-fit h-fit text-color-text-medium text-2xl sm:text-lg md:text-xl text-center lg:hover:transform hover:text-color-text-dark lg:hover:scale-[1.2] transition-all'>
                        {element.icon}
                      </i>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>

      <Dropdown />

      <ProfileModal />

      <RequestModal />

      <MessageModal />
      
      <ChatCard />
    </main>
  )
}