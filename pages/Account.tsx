"use client"
import { useEffect } from "react";
import { useUI } from "@/context/ContextUI";
import { IconBxlLinkedin, IconFacebook, IconInstagram, IconTwitter } from '../icons/icons';
import Dropdown from './components/Dropdown';
import NavbarAccount from "./account/NavbarAccount";
import Dashboard from "./account/Dashboard";
import Profile from "./account/Profile";
import Request from "./account/Request";
import Notifications from "./account/Notifications";
import ChatCard from "./account/ChatCard";
import ProfileModal from "./account/ProfileModal";
import RequestModal from "./account/RequestModal";
import Connections from "./account/Connections";

const navegationC: any = [
  { id: 'icon-facebook', icon: <IconFacebook /> },
  { id: 'icon-twitter', icon: <IconTwitter /> },
  { id: 'icon-linkedin', icon: <IconBxlLinkedin /> },
  { id: 'icon-instagram', icon: <IconInstagram /> }
];


export default function Account({ renderCondition }: any) {
  const { screenNarrow, setDropdown, accountActived, accountModule } = useUI();

  useEffect(() => {
    if (accountActived && !screenNarrow) {
      setDropdown(false);
    }
  }, [accountActived, screenNarrow, setDropdown]);

  const modules: any = {
    'Dashboard': <Dashboard />,
    'Profile': <Profile />,
    'Talent': <Request requestType='Talent' />,
    'Job': <Request requestType='Job' />,
    'Notifications': <Notifications />,
    'Connections': <Connections />,
  };

  const ActiveModule: any = modules[accountModule] || <Dashboard />;


  return (
    renderCondition &&
    <div className="w-full min-h-screen flex flex-col justify-between items-center">
      <NavbarAccount />
      <Dropdown />
      <ProfileModal />
      <RequestModal />
      <ChatCard />
      {/**dashboard, profile, requests, notifications, account settings, help and support */}
      <div className='w-full md:pl-24'>
        {ActiveModule}
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
  )
}