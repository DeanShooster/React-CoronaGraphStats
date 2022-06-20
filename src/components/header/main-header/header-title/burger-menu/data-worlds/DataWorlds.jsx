import { Fragment, useState } from 'react';

import './data-worlds.scss';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'; // arrow down
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'; // arrow left
import { BiLeftArrowAlt } from 'react-icons/bi'; // Arrow with a tail left

const DataWorlds = () => {
    const [dataWorlds,setDataWorlds] = useState(true);
    const [hiData,setHiData] = useState(false);
    const [gis,setGis] = useState(false);

    const showDataWorldsHandler = () => {
        setDataWorlds(!dataWorlds);
    }

    const showHiDataHandler = () => {
        setHiData(!hiData);
    }

    const showGisHandler = () => {
        setGis(!gis);
    }

    return (
        <div className="data-worlds-container burger-menu-section-container intro-animation">
            <div onClick={showDataWorldsHandler} className='burger-menu-bold'> עולם הדאטה {dataWorlds ? <MdOutlineKeyboardArrowDown className='arrow'/> : <MdOutlineKeyboardArrowLeft className='arrow'/>} </div>
            {dataWorlds ? <Fragment>
                <div onClick={showHiDataHandler}>הי-DATA{hiData ? <MdOutlineKeyboardArrowDown className='arrow'/> : <MdOutlineKeyboardArrowLeft className='arrow'/>}</div>
                {hiData ? <Fragment>
                    <p className='burger-menu-txt'>דו"ח 1 - אשפוז</p>
                    <p className='burger-menu-txt'>דו"ח 2 - חולים במצב קשה</p>
                </Fragment> : null }
                <div onClick={showGisHandler} >GIS{gis ?<MdOutlineKeyboardArrowDown className='arrow-inline'/>: <MdOutlineKeyboardArrowLeft className='arrow-inline'/>}</div>
                {gis ? <Fragment> 
                    <p className='burger-menu-txt'>מפת צבע רמזור</p>
                    <p className='burger-menu-txt'>דשבורד מפת התחסנות לקורונה</p>
                    <p className='burger-menu-txt'>צבעי המדינות בעולם</p>
                    <p className='burger-menu-txt'>בדיקות מהירות בפריסה ארצית</p>
                    <p className='burger-menu-txt'>בידודים פעילים לפי רשויות</p>
                </Fragment> : null}
                <div>Data Gov<BiLeftArrowAlt className='arrow'/></div>
            </Fragment> : null }
        </div>
    );
};

export default DataWorlds;