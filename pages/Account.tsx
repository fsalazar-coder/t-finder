"use client"
import { useEffect } from "react";
import { useAuthData, useAuthUI, useUI } from "../context/authContext";
import Dropdown from './components/Dropdown';
import AccountNavbar from "./account/AccountNavbar";
import Dashboard from "./account/Dashboard";
import Profile from "./account/Profile";
import ProfileModal from "./account/ProfileModal";
import Portfolio from "./account/Portfolio";
import Request from "./account/Requests";
import RequestModal from "./account/RequestModal";
import Notifications from "./account/Notifications";
import Settings from "./account/Settings";
import HelpSupport from "./account/HelpSupport";
import MessageModal from './components/MessageModal';

// Define a type for the modules object
type ModuleComponents = {
  [key: string]: React.ComponentType<any>;
};



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
    'Profile': Profile,
    'Portfolio': Portfolio,
    'Request': Request,
    'Notifications': Notifications,
    'Account Settings': Settings,
    'Help & Support': HelpSupport,
    'Dashboard': Dashboard,
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
    <main className='w-full h-full relative font-montserrat select-none flex flex-col items-center'>
      <div className='w-auto h-auto'>
        <AccountNavbar />
      </div>
      {/**dashboard, profile, requests, notifications, account settings, help and support */}
      <div className='w-full h-full lg:pl-1/6'>
        <ActiveModule />
      </div>
      {/**sponsor banner */}
      <div className="lg:w-60 h-screen fixed right-0 hidden lg:vissible lg:flex flex-col justify-center items-center bg-slate-50 border-l border-slate-100">
        <h2>SPONSOR</h2>
      </div>

      <Dropdown />

      <ProfileModal />

      <RequestModal />

      {/**message error and successful modal */}
      <MessageModal />
    </main>
  )
}