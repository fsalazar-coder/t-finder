"use client"
import { useState, useEffect, useRef } from "react";
import Navbar from './components/Navbar';
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import JoinModal from "./components/JoinModal";
import MessageModal from './components/MessageModal';
import PasswordResetModal from "./components/PasswordResetModal";
import Presentation from "./components/Presentation";
import Blog from "./components/Blog";
import Testimonials from "./components/Testimonials";
import Data from './data/data.json';



export default function Home() {

  const [loginModal, setLoginModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [textMessageModal, setTextMessageModal] = useState(String);
  const [passwordResetModal, setPasswordResetModal] = useState(false);
  const [sectionActived, setSectionActived] = useState(String);                          /***State active section on viewport: string***/
  const [screenNarrow, setScreenNarrow] = useState(Boolean);                             /***State screen narrow: true or false***/


  const headerSectionRef: any = useRef(null),                                            /***Ref. to each section to animation and navbar-indicator position control***/
    talentSectionRef: any = useRef(null),
    jobSectionRef: any = useRef(null),
    testimonialsSectionRef: any = useRef(null),
    blogSectionRef: any = useRef(null),
    contactSectionRef: any = useRef(null);

  const screenNarrowHandle: any = () => {
    window.innerWidth < 768 ?
      setScreenNarrow(true)
      : setScreenNarrow(false);
  };

  useEffect(() => {
    window.addEventListener('resize', screenNarrowHandle);
    screenNarrowHandle()
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {                             /***Intersection observer function: section active***/
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSectionActived(entry.target.id);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.55
    });
    let sections: any[] = [                                                              /***Sections array to observer***/
      headerSectionRef.current,
      talentSectionRef.current,
      jobSectionRef.current,
      testimonialsSectionRef.current,
      blogSectionRef.current,
      contactSectionRef.current
    ];
    sections.forEach(section => observer.observe(section));                              /***Sections observer***/
  }, [sectionActived]);


  return (
    <main className='w-full h-full relative font-montserrat select-none overflow-hidden'>

      {/**navbar */}
      <div className='w-auto h-auto'>
        <Navbar
          sectionActived={sectionActived}
          screenNarrow={screenNarrow}
          loginModalOpen={() => setLoginModal(true)}
          loginModalClose={() => setLoginModal(false)}
          joinModalOpen={() => setJoinModal(true)}
          joinModalClose={() => setJoinModal(false)}
        />
      </div>

      {/***Header section***/}
      <section
        id='header-section'
        className='w-full h-screen'
        ref={headerSectionRef}
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
        ref={talentSectionRef}
      >
        <Presentation
          xDirectionReverse={true}
          sectionTitleWatermark='TALENT'
          sectionTitle='Empower your recruitment: Why recruiters choose t-finder'
          colorTitleDark={false}
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
        ref={jobSectionRef}
      >
        <Presentation
          xDirectionReverse={false}
          sectionTitleWatermark='JOB'
          sectionTitle='Say goodbye to resumes: We match you with jobs that truly fit'
          colorTitleDark={true}
          image={Data?.job.image}
          description={Data?.job.description}
          textButton='Search job'
          joinModalOpen={() => setJoinModal(true)}
        />
      </section>

      {/**testimonials section */}
      <section
        id='testimonials-section'
        className='w-full h-auto py-8 lg:h-[615px] bg-white'
        ref={testimonialsSectionRef}
      >
        <Testimonials 
          sectionTitleWatermark='TESTIMONIALS'
          sectionTitle='What our users say'
          colorTitleDark={false}
          data={Data?.testimonials}
          testimonialsSectionActived={sectionActived === 'testimonials-section'}
        />
      </section>

      {/**blog section */}
      <section
        id='blog-section'
        className='w-full h-auto py-8 lg:h-[615px] lg:py-0 bg-slate-100'
        ref={blogSectionRef}
      >
        <Blog
          sectionTitleWatermark='BLOG'
          sectionTitle='Recent post'
          colorTitleDark={true}
          posters={Data?.blog}
          blogSectionActived={sectionActived === 'blog-section'}
        />
      </section>

      {/***Contact section***/}
      <section
        id='footer-section'
        className='w-full h-auto'
        ref={contactSectionRef}
      >
        <Footer
          joinModalOpen={() => setJoinModal(true)}
          joinModalClose={() => setJoinModal(false)}
        />
      </section>

      {/**Hidden-visible join modal */}
      <JoinModal
        joinModal={joinModal}
        joinModalClose={() => setJoinModal(false)}
        loginModalOpen={() => {
          setLoginModal(true);
          setJoinModal(false)
        }}
        messageModalOpen={(e: any) => {
          setMessageModal(true)
          setTextMessageModal(e)
        }}
      />

      {/**Hidden-visible login modal */}
      <LoginModal
        loginModal={loginModal}
        loginModalClose={() => setLoginModal(false)}
        passwordResetModalOpen={() => {
          setPasswordResetModal(true);
          setLoginModal(false);
        }}
        joinModalOpen={() => {
          setLoginModal(false);
          setJoinModal(true)
        }}
        messageModalOpen={(e: any) => {
          setMessageModal(true)
          setTextMessageModal(e)
        }}
      />

      {/**Hidden-visible password-reset modal */}
      <PasswordResetModal
        passwordResetModal={passwordResetModal}
        passwordResetModalClose={() => setPasswordResetModal(false)}
      />

      {/**Hidden-visible success modal (join & password-reset)*/}
      <MessageModal
        messageModal={messageModal}
        textMessageModal={textMessageModal}
        messageModalClose={() => setMessageModal(false)}
      />
    </main>
  )
}

