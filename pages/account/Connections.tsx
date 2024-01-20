import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import SectionTitles from '../components/SectionTitles';
import ConnectionCard from './ConnectionCard';

type ConnectionsType = 'seekers-talent' | 'seekers-job';



export default function Connections() {
  const { accountModule } = useAuthUI();
  const { unreadMessagesForUser, usersConnected } = useAuthData();
  const [cardHover, setCardHover] = useState(false);
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);
  const [connectionsType, setConnectionsType] = useState<ConnectionsType>('seekers-talent');
  const [connectionsToShow, setConnectionsToShow] = useState([]);


  useEffect(() => {
    if (usersConnected && accountModule === 'Connections') {
      let connectionsData: any = usersConnected?.filter((element: any) => (element?.type === connectionsType))
      setConnectionsToShow(connectionsData);
    }
  }, [usersConnected, connectionsType, accountModule]);


  useEffect(() => {
    if (usersConnected && accountModule === 'Connections') {
      let connectionsSeekersTalent: any = usersConnected?.filter((element: any) => (element?.type === 'seekers-talent'));
      let connectionsSeekersJob: any = usersConnected?.filter((element: any) => (element?.type === 'seekers-job'));
      let connectionsSeekersTalentLength: number = connectionsSeekersTalent.length;
      let connectionsSeekersJobLength: number = connectionsSeekersJob.length;

      if (connectionsSeekersJobLength > connectionsSeekersTalentLength) {
        setConnectionsType('seekers-job');
      }
      else {
        setConnectionsType('seekers-talent');
      }
    }
  }, [usersConnected]);

  const connectionTypeItems: any = [
    { id: 'seekers-talent', label: 'Seekers talent' },
    { id: 'seekers-job', label: 'Seekers job' }
  ];

  const containerClassNames = `w-full flex-col px-5 py-16 lg:w-[52rem] lg:px-2 lg:px-8 lg:py-9 lg:flex-col flex justify-between transition-all`;


  return (
    <div className={`pl-0 lg:pl-60 w-full h-full flex flex-col items-center`}>
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
              {/**submenu connections: seekers talent and seekers job */}
              <ul className={`w-fit flex flex-row items-center`}>
                {
                  connectionTypeItems.map(({ id, label }: any, index: any) => {
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

      </div>
    </div>
  );
};