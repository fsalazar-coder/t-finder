


export default function ItemContent ({ element }: any) {
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
              className='w-full flex flex-row items-center'
            >
              <h3 className='pr-2 text-sm lg:text-base text-slate-700 font-semibold'>
                {key === 'Created at' ? 'Request date' : key}:
              </h3>
              <h3 className='text-sm lg:text-base text-slate-500'>
                {typeof value === 'string' ? value : ''}
              </h3>
            </li>
          )))
      }
    </ul>
  )
};