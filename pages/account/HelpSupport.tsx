import { useAuthUI } from "../../context/authContext";
import SectionTitles from '../components/SectionTitles';



export default function HelpSupport(props: any) {

  return (
    <div className='w-full h-screen pl-0 lg:px-60 flex flex-row justify-center items-center bg-slate-50'>
      <div className='container w-full h-full pt-14 lg:pt-10 p-5 lg:p-10 flex flex-col justify-center items-center transition-all'>
        <div className="w-full h-full p-5 lg:p-10 bg-white border border-slate-200 rounded-lg">
          {/**title */}
          <div className='w-full flex flex-row'>
            <SectionTitles
              sectionTitle='HELP & SUPPORT'
              sectionSubtitle='FAQ, Contact Us, and other support links'
            />
          </div>
          {/**container content */}
          <div className='w-full flex flex-col items-center list-none transition-all'>
            Help and Support
          </div>
        </div>
      </div>
    </div>
  )
};