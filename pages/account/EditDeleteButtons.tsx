


export default function EditDeleteButtons({ id, icon, elementId, sectionValue, handleClick }: any) {
  return (
    <button
      id={id}
      className="pl-1 flex flex-row justify-center items-center hover:cursor-default transition-all"
      onClick={() => handleClick(elementId, sectionValue)}
    >
      <i className={
        `${id === 'edit-item-profile' ?
          'text-green-300 lg:text-color-text-tertiary lg:hover:text-green-500' :
          'text-red-300 lg:text-color-text-tertiary lg:hover:text-red-500'
        } text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer animate-[appear_0.7s_ease] transition-all`
      }
      >
        {icon}
      </i>
    </button>
  )
};