import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI } from "../../context/authContext";
import { fetchDataApi } from '../api/fetchDataApi';
import { IconAdd, IconEdit, IconDelete } from '../../icons/icons';
import SectionTitles from '../components/SectionTitles';
import ProfilePersonalInfoCard from "./ProfilePersonalInfoCard";
import ProfileSectionCard from './ProfileSectionCard';



export default function Profile() {

  const {
    token, userId, collectionToChange, setCollectionToChange, update, setUpdate } = useAuthData();
  const { setProfileModal, setProfileModalAction, setProfileModalType } = useAuthUI();
  const [editButtonActived, setEditButtonActived] = useState(false);
  const [deleteButtonActived, setDeleteButtonActived] = useState(false);

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
      title: 'EXPERIENCE',
      value: 'experience',
      sectionName: 'experience',
      collectionName: 'experience',
      data: profileData.experience,
      shouldRender: profileData.experience.length > 0
    },
    {
      id: 'education',
      title: 'EDUCATION',
      value: 'education_info',
      sectionName: 'education',
      collectionName: 'education_info',
      data: profileData.education,
      shouldRender: profileData.education.length > 0
    },
    {
      id: 'courses',
      title: 'COURSES',
      value: 'courses',
      sectionName: 'courses',
      collectionName: 'courses',
      data: profileData.courses,
      shouldRender: profileData.courses.length > 0
    },
    {
      id: 'projects',
      title: 'PROJECTS',
      value: 'projects',
      sectionName: 'projects',
      collectionName: 'projects',
      data: profileData.projects,
      shouldRender: profileData.projects.length > 0
    },
    {
      id: 'publications',
      title: 'PUBLICATIONS',
      value: 'publications',
      sectionName: 'publications',
      collectionName: 'publications',
      data: profileData.publications,
      shouldRender: profileData.publications.length > 0
    },
    {
      id: 'conferences',
      title: 'CONFERENCES',
      value: 'conferences',
      sectionName: 'conferences',
      collectionName: 'conferences',
      data: profileData.conferences,
      shouldRender: profileData.conferences.length > 0
    },
    {
      id: 'certifications',
      title: 'CERTIFICATIONS',
      value: 'certifications',
      sectionName: 'certifications',
      collectionName: 'certifications',
      data: profileData.certifications,
      shouldRender: profileData.certifications.length > 0
    },
    {
      id: 'recommendations',
      title: 'RECOMMENDATIONS',
      value: 'recommendations',
      sectionName: 'recommendations',
      collectionName: 'recommendations',
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
        fetchDataApi({
          token: token as string,
          userId: userId as string,
          collectionName: section.collectionName,
          onSuccess: (data: any) => {
            updateSectionData(section.sectionName, data);
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

  useEffect(() => {
    collectionToChange === '' && setEditButtonActived(false);
    collectionToChange === '' && setDeleteButtonActived(false);
  }, [collectionToChange])

  const buttons = [
    {
      id: 'post-item-profile',
      key: 'post-item-profile',
      icon: <IconAdd />,
      click: (e: React.MouseEvent<HTMLButtonElement>) => {
        const sectionValue = e.currentTarget.dataset.value;
        if (sectionValue) {
          setProfileModal(true);
          setEditButtonActived(false);
          setDeleteButtonActived(false);
          setProfileModalAction('post');
          setProfileModalType(sectionValue);
          setCollectionToChange(sectionValue);
        }
      },
    },
  ];

  return (
    <div className='w-full pl-0 lg:px-60 flex flex-row justify-center items-center'>
      <ul className='container w-full pt-12 px-2 pb-2 lg:p-8 flex flex-col transition-all'>
        {/* Personal information card */}
        <li
          key='personal-information'
          id='personal-information'
          className='w-full relative p-2 lg:p-5 my-3 lg:my-2 flex flex-col justify-center bg-slate-50 border border-white rounded-md drop-shadow-md'
        >
          <div className='w-full flex flex-row'>
            <SectionTitles
              sectionTitle='PERSONAL INFORMATION'
              sectionSubtitle=''
              sectionType='account'
            />
          </div>
          <div className='w-full mt-1 lg:mt-2 flex flex-col'>
            <ProfilePersonalInfoCard />
          </div>
        </li>
        {
          /**others section card: experience, education, courses, projects, publications, conferences, certifications and recommendatiosn */
          sections.map((section: any, index: any) => {
            return (
              <li
                key={section.id}
                id={section.id}
                className='w-full relative p-2 lg:p-5 my-3 lg:my-2 flex flex-col bg-slate-50 border border-white rounded-md drop-shadow-md'
              >
                {
                  section.value !== 'personal_info' && (
                    /**add, edit and delete button */
                    <ul className={
                      `${!section.shouldRender ? 'h-full' : 'h-fit'
                      } absolute right-0 top-0 p-2 flex flex-row justify-end items-center z-20`
                    }>
                      {
                        buttons.map((button: any, index: any) => {
                          let classIconEditDelete =
                            `${collectionToChange === section.value ? index === 0 ? 'text-slate-300 lg:hover:text-green-500' :
                              index === 1 ? editButtonActived ? 'animate-bounce text-green-500' :
                                'text-slate-300 lg:hover:text-green-500' : deleteButtonActived ?
                                'animate-bounce text-red-500' : 'text-slate-300 lg:hover:text-red-500' :
                              index === 2 ? 'text-slate-300 lg:hover:text-red-500' : 'text-slate-300 lg:hover:text-green-500'
                            } p-[2px] text-xl lg:text-2xl flex flex-row justify-center bg-white rounded-full cursor-default lg:cursor-pointer transition-all`

                          return (
                            <li
                              key={button.key}
                              id={button.id}
                              className={
                                `${!section.shouldRender ? index > 0 ? 'hidden' : 'visible' : 'visible'}
                              ${index === 1 ? 'px-0 lg:px-2' : 'px-0'} flex flex-col justify-center items-center transition-all`}
                            >
                              <button
                                className="w-full flex flex-row justify-center items-center hover:cursor-default"
                                data-value={section.value}
                                onClick={button.click}
                              >
                                <h3 className='pr-2 text-sm text-slate-400 transition-all'>
                                  {section.shouldRender ? 'Add' : 'Add information'}
                                </h3>
                                <i className={classIconEditDelete}>
                                  {button.icon}
                                </i>
                              </button>
                            </li>
                          )
                        })
                      }
                    </ul>
                  )
                }
                {/**section title */}
                <div className='w-full flex flex-row'>
                  <SectionTitles
                    sectionTitle={section.title}
                    sectionSubtitle=''
                    sectionType='account'
                  />
                </div>
                {/**showing information */}
                <div className='w-full mt-1 lg:mt-2 flex flex-col'>
                  <ProfileSectionCard
                    sectionValue={section.value}
                    sectionData={section.data}
                    collectionName={section.collectionName}
                    shouldRender={section.shouldRender}
                    editButtonActived={editButtonActived}
                    deleteButtonActived={deleteButtonActived}
                  />
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};