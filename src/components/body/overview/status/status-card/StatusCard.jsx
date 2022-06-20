import { useContext, useState } from 'react';

import './status-card.scss';
import {BsExclamationCircleFill} from 'react-icons/bs';

import Loader from '../../../../shared/loader/Loader';
import InfoBubble from './info-bubble/InfoBubble';
import { ScrollContext } from '../../../../context/ScrollContext';

const StatusCard = ( props ) => {

    const [showBubble,setShowBubble] = useState(false);
    const { darkTheme,theme} = useContext(ScrollContext);

    const infoBubbleHandler = () => setShowBubble(!showBubble);

    return (
        <div className='status-card' style={darkTheme ? {background: theme.darkTheme.background, boxShadow: '0 0 2px 0 black'} : {background: theme.whiteTheme.background}}>
            <div className='status-title'>
                <h4>{props.title}</h4>
                <BsExclamationCircleFill className='svg-mark' onMouseEnter={infoBubbleHandler} onMouseLeave={infoBubbleHandler}/>
                { showBubble && <InfoBubble title={ props.title }/> }
            </div>
            { props.data ? props.data : <Loader /> }
        </div>
    );
};

export default StatusCard;