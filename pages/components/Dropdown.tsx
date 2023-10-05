import { useAuth } from "../../context/authContext";
import { IconUser } from '@/icons/icons';
import Link from 'next/link';



export default function Dropdown(props: any) {

  const { auth } = useAuth();

  return (
    <>
      <div className='w-0 h-0 absolute top-[1.50rem] right-[0.35rem] border-r-8 border-r-transparent border-t-8 border-t-transparent border-l-8 border-l-transparent border-b-8 border-b-slate-50 z-50' />
      <ul className='w-auto h-auto absolute top-[2.50rem] -right-2 flex-col justify-start items-start rounded-sm z-40'>
        {/**user image */}
        <li className='w-full h-auto py-6 px-4 flex flex-row items-center bg-slate-50 border-b border-slate-100'>
          <div className="flex flex-row items-center">
            {
              props.imageUser ?
                props.imageUser
                :
                <i className='w-10 h-10 text-slate-500 text-sm lg:text-base xl:text-lg font-light flex flex-row justify-center items-center border border-slate-500 rounded-full cursor-pointer transition-all'>
                  <IconUser />
                </i>
            }
            <h5 className='text-slate-500 hover:text-slate-600 pl-3 text-xs lg:text-sm xl:text-sm font-light'>
              Hello, <br /> {props.emailUser}
            </h5>
          </div>
        </li>
        {/**acount options */}
        {
          props.navbarElement?.map((item: any, index: any) => {
            return (
              <li
                key={index}
                className='w-full h-auto py-2 px-4 flex flex-row items-center bg-slate-50 hover:bg-fuchsia-100'>
                <Link href={auth ? item?.href : ''}>
                  <h3 className='text-slate-500 hover:text-slate-600 text-xs lg:text-sm xl:text-base font-light'>
                    {item?.title}
                  </h3>
                </Link>
              </li>
            )
          })
        }
        {/**logout button */}
        <li className='w-full h-auto py-4 px-4 flex flex-row justify-center items-center bg-slate-50 hover:bg-fuchsia-100 border-t border-slate-100'>
          <button
            className='w-full h-full flex flex-row items-center'
            onClick={() => props.buttonLogout()}
          >
            <h3 className='h-auto text-slate-500 hover:text-slate-600 text-xs lg:text-sm xl:text-base font-light'>
              Log out
            </h3>
          </button>
        </li>
      </ul>
    </>
  )
}