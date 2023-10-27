import { useAuthUI } from "../../context/authContext";
import {
  IconArrowRight,
  IconAdd,
  IconEdit,
  IconDelete,
  IconCheckCircle
} from '../../icons/icons';
import SectionTitles from '../components/SectionTitles';
import EducationalInfo from "./EducationalInfo";
import PersonalInfo from "./PersonalInfo";
import PersonalInfoModal from "./PersonalInfoModal";



export default function Profile(props: any) {

  const { accountModule, setPersonalInfoModal } = useAuthUI();

  const sections = [
    {
      id: 'personal-information',
      title: 'PERSONAL INFORMATION',
      comment: 'Comment, comemnt comemnt comemnt comemnt IA!!!',
      content: <PersonalInfo />
    },
    {
      id: 'education',
      title: 'EDUCATION',
      comment: 'Comment,comemnt comemnt comemnt comemnt  IA!!!',
      content: <EducationalInfo />
    },
    {
      id: 'course',
      title: 'COURSES',
      comment: 'Comment, comemnt comemnt comemnt comemnt  IA!!!',
      content: <EducationalInfo />
    },
    {
      id: 'experience',
      title: 'EXPERIENCE',
      comment: 'Comment, comemnt comemnt comemnt comemnt  IA!!!',
      content: <EducationalInfo />
    },
    {
      id: 'project',
      title: 'PROJECTS',
      comment: 'Comment, comemnt comemnt comemnt comemnt  IA!!!',
      content: <EducationalInfo />
    },
    {
      id: 'publication',
      title: 'PUBLICATIONS',
      comment: 'Comment, comemnt comemnt comemnt comemnt  IA!!!',
      content: <EducationalInfo />
    },
    {
      id: 'conference',
      title: 'CONFERENCES',
      comment: 'Comment, comemnt comemnt comemnt comemnt  IA!!!',
      content: <EducationalInfo />
    },
    {
      id: 'certification',
      title: 'CERTIFICATIONS',
      comment: 'Comment, comemnt comemnt comemnt comemnt  IA!!!',
      content: <EducationalInfo />
    },
    {
      id: 'honors-awards',
      title: 'HONOR AND AWARDS',
      comment: 'Comment, comemnt comemnt comemnt comemnt  IA!!!',
      content: <EducationalInfo />
    },
    {
      id: 'recommendations',
      title: 'RECOMMENDATIONS',
      comment: 'Comment, comemnt comemnt comemnt comemnt  IA!!!',
      content: <EducationalInfo />
    }
  ]

  return (
    accountModule === 'Profile' ?
      <div className='w-full h-screen pl-0 lg:px-60 flex flex-row justify-center items-center'>
        <ul className='container w-full h-full pt-14 lg:pt-10 p-5 lg:p-10 flex flex-col transition-all'>
          {
            /**sections: personal, educational and experience information */
            sections.map((section: any) => {
              return (
                <li
                  key={section.id}
                  id={section.id}
                  className="w-full p-2 lg:p-5 mb-10 lg:mb-7 flex flex-col bg-slate-50 border border-white rounded-md drop-shadow-md"
                >
                  {/**title */}
                  <div className='w-full flex flex-row'>
                    <SectionTitles
                      sectionTitle={section.title}
                      sectionSubtitle=''
                      sectionType='account'
                    />
                  </div>
                  {/**IA comment */}
                  <div className='w-full flex flex-col items-start list-none transition-all'>
                    {section.comment}
                  </div>
                  {/**showing information */}
                  <div className='w-full mt-1 lg:mt-2 flex flex-col'>
                    {section.content}
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
      :
      ''
  )
};