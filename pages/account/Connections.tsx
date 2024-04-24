import { useState, useEffect } from 'react';
import { useUI } from "@/context/ContextUI";
import { useAuthSocket } from '@/context/ContextAuthSocket';
import SectionTitles from '../components/SectionTitles';
import ConnectionCard from './ConnectionCard';

type ConnectionsType = 'seekers-talent' | 'seekers-job';


export default function Connections() {
  const { accountModule } = useUI();
  const { usersConnectedData, unreadMessagesForUser } = useAuthSocket();
  const [cardHover, setCardHover] = useState(false);
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);
  const [connectionsType, setConnectionsType] = useState<ConnectionsType>('seekers-talent');
  const [connectionsToShow, setConnectionsToShow] = useState([]);

  useEffect(() => {
    if (usersConnectedData && accountModule === 'Connections') {
      let connectionsData: any = usersConnectedData?.filter((element: any) => (element?.type === connectionsType))
      setConnectionsToShow(connectionsData);
    }
  }, [usersConnectedData, connectionsType, accountModule]);

  //Ordenamiento, para que siempre aparezca el submenu con mas contactos
  useEffect(() => {
    if (usersConnectedData && accountModule === 'Connections') {
      let connectionsSeekersTalent: any = usersConnectedData?.filter((element: any) => (element?.type === 'seekers-talent'));
      let connectionsSeekersJob: any = usersConnectedData?.filter((element: any) => (element?.type === 'seekers-job'));
      let connectionsSeekersTalentLength: number = connectionsSeekersTalent?.length;
      let connectionsSeekersJobLength: number = connectionsSeekersJob?.length;

      if (connectionsSeekersJobLength > connectionsSeekersTalentLength) {
        setConnectionsType('seekers-job');
      }
      else {
        setConnectionsType('seekers-talent');
      }
    }
  }, [accountModule, usersConnectedData]);

  const connectionTypeItems: any = [
    { id: 'seekers-talent', label: 'Employers' },
    { id: 'seekers-job', label: 'Talents' }
  ];

  const containerClassNames = `w-full flex-col px-5 lg:w-[52rem] lg:px-2 lg:px-8 lg:py-9 lg:flex-col flex justify-between transition-all`;
  const shouldRenderData = Array.isArray(connectionsToShow) && connectionsToShow.length > 0;


  return (
    <div className={`w-full h-full flex flex-col items-center`}>
      <div className={containerClassNames}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        <div className={`w-full relative py-1 mb-2 flex justify-between flex-row items-center border-color-border`}>
          <div className='w-full flex flex-row justify-between items-center'>
            <div className='w-2/3 flex flex-row items-center'>
              <div className="pr-5">
                <SectionTitles
                  sectionTitle={`Connections`}
                  sectionType='account'
                />
              </div>
              {/**submenu connections: Employers and Talents */}
              <ul className={`w-fit flex flex-row items-center`}>
                {
                  connectionTypeItems?.map(({ id, label }: any, index: any) => {
                    let itemActived: boolean = connectionsType === id;
                    return (
                      <li
                        key={index}
                        className='px-5 border-l border-color-border cursor-default'
                        onClick={() => setConnectionsType(id)}
                      >
                        <button className='w-full'>
                          <h4 className={`${itemActived ? 'text-color-highlighted font-semibold' : 'text-color-text-almost-clear'} text-base`}>
                            {label}
                          </h4>
                        </button>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        {
          shouldRenderData ?
            <ul className={`grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 gap-x-2 gap-y-1 w-full h-full py-1`}>
              {
                connectionsToShow?.map((element: any, index: any) => {
                  let connectedUserId: string = element.user_id;
                  return (
                    <li
                      key={`-${index}`}
                      className={`${listHover && (itemHover === index ? '' : 'opacity-25')} w-full relative py-1 flex flex-col transform transition-all`}
                      onMouseEnter={() => { setItemHover(index); setListHover(true) }}
                      onMouseLeave={() => { setItemHover(null); setListHover(false) }}
                    >
                      <ConnectionCard
                        data={element && element}
                        unreadMessagesToConnectedUser={unreadMessagesForUser[connectedUserId] || 0}
                      />
                    </li>
                  )
                })
              }
            </ul>
            :
            <div className="w-full px-5 py-5 flex flex-col bg-white border border-color-border shadow-md rounded-lg transform transition-all">
              <h2 className='w-fit text-color-text-medium'>
                {`You do not have any connected ${connectionsType === 'seekers-talent' ? 'employer' : 'talent'}`}
              </h2>
            </div>
        }
      </div>
    </div>
  );
};