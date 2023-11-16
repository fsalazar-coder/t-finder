import { useState, useEffect } from 'react';
import { useAuthData } from "../../context/authContext";
import { fetchDataApi } from '../api/fetchDataApi';
import ProfilePersonalInfoCard from "./ProfilePersonalInfoCard";
import ProfileSectionCard from './ProfileSectionCard';



export default function Profile() {

  const { token, userId, collectionToChange, setCollectionToChange, update, setUpdate } = useAuthData();

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
      shouldRender: profileData.experience.length > 0
    },
    {
      id: 'education',
      title: 'Education',
      data: profileData.education,
      shouldRender: profileData.education.length > 0
    },
    {
      id: 'courses',
      title: 'Courses',
      data: profileData.courses,
      shouldRender: profileData.courses.length > 0
    },
    {
      id: 'projects',
      title: 'Projects',
      data: profileData.projects,
      shouldRender: profileData.projects.length > 0
    },
    {
      id: 'publications',
      title: 'Publications',
      data: profileData.publications,
      shouldRender: profileData.publications.length > 0
    },
    {
      id: 'conferences',
      title: 'Conferences',
      data: profileData.conferences,
      shouldRender: profileData.conferences.length > 0
    },
    {
      id: 'certifications',
      title: 'Certifications',
      data: profileData.certifications,
      shouldRender: profileData.certifications.length > 0
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      data: profileData.recommendations,
      shouldRender: profileData.recommendations.length > 0
    }
  ];

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


  return (
    <div className='w-full pl-0 lg:px-60 flex flex-row justify-center items-center bg-slate-50'>
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
          sections?.map((section: any, index: any) => (
            <ProfileSectionCard
              id={section.id}
              index={index}
              title={section.title}
              value={section.id}
              data={section.data}
              shouldRender={section.shouldRender}
            />
          ))
        }
      </ul>
    </div>
  );
};