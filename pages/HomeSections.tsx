import React, { useMemo, useCallback } from "react";
import { useUI } from "@/context/ContextUI";
import Data from './data/data.json';
import Navbar from './components/Navbar';
import Header from "./components/Header";
import TemplateSection from "./components/TemplateSection";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

interface SectionConfig {
  background: string,
  Component: React.ComponentType<any> | (() => JSX.Element),
}


export default function HomeSections({ renderCondition }: { renderCondition: boolean }) {
  const { setHamburguerMenuActive, sectionHomeActived } = useUI();

  const handleClick = useCallback(() => {
    setHamburguerMenuActive(false);
  }, [setHamburguerMenuActive]);

  const SectionComponent = useMemo(() => {
    const sectionComponents: Record<string, SectionConfig> = {
      'header-section': {
        background: '',
        Component: Header
      },
      'recruit-section': {
        background: 'bg-white',
        Component: () => (
          <TemplateSection
            xDirectionReverse={true}
            sectionTitle='RECRUIT'
            sectionSubtitle='Empower your recruitment. Why recruiters choose t-finder'
            sectionType='home'
            image={Data?.talent.image}
            description={Data?.talent.description}
            textButton='Search talents'
          />
        )
      },
      'job-section': {
        background: 'bg-color-clear',
        Component: () => (
          <TemplateSection
            xDirectionReverse={true}
            sectionTitle='JOB'
            sectionSubtitle='Say goodbye to resumes. We match you with jobs that truly fit'
            sectionType='home'
            image={Data?.job.image}
            description={Data?.job.description}
            textButton='Search job'
          />
        )
      },
      'testimonials-section': {
        background: 'bg-white',
        Component: () => (
          <Testimonials
            sectionTitle='TESTIMONIALS'
            sectionSubtitle='What our users say'
            sectionType='home'
            data={Data?.testimonials}
            testimonialsSectionActived={sectionHomeActived === 'testimonials-section'}
          />
        )
      },
      'blog-section': {
        background: 'bg-color-clear',
        Component: () => (
          <Blog
            sectionTitle='BLOG'
            sectionSubtitle='Recent post'
            sectionType='home'
            data={Data?.blog}
            blogSectionActived={sectionHomeActived === 'blog-section'}
          />
        )
      },
      'footer-section': {
        background: '',
        Component: Footer,
      }
    };
    const config = sectionComponents[sectionHomeActived];
    if (!config) return null;
    const { Component, background } = config;

    return (
      <section className={`${background} w-full h-full flex flex-row justify-center`} onClick={handleClick}>
        <Component />
      </section>
    );
  }, [sectionHomeActived, handleClick]);


  return (
    renderCondition &&
    <div className='w-full flex flex-col items-center'>
      <Navbar />
      {SectionComponent}
    </div>
  );
};