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
    <div className="w-full min-h-screen flex flex-col justify-between items-center bg-color-clear">
      <NavbarAccount />
      <ProfileModal />
      <RequestModal />
      <ChatCard />
      {/**dashboard, profile, requests, notifications, account settings, help and support */}
      <div className={`${screenNarrow && 'py-16'} w-full md:pl-24`}>
        {ActiveModule}
      </div>
    </div>
  )
}