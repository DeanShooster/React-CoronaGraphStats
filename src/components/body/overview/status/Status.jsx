import { useEffect, useState } from 'react';

import './status.scss';

import StatusCard from './status-card/StatusCard';
import {GetGeneralStats} from '../../../../api/DataFetches';

const Status = ( ) => {

    const [yesterdaySick,setYesterdaySick] = useState(null);
    const [sick,setSick] = useState(null);
    const [vaccinated,setVaccinated] = useState(null);
    const [dead,setDead] = useState(null);
    const [yesterdayPercent,setYesterdayPercent] = useState(null);
    const [yesterdayIsolated,setYesterdayIsolated] = useState(null);

    // CSS RULES
    const statusStat = 'status-stat';
    const subStat = 'sub-stat';
    const miniTitle = 'mini-title';
    const vaccineDose = 'vaccine-dose';

    // Calls for general statistics.
    useEffect( () => {
        const fetchData = async () => {
            const result = await GetGeneralStats();
            if( result ){
                setYesterdaySick( createYesterdaySickHTML( result.YesterdaySick, result.YesterdayHospitalized ,result.totalSick) );
                setVaccinated( createVaccinatedHTML( result.vaccinated) );
                setSick( createSickHTML( result.sick) );
                setDead( createDeadHTML (result.dead) );
                setYesterdayPercent(  createYesterdaySickPercentHTML( result.YesterdayTests ) );
                setYesterdayIsolated( createYesterdayIsolatedHTML( result.YesterdayTests.isolated, result.isolated ) );
            }
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    },[]);

    // Creates a div for general sick/tested and yesterday sick.
    const createYesterdaySickHTML = ( yesterday, hospitalized, totalSick ) => {
        const div = <div>
            <p className={statusStat}>{yesterday}</p>
            <p className={subStat}><span>{parseInt(yesterday*0.1)}</span> - מחצות <span>{1300}</span> סה"כ </p>
            <p className={miniTitle}>חולים פעילים</p>
            <p className={statusStat}>{totalSick}</p>
            <p className={subStat}><span>{parseInt(totalSick*.07)}</span> - מחצות   <span>{hospitalized}</span> בב"יהח</p>
        </div>;
        return div;
    }

    // Creates a div for the sick people.
    const createSickHTML = ( sick ) => {
        const div = <div>
            <p className={statusStat}>{sick.ventilated + sick.ECMO + sick.critical}</p>
            <div className='sick-list'>
                <li className={subStat}>מתוכם קריטי <span>{sick.critical}</span></li>
                <li className={subStat}>מחוברים לאקמו <span>{sick.ECMO}</span></li>
                <li className={subStat}>מונשמים <span>{sick.ventilated}</span></li>
            </div>
            <p className={subStat}> חולים בינוני <span>{sick.moderately}</span></p>
            <p className={subStat}>חולים קל <span>{sick.mild}</span></p>
        </div>
        return div;
    }

    // Creates a div for the vaccinated people.
    const createVaccinatedHTML = ( dose ) =>{
        const div = <div>
            <p><span className={vaccineDose}>מנה 1 </span><span className={statusStat}>{dose.firstDose}</span></p>
            <p><span className={vaccineDose}>מנה 2 </span> <span className={statusStat}>{dose.secondDose}</span></p>
            <p><span className={vaccineDose}>מנה 3 </span> <span className={statusStat}>{dose.thirdDose}</span></p>
            <p><span className={vaccineDose}>מנה 4 </span><span className={statusStat}>{dose.fourthDose}</span></p>
        </div>
        return div;
    }

    // Creates a div for total dead.
    const createDeadHTML = ( dead ) => {
        const div = <div className={statusStat}> {dead} </div>;
        return div;
    }

    // Creates a div for yesterday % of sick and healthy and total tests.
    const createYesterdaySickPercentHTML = ( yesterdayTests ) =>{
        const percent = ((yesterdayTests.sick/(yesterdayTests.healthy + yesterdayTests.sick)) * 100).toFixed(2);
        const div = <div>
            <p className={statusStat}>{percent}%</p>
            <p className={subStat}><span>{yesterdayTests.sick}</span> נדבקים לגילוי הנגיף אתמול</p>
            <p className={subStat}><span>{yesterdayTests.healthy + yesterdayTests.sick}</span> כלל הבדיקות אתמול</p>
        </div>
        return div;
    }

    const createYesterdayIsolatedHTML = ( yesterdayIsolated, totalIsolated) => {
        const div = <div>
            <p className={statusStat}>{yesterdayIsolated}</p>
            <p className={miniTitle}>סה"כ שוהים בבידוד</p>
            <p className={statusStat}>{totalIsolated}</p>
        </div>
        return div;
    }

    return (
        <div className='status-container'>
            <StatusCard title={'מאומתים אתמול'} data={yesterdaySick}/>
            <StatusCard title={'חולים קשה'} data={sick} />
            <StatusCard title={'מתחסנים'} data={vaccinated} />
            <StatusCard title={'נפטרים מצטבר'} data={dead} />
            <StatusCard title={'אחוז נדבקים חיוביים אתמול'} data={yesterdayPercent}/>
            <StatusCard title={'מבודדים חדשים אתמול'} data={yesterdayIsolated}/>
        </div>
    );
};

export default Status;