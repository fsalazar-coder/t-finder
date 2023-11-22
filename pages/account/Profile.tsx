import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI } from "../../context/authContext";
import { fetchDataApi } from '../api/fetchDataApi';
import ProfilePersonalInfoCard from "./ProfilePersonalInfoCard";
import ProfileSectionCard from './ProfileSectionCard';
import SectionTitles from '../components/SectionTitles';
import CircleProgressBar from './CircleProgressBar';
import { IconAdd, IconUserGraduate, IconBxsBellRing, IconBxErrorCircle, IconCheckCircle, IconCancelCircle } from '@/icons/icons';




export default function Profile() {

  const { token, userId, collectionToChange, setCollectionToChange, update, setUpdate } = useAuthData();
  const { accountModule } = useAuthUI();

  const [profileData, setProfileData] = useState({
    experience: [],
    education: [],
    courses: [],
    projects: [],
    publications: [],
    conferences: [],
    certifications: [],
    recommendations: [],
  });

  const sections = [
    {
      id: 'experience',
      title: 'Experience',
      data: profileData.experience,
      shouldRender: profileData.experience.length > 0,
      length: profileData.experience.length
    },
    {
      id: 'education',
      title: 'Education',
      data: profileData.education,
      shouldRender: profileData.education.length > 0,
      length: profileData.education.length
    },
    {
      id: 'courses',
      title: 'Courses',
      data: profileData.courses,
      shouldRender: profileData.courses.length > 0,
      length: profileData.courses.length
    },
    {
      id: 'projects',
      title: 'Projects',
      data: profileData.projects,
      shouldRender: profileData.projects.length > 0,
      length: profileData.projects.length
    },
    {
      id: 'publications',
      title: 'Publications',
      data: profileData.publications,
      shouldRender: profileData.publications.length > 0,
      length: profileData.publications.length
    },
    {
      id: 'conferences',
      title: 'Conferences',
      data: profileData.conferences,
      shouldRender: profileData.conferences.length > 0,
      length: profileData.conferences.length
    },
    {
      id: 'certifications',
      title: 'Certifications',
      data: profileData.certifications,
      shouldRender: profileData.certifications.length > 0,
      length: profileData.certifications.length
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      data: profileData.recommendations,
      shouldRender: profileData.recommendations.length > 0,
      length: profileData.recommendations.length
    }
  ];
  const totalSections = sections.length;
  const sectionsCompleted = sections.filter(section => section.shouldRender).length;
  const percentageProfileFilled = Math.round((sectionsCompleted / totalSections) * 100);

  // Función para actualizar los datos de una sección específica
  const updateSectionData = (sectionName: string, data: any) => {
    setProfileData((prevData) => ({
      ...prevData,
      [sectionName]: data
    }));
  };

  // Cargar los datos para todas las secciones
  useEffect(() => {
    if (!update || update === collectionToChange) {
      sections.forEach((section) => {
        let collectionName = section.id;
        fetchDataApi({
          token: token as string,
          userId: userId as string,
          collectionName,
          onSuccess: (data: any) => {
            updateSectionData(collectionName, data);
          },
          onError: (error: any) => console.error(error)
        });
        if (update) {
          setUpdate('');
          setCollectionToChange('');
        }
      })
    }
  }, [token, userId, update, setUpdate, collectionToChange, setCollectionToChange]);

  const isDashboard = accountModule === 'Dashboard';


  return (
    isDashboard ?
      <>
        {/**title */}
        <div className='w-full relative px-5 py-1 lg:py-2 flex flex-row items-center border-b border-slate-200'>
          <SectionTitles
            sectionTitle='Profile'
            sectionType='account'
          />
        </div>
        <div className='w-full px-5 flex flex-row items-center'>
          {/**graphycal abstract */}
          <div className='w-40 pr-4 py-2 flex flex-col items-center transition-all'>
            <div className="w-40 h-40">
              <CircleProgressBar
                percentage={percentageProfileFilled}
                circleWidth='160'
              />
            </div>
          </div>
          {/**items profile */}
          <ul className='py-2 flex flex-wrap'>
            {
              sections?.map((element: any, index: any) => {
                return (
                  /**fullname, profession or occupation, preferred language, location and personal description */
                  <li key={index}
                    className='w-1/2 pb-2 flex flex-row items-start'
                  >
                    <div className='w-full flex flex-col'>
                      <h4 className='w-full text-slate-700 text-sm font-semibold'>
                        {element.title}
                      </h4>
                      <h5 className={`${element.length > 0 ? 'text-slate-200' : 'text-red-300'} w-full text-xs`}>
                        {element.shouldRender ? `${element.length} item${element.length > 1 ? 's' : ''}` : 'empty'}
                      </h5>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </>
      :
      <div className='w-full pl-0 lg:px-60 flex flex-row justify-center items-center'>
        <ul className='container w-full pt-12 px-2 pb-2 lg:p-8 flex flex-col transition-all'>
          {/* Personal information card */}
          <li
            key='personal-information'
            id='personal-information'
            className='w-full my-1 flex flex-col justify-center bg-white border border-slate-200 rounded-lg'
          >
            <ProfilePersonalInfoCard />
          </li>
          {
            /**others section card: experience, education, courses, projects, publications, conferences, certifications and recommendatiosn */
            sections?.map((section: any, index: any) => {
              return (
                <li
                  id={section.id}
                  key={`${index}-${section.title}`}
                  className='w-full relative my-1 flex flex-col bg-white border border-slate-200 rounded-lg'
                >
                  <ProfileSectionCard
                    title={section.title}
                    value={section.id}
                    data={section.data}
                    shouldRender={section.shouldRender}
                  />
                </li>
              )
            })
          }
        </ul>
      </div>
  );
};