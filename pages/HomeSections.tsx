import React, { useState, useEffect, useRef, useMemo } from "react";
import Navbar from './components/Navbar';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionTemplate from "./components/SectionTemplate";
import Blog from "./components/Blog";
import Testimonials from "./components/Testimonials";
import Data from './data/data.json';
import Dropdown from "./components/Dropdown";
import Sidebar from "./components/Sidebar";

interface SectionDataParams {
  id: string;
  className: string;
  ref: React.RefObject<HTMLElement>;
  Component: React.ElementType;
  props: object;
}


export default function HomeSections({ renderCondition }: any) {
  const [sectionActived, setSectionActived] = useState<string>('');
  const headerSectionRef = useRef<HTMLElement>(null);
  const talentSectionRef = useRef<HTMLElement>(null);
  const jobSectionRef = useRef<HTMLElement>(null);
  const testimonialsSectionRef = useRef<HTMLElement>(null);
  const blogSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const requestProgress: any = useMemo(() => ({
    'Submitted': 25,
    'Selecting': 50,
    'Contacting': 75,
    'Accepted': 75,
    'Completed': 100,
  }), []);

  const sectionsData: SectionDataParams[] = useMemo(() => ([
    {
      id: 'header-section',
      className: 'w-full h-screen',
      ref: headerSectionRef,
      Component: Header,
      props: { headerSectionActived: false }
    },
    {
      id: 'recruit-section',
      className: 'w-full h-auto py-8 lg:h-[615px] lg:py-0 bg-white',
      ref: talentSectionRef,
      Component: SectionTemplate,
      props: {
        xDirectionReverse: true,
        sectionTitle: 'RECRUIT',
        sectionSubtitle: 'Empower your recruitment. Why recruiters choose t-finder',
        sectionType: 'home',
        image: Data?.talent.image,
        description: Data?.talent.description,
        textButton: 'Search talents',
      }
    },
    {
      id: 'job-section',
      className: 'w-full h-auto py-8 lg:h-[615px] lg:py-0 bg-color-clear',
      ref: jobSectionRef,
      Component: SectionTemplate,
      props: {
        xDirectionReverse: false,
        sectionTitle: 'JOB',
        sectionSubtitle: 'Say goodbye to resumes. We match you with jobs that truly fit',
        sectionType: 'home',
        image: Data?.job.image,
        description: Data?.job.description,
        textButton: 'Search job',
      }
    },
    {
      id: 'testimonials-section',
      className: 'w-full h-auto py-8 lg:h-[615px] bg-white',
      ref: testimonialsSectionRef,
      Component: Testimonials,
      props: {
        sectionTitle: 'TESTIMONIALS',
        sectionSubtitle: 'What our users say',
        sectionType: 'home',
        data: Data?.testimonials,
        testimonialsSectionActived: sectionActived === 'testimonials-section'
      }
    },
    {
      id: 'blog-section',
      className: 'w-full h-auto py-8 lg:h-[615px] lg:py-0 bg-color-clear',
      ref: blogSectionRef,
      Component: Blog,
      props: {
        sectionTitle: 'BLOG',
        sectionSubtitle: 'Recent post',
        sectionType: 'home',
        data: Data?.blog,
        blogSectionActived: sectionActived === 'blog-section'
      },
    },
    {
      id: 'footer-section',
      className: 'w-full h-auto',
      ref: contactSectionRef,
      Component: Footer,
      props: {}
    },
  ]), [sectionActived]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSectionActived(entry.target.id);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.55 });

    sectionsData.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      sectionsData.forEach(({ ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [sectionActived, sectionsData]);

  return renderCondition && (
    <>
      <Navbar />
      <Sections sectionsData={sectionsData} />
      <Sidebar sectionActived={sectionActived} />
      <Dropdown />
    </>
  );
};

const Sections = ({ sectionsData }: { sectionsData: SectionDataParams[] }) => (
  <>
    {sectionsData.map(({ id, className, ref, Component, props }) => (
      <section id={id} key={id} className={className} ref={ref}>
        <Component {...props} />
      </section>
    ))}
  </>
);
