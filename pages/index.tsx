"use client"
import {
  useState,
  useEffect,
  useRef
} from "react";
import { useAuthData, useUI } from "../context/authContext";
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
import Dropdown from "./components/Dropdown";
import LoadingSpinner from "./components/LoadingSpinner";



export default function Home() {


  const { token } = useAuthData();
  const {
    screenNarrow,
    setDropdown,
    setHamburguerMenuActive
  } = useUI();
  const [sectionActived, setSectionActived] = useState(String);                          /***State active section on viewport: string***/



  const headerSectionRef: any = useRef(null),                                            /***Ref. to each section to animation and navbar-indicator position control***/
    talentSectionRef: any = useRef(null),
    jobSectionRef: any = useRef(null),
    testimonialsSectionRef: any = useRef(null),
    blogSectionRef: any = useRef(null),
    contactSectionRef: any = useRef(null);

  useEffect(() => {
    if (!screenNarrow) {
      setHamburguerMenuActive(false);
      if (!token) {
        setDropdown(false);
      }
    }
  })


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
        />
      </section>

      {/***talent section***/}
      <section
        id='recruit-section'
        className='w-full h-auto py-8 lg:h-[615px] lg:py-0 bg-white'
        ref={talentSectionRef}
      >
        <Presentation
          xDirectionReverse={true}
          sectionTitle='RECRUIT'
          sectionSubtitle='Empower your recruitment. Why recruiters choose t-finder'
          sectionType='home'
          image={Data?.talent.image}
          description={Data?.talent.description}
          textButton='Search talents'
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
          sectionTitle='JOB'
          sectionSubtitle='Say goodbye to resumes. We match you with jobs that truly fit'
          sectionType='home'
          image={Data?.job.image}
          description={Data?.job.description}
          textButton='Search job'
        />
      </section>

      {/**testimonials section */}
      <section
        id='testimonials-section'
        className='w-full h-auto py-8 lg:h-[615px] bg-white'
        ref={testimonialsSectionRef}
      >
        <Testimonials
          sectionTitle='TESTIMONIALS'
          sectionSubtitle='What our users say'
          sectionType='home'
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
          sectionTitle='BLOG'
          sectionSubtitle='Recent post'
          sectionType='home'
          data={Data?.blog}
          blogSectionActived={sectionActived === 'blog-section'}
        />
      </section>

      {/***Contact section***/}
      <section
        id='footer-section'
        className='w-full h-auto'
        ref={contactSectionRef}
      >
        <Footer />
      </section>

      {/**Hidden-visible join modal */}
      <JoinModal />

      {/**Hidden-visible login modal */}
      <LoginModal />

      {/**Hidden-visible password-reset modal */}
      <PasswordResetModal />

      {/**Hidden-visible success modal (join & password-reset)*/}
      <MessageModal />

      {/**dropdown */}
      <Dropdown
        imageUser={false}
        sectionActived={sectionActived}
      />
      {/**loading spinner */}
      <LoadingSpinner />
    </main>
  )
}