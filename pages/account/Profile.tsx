import {
  useAuth,
  useAccountModule,
  usePersonalInfoModal
} from "../../context/authContext";
import {
  IconArrowRight,
  IconAdd,
  IconEdit,
  IconDelete,
  IconCheckCircle
} from '../../icons/icons';
import SectionTitles from '../components/SectionTitles';
import PersonalInfo from "./PersonalInfo";
import PersonalInfoModal from "./PersonalInfoModal";



export default function Profile(props: any) {

  const { auth } = useAuth();
  const { accountModule } = useAccountModule();
  const { setPersonalInfoModal } = usePersonalInfoModal();

  const sections = [
    {
      id: 'personal-information',
      title: 'PERSONAL INFORMATION',
      comment: 'Comment IA!!!',
      clickAdd: () => setPersonalInfoModal(true),
      clickEdit: () => console.log('edit personal information'),
      clickDelete: () => console.log('delete personal information'),
      content: <PersonalInfo />
    },
    {
      id: 'educational-information',
      title: 'EDUCATIONAL INFORMATION',
      comment: 'Comment IA!!!',
      clickAdd: () => setPersonalInfoModal(true),
      clickEdit: () => console.log('edit personal information'),
      clickDelete: () => console.log('delete personal information'),
      content: <PersonalInfo />
    },
    {
      id: 'experience-information',
      title: 'EXPERIENCE INFORMATION',
      comment: 'Comment IA!!!',
      clickAdd: () => setPersonalInfoModal(true),
      clickEdit: () => console.log('edit personal information'),
      clickDelete: () => console.log('delete personal information'),
      content: <PersonalInfo />
    }
  ]

  return (
    accountModule === 'Profile' ?
      <div className='w-full h-screen pl-0 lg:pl-60 flex flex-row justify-center items-center'>
        <ul className='container w-full h-full pt-14 lg:pt-10 p-5 lg:p-10 flex flex-col transition-all'>
          {
            /**sections: personal, educational and experience information */
            sections.map((section: any) => {
              return (
                <li
                  key={section.id}
                  id={section.id}
                  className="w-full p-2 lg:p-5 mb-2 lg:mb-5 flex flex-col bg-slate-50 border border-white rounded-md drop-shadow-md"
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
                  {/**add information */}
                  <div className="w-full flex flex-row justify-end items-center">
                    <div className="flex-row items-center">
                      <h3>Add personal information</h3>
                    </div>
                    <button className="ml-1 lg:ml-2 flex flex-row justify-center items-center">
                      <i
                        className='text-green-600 lg:text-gray-400 lg:hover:text-green-500 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                        onClick={section.clickAdd}
                      >
                        <IconAdd />
                      </i>
                    </button>
                  </div>
                  {/**showing information */}
                  <div className='w-full mt-1 lg:mt-2 p-1 lg:p-2 flex flex-row bg-white border rounded-md'>
                    {/**content information */}
                    <div className="w-full flex-row">
                      {section.content}
                    </div>
                    {/**edit and delete button */}
                    <div className="flex flex-row justify-between items-center">
                      <button className="flex flex-row justify-center items-center">
                        <i
                          className='text-green-600 lg:text-gray-400 lg:hover:text-green-500 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                          onClick={section.clickEdit}
                        >
                          <IconEdit />
                        </i>
                      </button>
                      <button className="flex flex-row justify-center items-center">
                        <i
                          className='text-green-600 lg:text-gray-400 lg:hover:text-red-500 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                          onClick={section.clickDelete}
                        >
                          <IconDelete />
                        </i>
                      </button>
                    </div>
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