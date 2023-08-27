"use client"
import { useState, useEffect, useRef } from "react";
import Navbar from './components/Navbar';
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import JoinModal from "./components/JoinModal";
import SuccessModal from './components/SuccessModal'
import PasswordResetModal from "./components/PasswordResetModal";



export default function Home() {

  const [loginModal, setLoginModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [passwordResetModal, setPasswordResetModal] = useState(false);

  const [sectionActived, setSectionActived] = useState(String);                          /***State active section on viewport: string***/
  const [screenNarrow, setScreenNarrow] = useState(Boolean);                             /***State screen narrow: true or false***/

  const headerSectionRef: any = useRef(null),                                            /***Ref. to each section to animation and navbar-indicator position control***/
    findTalentSectionRef: any = useRef(null),
    findJobSectionRef: any = useRef(null),
    aboutSectionRef: any = useRef(null),
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
      findTalentSectionRef.current,
      findJobSectionRef.current,
      aboutSectionRef.current,
      testimonialsSectionRef.current,
      blogSectionRef.current,
      contactSectionRef.current
    ];
    sections.forEach(section => observer.observe(section));                              /***Sections observer***/
  }, [sectionActived]);


  return (
    <main className='w-full h-auto relative font-montserrat select-none overflow-x-hidden'>

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

      {/***find talent section***/}
      <section
        id='find-talent-section'
        className='w-full h-[350px] sm:h-[420px] lg:h-[615px] bg-white'
        ref={findTalentSectionRef}
      >
        FIND TALENT SECTION
      </section>

      {/**find job section */}
      <section
        id='find-job-section'
        className='w-full h-[350px] sm:h-[420px] lg:h-[615px] bg-gray-300'
        ref={findJobSectionRef}
      >
        FIND JOB SECTION
      </section>

      {/***About us section***/}
      <section
        id='about-section'
        className='w-full h-[350px] sm:h-[420px] lg:h-[615px] bg-white'
        ref={aboutSectionRef}
      >
        ABOUT US SECTION
      </section>

      {/**testimonials section */}
      <section
        id='testimonials-section'
        className='w-full h-[350px] sm:h-[420px] lg:h-[615px] bg-gray-300'
        ref={testimonialsSectionRef}
      >
        TESTOMONIALS SECTION
      </section>

      {/**blog section */}
      <section
        id='blog-section'
        className='w-full h-[350px] sm:h-[420px] lg:h-[615px] bg-white'
        ref={blogSectionRef}
      >
        BLOG SECTION
      </section>

      {/**trusted section */}
      <section
        id='trusted-section'
        className='w-full h-auto bg-gray-300'
      >
        TRUSTED
      </section>

      {/***Contact section***/}
      <section
        id='footer-section'
        className='w-full h-[350px] sm:h-[420px] lg:h-[615px]'
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
        successModalOpen={() => setSuccessModal(true)}
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
      />

      {/**Hidden-visible password-reset modal */}
      <PasswordResetModal
        passwordResetModal={passwordResetModal}
        passwordResetModalClose={() => setPasswordResetModal(false)}
      />

      {/**Hidden-visible success modal (join & password-reset)*/}
      <SuccessModal
        successModal={successModal}
        successModalClose={() => setSuccessModal(false)}
      />
    </main>
  )
}
