
export default function EditDeleteButtons({ elementId, buttons, collection, listHover, itemHover, index }: any) {

  const renderCondition: boolean = listHover && (itemHover === index);

  return (
    (listHover && (itemHover === index)) &&
    <div className="w-full absolute top-1 right-5 py-2 flex flex-row justify-end items-center transition-all z-20">
      {
        buttons?.map((button: any) => {
          return (
            <button
              key={button.key}
              id={button.id}
              className="pl-1 flex flex-row justify-center items-center hover:cursor-default transition-all"
              onClick={() => button.click(elementId, collection)}
            >
              <i className={
                `${button.id === 'edit-item-profile' ?
                  'text-green-300 lg:text-color-text-almost-clear lg:hover:text-green-500' :
                  'text-red-300 lg:text-color-text-almost-clear lg:hover:text-red-500'
                } text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer animate-[appear_0.7s_ease] transition-all`
              }
              >
                {button.icon}
              </i>
            </button>
          )
        })
      }
    </div>
  )
};