import { useUI } from "../../context/authContext";



export default function CardsItems({ element, carsModel }: any) {

  const { screenNarrow } = useUI();

  function formatKeys(element: any) {
    const formattedElement: Record<string, any> = {};
    for (const key in element) {
      const formattedKey = key
        .split('_')
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1); // Capitaliza la primera palabra
          }
          else {
            return word.charAt(0).toLowerCase() + word.slice(1); // Mantén las otras palabras en minúscula
          }
        })
        .join(' ');
      formattedElement[formattedKey] = element[key];
    }
    return formattedElement;
  }

  let newElement = formatKeys(element);
  let verticalCarsModel: boolean = carsModel === 'vertical';

  return (
    Object.entries(newElement).map(([key, value]) => (
      key !== ' id' && key !== 'User id' && key !== 'Profile image' && key !== 'Title' && key !== 'Job category' && key !== 'Talent category' && key !== 'Created at' && key !== 'Request job id' && key !== 'Request talent id' && key !== 'Full name' && (
        <li key={key}
          className={`${verticalCarsModel ? 'w-full pb-2' : 'w-1/3 '}  flex flex-col`}
        >
          <h4 className='w-full text-color-text-dark text-sm'>
            {typeof value === 'string' && value}
          </h4>
          <h5 className='w-full text-color-text-almost-clear text-xs'>
            {key}
          </h5>
        </li>
      )))
  )
};