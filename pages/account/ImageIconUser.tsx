import { useAuthData } from "../../context/authContext";
import Image from 'next/image';
import { IconUser } from '@/icons/icons';



export default function ImageIconUser(props: any) {

  const { userImageUrl } = useAuthData();

  return (
    userImageUrl ?
      <div className='w-full h-full  flex flex-col justify-center items-center bg-gradient-to-br from-fuchsia-400 via-slate-300 to-fuchsia-600 rounded-full z-20'>
        <Image
          className={
            `${props.size === 'small' ?
              'border-[1px]' :
              props.size === 'large' ?
                'border-[3px]' :
                ''} w-[93%] h-[93%] flex flex-col justify-center items-center rounded-full border-slate-300`}
          width={400}
          height={400}
          src={userImageUrl as string}
          alt='profile-image'
        />
      </div>
      :
      <i className='w-full h-full text-slate-50 text-6xl font-light flex flex-row justify-center items-center border border-slate-50 rounded-full transition-all'>
        <IconUser />
      </i>
  )
}