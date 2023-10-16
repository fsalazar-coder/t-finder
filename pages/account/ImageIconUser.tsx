import { useUserImageUrl } from "../../context/authContext";
import Image from 'next/image';
import { IconUser } from '@/icons/icons';



export default function ImageIconUser(props: any) {

  const { userImageUrl } = useUserImageUrl();

  return (
    userImageUrl ?
      <div className={
        `${props.size === 'small' ?
          'outline-2 border-2' :
          props.size === 'large' ?
            'outline-4 border-2' :
            ''} w-full h-full flex flex-col justify-center items-center rounded-full outline outline-fuchsia-600 border-slate-50`}>
        <Image
          className='w-full h-full rounded-full'
          width={400}
          height={400}
          src={userImageUrl as string}
          alt='profile-image'
        />
      </div>
      :
      <i className='w-full h-full text-slate-50 text-6xl font-light flex flex-row justify-center items-center border border-slate-50 rounded-full cursor-pointer transition-all'>
        <IconUser />
      </i>
  )
}