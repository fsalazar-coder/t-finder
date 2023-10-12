"use client"
import { useState, useEffect } from "react";
import {
  useAuth,
  useDropdown,
  useScreenNarrow,
  useAccountActived
} from "../context/authContext";
import AccountNavbar from "./account/AccountNavbar";
import MessageModal from './components/MessageModal';
import Dropdown from './components/Dropdown';
import Dashboard from "./account/Dashboard";
import Profile from "./account/Profile";
import TalentRequest from "./account/TalentRequest";
import JobRequest from "./account/JobRequest";
import Notifications from "./account/Notifications";



export default function Account(props: any) {

  const { auth } = useAuth();
  const { dropdown, setDropdown } = useDropdown();
  const { accountActived } = useAccountActived();
  const [messageModal, setMessageModal] = useState(false);
  const [typeMessageModal, setTypeMessageModal] = useState(String);
  const [descriptionMessageModal, setDescriptionMessageModal] = useState(String);
  const { screenNarrow } = useScreenNarrow();


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
      {/**profile */}
      <div className='w-full h-full lg:pl-1/6'>
        <Profile />
      </div>
      {/**talent request */}
      <div className='w-full h-full lg:pl-1/6'>
        <TalentRequest />
      </div>
      {/**job request */}
      <div className='w-full h-full lg:pl-1/6'>
        <JobRequest />
      </div>
      {/**notifications */}
      <div className='w-full h-full lg:pl-1/6'>
        <Notifications />
      </div>
      {/**dropdown */}
      <Dropdown />
      {/**message error and successful modal*/}
      <MessageModal />
    </main>
  )
}