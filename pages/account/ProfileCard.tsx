import ButtonPostUpdateDelete from "./ButtonPostUpdateDelete";
import ItemsCards from "./ItemsCards";

interface UserCardParams {
  data: { [key: string]: string },
  editDeleteButtonVisible: boolean,
  dataBaseCollection: string
}


export default function ProfileCard({ data, editDeleteButtonVisible, dataBaseCollection }: UserCardParams) {

  const shouldRenderData: boolean = data ? Object.keys(data).length > 0 : false;

  return (
    shouldRenderData &&
    <div className="w-full px-5 py-2 flex flex-col md:hover:border-color-highlighted-clear transform transition-all">
      {/**subtitle */}
      <div className="w-full relative pb-2 flex flex-row justify-between items-center">
        {/**viñeta */}
        <h2 className={`w-3 h-3 mr-2 flex rounded-full bg-color-secondary border-[3px] border-color-highlighted-clear`} />
        {/**subtitle text */}
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
      {/**content */}
      <div className={`flex-row justify-between w-full flex pt-2 items-center`}>
        <ul className={`w-full pl-5 flex flex-col`}>
          <ItemsCards
            element={data as any}
            cardModel='vertical'
            itemsCardType={`Profile ${dataBaseCollection}`}
          />
        </ul>
      </div>
    </div>
  )
};


