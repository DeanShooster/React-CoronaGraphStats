import { useState } from 'react';

import './graph-title.scss';
import {BsExclamationCircleFill} from 'react-icons/bs';
import {BiDotsVerticalRounded} from 'react-icons/bi';

import InfoBubble from '../../overview/status/status-card/info-bubble/InfoBubble';
import BurgerPopUp from '../../table-stats/city-vaccination/burger-pop-up/BurgerPopUp';
import { useContext } from 'react';
import { ScrollContext } from '../../../context/ScrollContext';

const GraphTitle = ( {title} ) => {

    const [bubbleInfo,setBubbleInfo] = useState(false);
    const [showMenu,setShowMenu] = useState(false);
    const {darkTheme, theme} = useContext(ScrollContext);

    const BubbleInfoHandler = () => setBubbleInfo(!bubbleInfo);
    const BurgerPopUpHandler = () => setShowMenu(!showMenu);

    return (
        <div className='graph-title-container'>
            <h4>{title}</h4>
            <BsExclamationCircleFill onMouseEnter={BubbleInfoHandler} onMouseLeave={BubbleInfoHandler}/>
            {bubbleInfo && <InfoBubble title={title}/> }
            <BiDotsVerticalRounded className='graph-title-burger' onClick={BurgerPopUpHandler}/>
            {showMenu && <BurgerPopUp color={darkTheme? theme.darkTheme.color : theme.whiteTheme.color}
                            background={darkTheme? theme.darkTheme.background : theme.whiteTheme.background}/>}
        </div>
    )
}

export default GraphTitle;