"use client"
import { useEffect } from "react";
import { useUI } from "@/context/ContextUI";
import { IconBxlLinkedin, IconFacebook, IconInstagram, IconTwitter } from '../icons/icons';
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
  const { screenNarrow, setDropdownAuth, accountActived, accountModule } = useUI();

  useEffect(() => {
    if (accountActived && !screenNarrow) {
      setDropdownAuth(false);
    }
  }, [accountActived, screenNarrow, setDropdownAuth]);

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
      <ProfileModal />
      <RequestModal />
      <ChatCard />
      {/**dashboard, profile, requests, notifications, account settings, help and support */}
      <div className='w-full md:pl-24'>
        {ActiveModule}
      </div>
      {/***Copyright footer***/}
      <div className="w-full md:pl-28 md:pr-4 flex flex-col border-t border-color-border-clear bg-transparent">
        <div id='contact'
          className='w-full h-auto lg:h-10 py-5 lg:py-2 flex flex-col-reverse lg:flex-row justify-between items-center'>
          <h2 className='w-fit md:w-1/2 h-full flex text-color-text-medium text-xs md:text-sm text-center md:text-start pt-2 md:pt-0'>
            © 2023 - Decalin-stack all right reserved
          </h2>
          <ul className='w-full md:w-1/2 h-full flex flex-row justify-center sm:justify-end items-center list-none'>
            {
              navegationC?.map((element: any) => {
                return (
                  <li
                    key={element.id}
                    className='h-full px-5 sm:px-0 flex flex-col justify-center sm:items-center cursor-pointer'>
                    <i className='w-auto flex px-2 text-color-text-medium text-2xl sm:text-lg md:text-xl text-center lg:hover:transform hover:text-color-text-dark transition-all'>
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