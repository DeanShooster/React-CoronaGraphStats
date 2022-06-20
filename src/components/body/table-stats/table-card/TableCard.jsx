import { useState } from 'react';

import './table-card.scss';
import {BsExclamationCircleFill} from 'react-icons/bs';

import InfoBubble from '../../overview/status/status-card/info-bubble/InfoBubble';

const TableCard = ( props ) => {

    const [infoBubble,setInfoBubble] = useState(false);

    const PopOutHandler = () =>{
        setInfoBubble(!infoBubble);
    }

    return (
        <div className='table-card'>
            <h4>{props.title}</h4>
            <BsExclamationCircleFill  className='table-svg-mark' onMouseEnter={PopOutHandler} onMouseLeave={PopOutHandler}/>
            { props.menu }
            { infoBubble ? <InfoBubble title={props.title}/> : null }
        </div>
    );
};

export default TableCard;