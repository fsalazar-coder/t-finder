"use client"
import { useState, useEffect, useRef } from "react";
import Navbar from './components/Navbar';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionTemplate from "./components/SectionTemplate";
import Blog from "./components/Blog";
import Testimonials from "./components/Testimonials";
import Data from './data/data.json';
import Dropdown from "./components/Dropdown";
import Sidebar from "./components/Sidebar";


export default function HomeSections({ renderCondition }: any) {
  const [sectionActived, setSectionActived] = useState(String);                          /***State active section on viewport: string***/
  const headerSectionRef: any = useRef(null),                                            /***Ref. to each section to animation and navbar-indicator position control***/
    talentSectionRef: any = useRef(null),
    jobSectionRef: any = useRef(null),
    testimonialsSectionRef: any = useRef(null),
    blogSectionRef: any = useRef(null),
    contactSectionRef: any = useRef(null);

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
    renderCondition &&
    <>
      {/**navbar */}
      <div className='w-auto h-auto'>
        <Navbar />
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
        <SectionTemplate
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
        className='w-full h-auto py-8 lg:h-[615px] lg:py-0 bg-color-clear'
        ref={jobSectionRef}
      >
        <SectionTemplate
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
        className='w-full h-auto py-8 lg:h-[615px] lg:py-0 bg-color-clear'
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
      <Sidebar sectionActived={sectionActived} />
      <Dropdown />
    </>
  )
}