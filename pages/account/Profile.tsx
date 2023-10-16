import {
  useAuth,
  useAccountModule
} from "../../context/authContext";
import {
  IconCheckCircle,
  IconArrowRight
} from '../../icons/icons';
import SectionTitles from '../components/SectionTitles';



export default function Profile(props: any) {

  const { auth } = useAuth();
  const { accountModule } = useAccountModule();

  return (
    accountModule === 'Profile' ?
      <div className='w-full h-screen pl-0 lg:pl-60 flex flex-row justify-center items-center'>
        <div className='container w-full h-full pt-14 lg:pt-10 p-5 lg:p-10 flex flex-col justify-center items-center transition-all'>
          <div className="w-full h-full p-5 lg:p-10 bg-white border rounded-lg drop-shadow-md">
            {/**title */}
            <div className='w-full flex flex-row'>
              <SectionTitles
                sectionTitle='PROFILE'
                sectionSubtitle='Elements in Profile User'
              />
            </div>
            {/**container content */}
            <div className='w-full flex flex-col items-center list-none transition-all'>
              - Profile Picture <br />
              - Name <br />
              - Email <br />
              - Profession or Occupation <br />
              - Location
            </div>
          </div>
        </div>
      </div>
      :
      ''
  )
};