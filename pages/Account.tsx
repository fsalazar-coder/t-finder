"use client"
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import AccountNavbar from "./components/AccountNavbar";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import JoinModal from "./components/JoinModal";
import MessageModal from './components/MessageModal';
import Presentation from "./components/Presentation";
import Data from './data/data.json';



export default function Account(props: any) {

  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const [loginModal, setLoginModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [typeMessageModal, setTypeMessageModal] = useState(String);
  const [descriptionMessageModal, setDescriptionMessageModal] = useState(String);
  const [sectionActived, setSectionActived] = useState(String);                          /***State active section on viewport: string***/
  const [screenNarrow, setScreenNarrow] = useState(Boolean);                             /***State screen narrow: true or false***/

  const screenNarrowHandle: any = () => {
    window.innerWidth < 768 ?
      setScreenNarrow(true)
      : setScreenNarrow(false);
  };

  useEffect(() => {
    window.addEventListener('resize', screenNarrowHandle);
    screenNarrowHandle()
  });


  return (
    <main className='w-full h-full relative font-montserrat select-none overflow-hidden'>

      {/**navbar */}
      <div className='w-auto h-auto'>
        <AccountNavbar
          sectionActived={sectionActived}
          screenNarrow={screenNarrow}
          loginModalOpen={() => setLoginModal(true)}
          loginModalClose={() => setLoginModal(false)}
          joinModalOpen={() => setJoinModal(true)}
          joinModalClose={() => setJoinModal(false)}
          messageLogout={(e: any) => {
            setMessageModal(true);
            setTypeMessageModal('logout');
            setDescriptionMessageModal(e);
          }}
        />
      </div>

      {/***Header section***/}
      <section
        id='header-section'
        className='w-full h-screen'
      >
        <Header
          headerSectionActived={sectionActived === 'header-section'}
          joinModalOpen={() => setJoinModal(true)}
          joinModalClose={() => setJoinModal(false)}
        />
      </section>

      {/***talent section***/}
      <section
        id='talent-section'
        className='w-full h-auto py-8 lg:h-[615px] lg:py-0 bg-white'
      >
        <Presentation
          xDirectionReverse={true}
          sectionTitle='RECRUIT'
          sectionSubtitle='Empower your recruitment. Why recruiters choose t-finder'
          image={Data?.talent.image}
          description={Data?.talent.description}
          textButton='Search talents'
          joinModalOpen={() => setJoinModal(true)}
        />
      </section>

      {/**job section */}
      <section
        id='job-section'
        className='w-full h-auto py-8 lg:h-[615px] lg:py-0 bg-slate-100'
      >
        <Presentation
          xDirectionReverse={false}
          sectionTitle='JOB'
          sectionSubtitle='Say goodbye to resumes. We match you with jobs that truly fit'
          image={Data?.job.image}
          description={Data?.job.description}
          textButton='Search job'
          joinModalOpen={() => setJoinModal(true)}
        />
      </section>

      {/**Hidden-visible join modal */}
      <JoinModal
        joinModal={joinModal}
        joinModalClose={() => setJoinModal(false)}
        loginModalOpen={() => {
          setLoginModal(true);
          setJoinModal(false);
        }}
        messageSuccessful={(e: any) => {
          setMessageModal(true);
          setTypeMessageModal('successful');
          setDescriptionMessageModal(e);
        }}
        messageError={(e: any) => {
          setMessageModal(true);
          setTypeMessageModal('error');
          setDescriptionMessageModal(e);
        }}
      />

      {/**Hidden-visible login modal */}
      <LoginModal
        loginModal={loginModal}
        loginModalClose={() => setLoginModal(false)}
        joinModalOpen={() => {
          setLoginModal(false);
          setJoinModal(true)
        }}
        messageError={(e: any) => {
          setMessageModal(true);
          setTypeMessageModal('error');
          setDescriptionMessageModal(e);
        }}
      />

      {/**Hidden-visible success modal (join & password-reset)*/}
      <MessageModal
        activedModal={messageModal}
        typeMessageModal={typeMessageModal}
        subtitle={descriptionMessageModal}
        logout={() => {
          setMessageModal(false);
          setAuth(null);
        }}
        messageModalClose={() => setMessageModal(false)}
      />
    </main>
  )
}