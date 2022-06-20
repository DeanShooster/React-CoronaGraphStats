import { useContext } from 'react';

import './info-bubble.scss';

import  Information from '../../../../../shared/information/info';
import { ScrollContext } from '../../../../../context/ScrollContext';

const InfoBubble = ( props ) => {

    const {darkTheme,theme} = useContext(ScrollContext);

    return (
        <div className='bubble' 
        style={darkTheme ? {background: theme.darkTheme.background, border: '1px solid #fff', color: theme.darkTheme.color} 
        : {background: 'rgb(248, 246, 234)', border: '1px solid rgba(0, 0, 0, 0.41)', color: theme.whiteTheme.color}}>
            { Information(props.title) }
        </div>
    );
};

export default InfoBubble;