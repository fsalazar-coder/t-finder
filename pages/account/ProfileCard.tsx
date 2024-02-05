import ButtonPostUpdateDelete from "./ButtonPostUpdateDelete";
import CardsItems from "./CardsItems";

interface UserCardParams {
  data: { [key: string]: string },
  editDeleteButtonVisible: boolean,
  dataBaseCollection: string
}


export default function ProfileCard({ data, editDeleteButtonVisible, dataBaseCollection }: UserCardParams) {

  const shouldRenderData: boolean = Object.keys(data)?.length > 0;

  return (
    data &&
    <div className="w-full px-5 py-2 flex flex-col bg-white border border-color-border shadow-md rounded-lg transform transition-all">
      {/**user fullname */}
      <div className="w-full relative pb-2 flex flex-row justify-between border-b border-color-border">
        <h2 className={`w-full text-color-text-dark font-semibold`}>
          {data?.title}
        </h2>
        <ButtonPostUpdateDelete
          itemId={data?._id as string}
          action='update-delete'
          buttonType='update-delete-items'
          dataBaseCollection={dataBaseCollection}
          shouldRenderButton={shouldRenderData && editDeleteButtonVisible}
        />
      </div>
      {/**header */}
      <div className={`flex-row justify-between w-full flex pt-2 items-center`}>
        <ul className={`w-full flex flex-col`}>
          {data && <CardsItems element={data as any} carsModel='vertical' />}
        </ul>
      </div>
    </div>
  )
};


