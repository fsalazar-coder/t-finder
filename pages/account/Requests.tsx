import { useState } from "react";
import {
  useAuth,
  useAccountModule
} from "../../context/authContext";
import {
  IconCheckCircle,
  IconArrowRight
} from '../../icons/icons';
import SectionTitles from '../components/SectionTitles';
import JobRequestModal from "./JobRequestModal";
import TalentRequestModal from "./TalentRequestModal";



export default function Request(props: any) {

  const { auth } = useAuth();
  const { accountModule } = useAccountModule();
  const [jobRequestModal, setJobRequestModal] = useState(false);
  const [talentRequestModal, setTalentRequestModal] = useState(false);

  return (
    accountModule === 'Request' ?
      <>
        <div className='w-full h-screen pl-0 lg:pl-60 flex flex-row justify-center items-center'>
          <div className='container w-full h-full pt-14 lg:pt-10 p-5 lg:p-10 flex flex-col items-center transition-all'>
            <div className="w-full p-2 lg:p-5 mb-2 lg:mb-5 bg-white border rounded-lg drop-shadow-md">
              {/**title */}
              <div className='w-full flex flex-row'>
                <SectionTitles
                  sectionTitle='TALENT AND JOB REQUEST'
                  sectionSubtitle=''
                  sectionType='account'
                />
              </div>
              {/**container content */}
              <div className='w-full flex flex-col items-start list-none transition-all'>
                Your have one talent request and one job request
              </div>
            </div>
            <div className="w-full h-full flex flex-row">
              <button
                className='w-60 h-full p-1 lg:p-3 mr-2 lg:mr-5 bg-white border rounded-md drop-shadow-md'
                onClick={() => setTalentRequestModal(true)}
              >
                Talent Request form
              </button>
              <button
                className='w-60 h-full p-1 lg:p-3 mr-2 lg:mr-5 bg-white border rounded-md drop-shadow-md'
                onClick={() => setJobRequestModal(true)}
              >
                Job Request form
              </button>
            </div>
          </div>
        </div>
        {/**job request modal */}
        <JobRequestModal
          jobRequestModal={jobRequestModal}
          jobRequestModalClose={() => setJobRequestModal(false)}
        />

        {/**talent request modal */}
        <TalentRequestModal
          talentRequestModal={talentRequestModal}
          talentRequestModalClose={() => setTalentRequestModal(false)}
        />
      </>
      :
      ''
  )
};