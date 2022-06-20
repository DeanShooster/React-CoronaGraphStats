import { Fragment, useState } from 'react';

import './content-worlds.scss';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'; // arrow down
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'; //arrow left

const ContentWorlds = () => {
    const [showWorlds,setShowWorlds] = useState(true);

    const showWorldsHandler = () => {
        setShowWorlds(!showWorlds);
    }

    return (
        <div className='burger-menu-section-container burger-menu-section-border'>
            <div onClick={showWorldsHandler} className='burger-menu-bold'>עולמות תוכן {showWorlds? <MdOutlineKeyboardArrowDown className='arrow'/> : <MdOutlineKeyboardArrowLeft className='arrow'/> }</div>
            {showWorlds ? <Fragment>
                <div className='burger-menu-bold'>קורונה</div>
                <div className='ghost-text'>עולמות תוכן נוספים בקרוב...</div>
            </Fragment> : null }
        </div>
    );
};

export default ContentWorlds;