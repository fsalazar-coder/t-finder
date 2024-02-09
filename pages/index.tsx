"use client"
import { useAuth } from "@/context/ContextAuth";
import { useUI } from "@/context/ContextUI";
import LoginModal from "./components/LoginModal";
import JoinModal from "./components/JoinModal";
import MessageModal from './components/MessageModal';
import PasswordResetModal from "./components/PasswordResetModal";
import LoadingSpinner from "./components/LoadingSpinner";
import HomeSections from "./HomeSections";
import Account from "./Account";
import DropdownAuth from "./components/DropdownAuth";


export default function Home() {
  const { token } = useAuth();
  const { accountActived } = useUI();

  return (
    <main className='w-full min-h-screen relative flex flex-col font-sans select-none bg-white transition-all'>
      <HomeSections renderCondition={!accountActived} />
      <Account renderCondition={(token && accountActived)} />
      <DropdownAuth />
      <JoinModal />
      <LoginModal />
      <PasswordResetModal />
      <MessageModal />
      <LoadingSpinner />
    </main>
  )
};