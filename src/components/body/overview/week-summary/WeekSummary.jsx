import { useEffect, useState } from 'react';

import './week-summary.scss';

import StatusCard from "../status/status-card/StatusCard";
import { GetLastWeekStats } from '../../../../api/DataFetches';

const WeekSummary = ( {background} ) =>{

    const [totalSick,setTotalSick] = useState(null);
    const [totalSeriouslySick,setTotalSeriouslySick] = useState(null);
    const [totalDead,setTotalDead] = useState(null);
    const [totalTested,setTotalTested] = useState(null);

    // CSS RULES
    const weekStat = 'week-stat';
    const weekSubStat = 'week-sub-stat';

    useEffect( ()=>{
        const fetchData = async () => {
            const result = await GetLastWeekStats();
            if( result ){
                setTotalSick( createTotalSickHTML( result.sick ) );
                setTotalSeriouslySick( createTotalSeriouslySickHTML(result.seriouslySick) );
                setTotalDead( createTotalDeadHTML(result.dead) );
                setTotalTested( createTotalTestedHTML( result.sick ,result.tested ) );
            }
        }
    setTimeout(() => {
        fetchData();
    }, 500);        
    },[]);

    // Creates a div for total sick ( last week ).
    const createTotalSickHTML = ( totalSick ) =>{
        const div = <div>
            <p className={weekStat}>{totalSick}</p>
            <p className={weekSubStat}><span>4.5%+</span> משבעה ימים קודמים</p>
        </div>;
        return div;
    }

    // Creates a div for total SERIOUSLY sick ( last week ).
    const createTotalSeriouslySickHTML = ( totalSeriouslySick ) =>{
        const div = <div>
            <p className={weekStat}>{totalSeriouslySick}</p>
            <p className={weekSubStat}><span>17.3%-</span> משבעה ימים קודמים</p>
        </div>;
        return div;
    }

    // Creates a div for total DEAD ( last week ).
    const createTotalDeadHTML = ( totalDead ) =>{
        const div = <div>
            <p className={weekStat}>{totalDead}</p>
            <p className={weekSubStat}><span>78%-</span> משבעה ימים קודמים</p>
        </div>
        return div;
    }

    // Creates a div for total Tested and newlySick ( last week ).
    const createTotalTestedHTML = ( totalSick , totalTested ) =>{
        const newlySick = ((totalSick / totalTested)*100).toFixed(2);
        const div = <div>
            <p className={weekStat}>{totalTested}</p>
            <p className={weekSubStat}><span>19%+</span> משבעה ימים קודמים</p>
            <p className={weekSubStat}><span>{newlySick}%+</span> נבדקים חיוביים</p>
        </div>;
        return div;
    }

    return (
        <div className='week-summary' style={{ backgroundColor: background}}>
            <h4 className='week-summary-title'>סיכום 7 ימים אחרונים</h4>
            <div className="week-summary-container">
                <StatusCard title={'מספר המאומתים'} data={totalSick}/>
                <StatusCard title={'מספר חולים קשה'} data={totalSeriouslySick}/>
                <StatusCard title={'מספר נפטרים'} data={totalDead}/>
                <StatusCard title={'מספר נבדקים'} data={totalTested}/>
            </div>
        </div>
    );
};

export default WeekSummary;