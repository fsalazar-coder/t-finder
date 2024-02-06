


export default function ItemsCards({ element, carsModel }: any) {

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

  const keysNoRender: any = [' id', 'User id', 'Profile image url', 'Title', 'Job category', 'Talent category', 'Created at', 'Request id', 'Request job id', 'Request talent id', 'Full name', 'Status']

  function keyRenderCondition(keyElement: string) {
    return keysNoRender.every((key: string) => key !== keyElement)
  }

  return (
    Object.entries(newElement).map(([key, value]) => (
      keyRenderCondition(key) &&
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
};