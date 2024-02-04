interface Value { value: number }


export default function IconUnread({ value }: Value) {

  return (
    (value > 0) &&
    <div className='min-w-[1.25rem] h-5 absolute p-[2px] -top-[6px] left-4 flex justify-center items-center bg-white rounded-full'>
      <div className="w-full h-full flex justify-center items-center bg-color-notification-alert rounded-full">
        <h6 className='w-fit h-fit px-1 text-white text-[10px] text-center font-bold'>
          {value}
        </h6>
      </div>
    </div>
  )
}