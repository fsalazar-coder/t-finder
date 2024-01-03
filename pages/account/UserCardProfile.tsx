import CardsItems from "./CardsItems";

interface UserCardParams {
  data: { [key: string]: string },
}



export default function UserCardProfile({ data }: UserCardParams) {

  return (
    <div className="w-full px-5 py-2 flex flex-col bg-white border border-color-border shadow-md rounded-lg transform transition-all">
      {/**user fullname */}
      <div className="w-full pb-2 flex border-b border-color-border">
        <h2 className='w-fit text-color-text-dark font-semibold'>
          {data?.title}
        </h2>
      </div>
      {/**header */}
      <div className={`flex-row justify-between w-full flex pt-2 items-center`}>
        <ul className={`w-full flex flex-col`}>
          <CardsItems element={data as any} />
        </ul>
      </div>
    </div>
  )
};


