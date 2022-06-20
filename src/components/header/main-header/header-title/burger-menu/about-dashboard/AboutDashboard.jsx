import { Fragment, useState } from 'react';

import './about-dashboard.scss';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'; // arrow left
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'; // arrow down


const AboutDashboard = () => {
    const [about,setAbout] = useState(true);

    const showAboutHandler = () => {
        setAbout(!about);
    }

    return (
        <div className='burger-menu-section-container'>
            <div onClick={showAboutHandler} className='burger-menu-bold'> על הדשבורד{about ? <MdOutlineKeyboardArrowDown className='arrow'/> : <MdOutlineKeyboardArrowLeft className='arrow'/>} </div>
            {about ? <Fragment>
                <p className='burger-menu-about-txt'>אודות</p>
                <p className='burger-menu-about-txt'>תנאי שימוש</p>
                <p className='burger-menu-about-txt'>מדריך למשתמש</p>
            </Fragment>: null }
        </div>
    );
};

export default AboutDashboard;