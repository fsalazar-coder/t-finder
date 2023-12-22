import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import ProfileSectionCard from './ProfileSectionCard';
import ProfileDashboard from './ProfileDashboard';
import axios from 'axios';



export default function Profile() {

  const { token, userId, userScore, setUserScore, collectionToChange, setCollectionToChange, update, setUpdate } = useAuthData();
  const { accountModule, setAccountModule } = useAuthUI();

  const [profileData, setProfileData] = useState({
    experience: [],
    education: [],
    courses: [],
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
      length: profileData.experience.length,
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
    if (!update || update === collectionToChange || accountModule === 'Profile') {
      sections.forEach((section) => {
        let collectionName = section.id;
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get',
          collectionName: collectionName,
          data: '',
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
  }, [token, userId, accountModule, update, setUpdate, collectionToChange, setCollectionToChange]);


  useEffect(() => {
    let score = 0;

    const experiencePoints = {
      'Junior': 5,
      'Mid': 10,
      'Senior': 15
    };

    const experienceYearsPoints = {
      '0-2': 10,
      '2-5': 20,
      '5-10': 30,
      '+10': 40
    };

    const educationDegreePoints = {
      'High school': 10,
      'Bachelor': 20,
      'Master': 30,
      'Doctorate': 40
    };

    const calculateScore = (sectionLength: any, pointsPerItem: any, maxPoints: any) => {
      return Math.min(sectionLength * pointsPerItem, maxPoints);
    };

    sections.forEach((section) => {
      let sectionData = section.data;
      switch (section.id) {
        case 'experience':
          if (section.length > 0) {
            sectionData.map((experience) => {
              score += experiencePoints[experience['experience_level']] || 0;
              score += experienceYearsPoints[experience['experience_years']] || 0;
            })
          }
          break;
        case 'education':
          if (section.length > 0) {
            sectionData.map((education) => {
              score += educationDegreePoints[education['degree']] || 0;
            })
          }
          break;
        case 'courses':
          score += calculateScore(section.length, 5, 30);
          break;
        case 'publications':
        case 'conferences':
          score += calculateScore(section.length, 4, 20);
          break;
        case 'certifications':
          score += calculateScore(section.length, 6, 30);
          break;
        case 'recommendations':
          score += calculateScore(section.length, 3, 15);
          break;
        default:
          break;
      }
    });
    setUserScore(score);
    userScoreUpdate(score);
  }, [sections]);


  const userScoreUpdate = async (score: any) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.post('/api/userApi',
        {
          id: userId,
          collectionName: 'profile_score',
          action: 'edit',
          data: { profile_score: score },
        },
        config
      );
    }
    catch (error: any) {
      if (error.response) {
        let statusError = error.response.status;
        let messageError = error.response.data.message;
      }
    }
  };

  const isDashboard = accountModule === 'Dashboard';


  return (
    isDashboard ?
      <ProfileDashboard
        percentage={percentageProfileFilled}
        data={sections}
        userScore={userScore}
      />
      :
      <div className='w-full pl-0 lg:pl-60 flex flex-row justify-center items-center'>
        <ul className='w-[52rem] pt-12 px-2 pb-2 lg:p-8 flex flex-col transition-all'>
          {
            /**others section card: experience, education, courses, projects, publications, conferences, certifications and recommendatiosn */
            sections?.map((section: any, index: any) => {
              return (
                <li
                  id={section.id}
                  key={`${index}-${section.title}`}
                  className='w-full relative my-1 flex flex-col bg-color-clear border border-color-border-clear shadow-md rounded-lg'
                >
                  <ProfileSectionCard
                    id={section.id}
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