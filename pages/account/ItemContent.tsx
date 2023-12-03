


export default function ItemContent({ element }: any) {
  
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

  let newElement = formatKeys(element)

  return (
    <ul className='w-full flex flex-col cursor-default lg:hover:cursor-pointer'>
      {
        Object.entries(newElement).map(([key, value]) => (
          key !== ' id' && key !== 'User id' && (
            <li key={key}
              className='w-full pb-2 flex flex-col'
            >
              <h4 className='w-full text-color-text-secondary text-sm font-semibold'>
                {typeof value === 'string' ? value : ''}
              </h4>
              <h5 className='w-full text-color-text-tertiary text-xs'>
                {key === 'Created at' ? 'Request date' : key}
              </h5>
            </li>
          )))
      }
    </ul>
  )
};