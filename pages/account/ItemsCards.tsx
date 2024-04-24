import { useUI } from "@/context/ContextUI";


export default function ItemsCards({ element, cardModel, itemsCardType }: any) {
  const { accountModule } = useUI();
  const isDashboard: boolean = accountModule === 'Dashboard';


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
  };

  let newElement = formatKeys(element);
  let verticalCardModel: boolean = cardModel === 'vertical';
  const keysRenderModule: any = {
    'Talent': [!isDashboard && 'Job description', 'Created at', 'Required skills', 'Required experience years', 'Modality work', 'Company name', 'Location', 'Offered compensation'],
    'Job': [!isDashboard && 'Talent description', 'Created at', 'Offered skills', 'Experience years', 'Modality work', 'Desired compensation', 'Location', 'Offered compensation'],
    'Personal info': ['Full name', 'Profession or occupation', 'Preferred language', 'Location'],
    'Profile experience': [
      'Role title',
      'Responsibilities',
      'Experience years',
      'Technologies used',
      'Team size',
      'Update at',
    ],
    'Profile education': [
      'University school',
      'Major field study',
      'Graduation year',
      'Update at',
    ],
    'Profile courses': [
      'Institution',
      'Skills acquired',
      'Year completed',
      'update at',
    ],
    'Profile recommendations': [
      'Title',
      'Recommender_title',
      'Recommender_organization',
      'Recommendation',
      'Recommender email',
      'Recommender phone',
      'Update at',
    ]
  };
  const keysRender: any = keysRenderModule[itemsCardType];

  //const keysNoRender: any =  [' id', 'User id', 'Profile image url', 'Title', 'Job category', 'Talent category', 'Request id', 'Request job id', 'Request talent id', 'Full name', 'Status']

  function keyRenderCondition(keyElement: string) {
    return keysRender?.some((key: string) => key === keyElement)
  }

  return (
    element &&
    Object.entries(newElement).map(([key, value]) => (
      keyRenderCondition(key) &&
      <li key={key}
        className={`${verticalCardModel ? 'w-full pb-2' : 'w-1/3'}  flex flex-col`}
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