"use client"
import { useState, useEffect } from "react";
import {
  useAuth,
  useDropdown,
  useScreenNarrow,
  useAccountActived
} from "../context/authContext";
import Dropdown from './components/Dropdown';
import AccountNavbar from "./account/AccountNavbar";
import Dashboard from "./account/Dashboard";
import Profile from "./account/Profile";
import Portfolio from "./account/Portfolio";
import Request from "./account/Requests";
import Notifications from "./account/Notifications";
import Settings from "./account/Settings";
import HelpSupport from "./account/HelpSupport";
import MessageModal from './components/MessageModal';
import ProfileImageModal from "./account/ProfileImageModal";



export default function Account(props: any) {

  const { auth } = useAuth();
  const { dropdown, setDropdown } = useDropdown();
  const { accountActived } = useAccountActived();
  const [messageModal, setMessageModal] = useState(false);
  const [typeMessageModal, setTypeMessageModal] = useState(String);
  const [descriptionMessageModal, setDescriptionMessageModal] = useState(String);
  const { screenNarrow } = useScreenNarrow();

  useEffect(() => {
    if (accountActived) {
      if (!screenNarrow) {
          setDropdown(false);
      }
    }
  }, [screenNarrow])


  if (!auth) {
    return (
      <main className='w-full h-full flex flex-col justify-center items-center bg-slate-950'>
        <h1 className="text-xl text-white text-center font-bold">
          You is not login!!
        </h1>
      </main>
    )
  }

  return (
    <main className='w-full h-full relative font-montserrat select-none overflow-hidden'>
      {/**navbar */}
      <div className='w-auto h-auto'>
        <AccountNavbar />
      </div>
      {/**dashboard */}
      <div className='w-full h-full lg:pl-1/6'>
        <Dashboard />
      </div>
      {/**account */}
      <div className='w-full h-full lg:pl-1/6'>
        <Profile />
      </div>
      {/**portfolio */}
      <div className='w-full h-full lg:pl-1/6'>
        <Portfolio />
      </div>
      {/**requests */}
      <div className='w-full h-full lg:pl-1/6'>
        <Request />
      </div>
      {/**notifications */}
      <div className='w-full h-full lg:pl-1/6'>
        <Notifications />
      </div>
      {/**account settings */}
      <div className='w-full h-full lg:pl-1/6'>
        <Settings />
      </div>
      {/**help and support */}
      <div className='w-full h-full lg:pl-1/6'>
        <HelpSupport />
      </div>
      {/**dropdown */}
      <Dropdown />
      {/**profile image upload modal */}
      <ProfileImageModal />
      {/**message error and successful modal */}
      <MessageModal />
    </main>
  )
}