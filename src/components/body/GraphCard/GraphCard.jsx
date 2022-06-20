import { Fragment, useContext, useEffect, useState } from 'react';

import './graph-card.scss';

import HospitalizedGraph from './hospitalized-graph/HospitalizedGraph';
import GraphTitle from './graph-title/GraphTitle';
import NewDailyVerifiedGraph from './new-daily-verified-graph/NewDailyVerifiedGraph';
import WeeklyAvgVerifiedGraph from './weekly-avg-verified-graph/WeeklyAvgVerifiedGraph';
import DailyDeadGraph from './daily-dead-graph/DailyDeadGraph';
import { ScrollContext } from '../../context/ScrollContext';
import EpidemicGraph from './epidemic-graph/EpidemicGraph';
import BedHospitalizedGraph from './bed-hospitalized-graph/BedHospitalizedGraph';
import ChildVerifiedGraph from './child-verified-graph/ChildVerifiedGraph';
import ChildIsolatedGraph from './child-isolated-graph/ChildIsolatedGraph';
import ChildHospitalGraph from './child-hospitalized-graph/ChildHospitalGraph';
import ChildPercentCityGraph from './child-percent-city-graph/ChildPercentCityGraph';
import SeniorDailyVerifiedGraph from './senior-daily-verified-graph/SeniorDailyVerifiedGraph';
import SeniorSeriouslySickGraph from './senior-seriously-sick-graph/SeniorSeriouslySickGraph';
import SickByAgeGraph from './sick-by-age-graph/SickByAgeGraph';
import DailyHospitalizedGraph from './daily-hospitalized-graph/DailyHospitalizedGraph';
import DailyDeadVaccinatedGraph from './daily-dead-vaccinated-graph/DailyDeadVaccinatedGraph';
import CoronaTestsGraph from './corona-tests-graph/CoronaTestsGraph';
import IsolationReasonsGraph from './isolation-reasons-graph/IsolationReasonsGraph';
import CoronaStrengthGraph from './corona-strength-graph/CoronaStrengthGraph';
import SickVaccinatedStatsGraph from './sick-vaccinated-stats-graph/SickVaccinatedStatsGraph';
import SickMaleFemaleGraph from './sick-male-female-graph/SickMaleFemaleGraph';

const GraphCard = ( props ) => {

    const [graph,setGraph] = useState(null);
    const {darkTheme,theme} = useContext(ScrollContext);
    const screenWidth = useWindowSize();

    function useWindowSize() 
    {
        const [windowSize, setWindowSize] = useState(undefined);
        useEffect(() => {
          function handleResize(){
            if( window.innerWidth >= 1300 )
                return setWindowSize( window.innerWidth/3 - 100 );
            if( window.innerWidth < 1300 && window.innerWidth > 950 )
                return setWindowSize( window.innerWidth/2 - 130 );
            if( window.innerWidth <= 950 && window.innerWidth > 750 )
                return setWindowSize( window.innerWidth - 250);
            if( window.innerWidth <= 750 && window.innerWidth > 600 )
                return setWindowSize( window.innerWidth - 200 );
            if( window.innerWidth <= 600 && window.innerWidth > 500)
                return setWindowSize( window.innerWidth - 150 );
            if( window.innerWidth <= 500 )
                return setWindowSize( window.innerWidth - 125 );
          }
          window.addEventListener("resize", handleResize);
          handleResize();
          return () => window.removeEventListener("resize", handleResize);
        }, []);
        return windowSize;
    }

    useEffect( ()=>{
        const graphs = [
            { key: 'hospitalized', title: 'מספר מאושפזים-יומי', visualGraph: <HospitalizedGraph width={screenWidth}/>},
            { key: 'epidemic', title: 'מקדם הדבקה', visualGraph: <EpidemicGraph width={screenWidth}/>},
            { key: 'daily-new-verified', title: 'מאומתים חדשים יומי', visualGraph: <NewDailyVerifiedGraph width={screenWidth}/>},
            { key: 'bed-hospitalized', title: 'אחוז תפוסת מיטות באשפוזים', visualGraph: <BedHospitalizedGraph width={screenWidth} /> },
            { key: 'child-verified', title: 'מגמת ילדים מאומתים - ממוצע נע 7 ימים', visualGraph: <ChildVerifiedGraph width={screenWidth} />},
            { key: 'child-isolated', title: 'מגמת ילדים מבודדים - ממוצע נע 7 ימים' , visualGraph: <ChildIsolatedGraph width={screenWidth}/> },
            { key: 'child-percent-city' , title: 'תחלואת ילדים ביחס לתחלואה הכללית -יישובים', visualGraph: <ChildPercentCityGraph width={screenWidth}/> },
            { key: 'child-hospitalized', title: 'מגמת ילדים באשפוז - ממוצע שבועי' , visualGraph: <ChildHospitalGraph width={screenWidth} /> },
            { key: 'senior-daily-verified', title: 'מאומתים יומי - התחסנות', visualGraph: <SeniorDailyVerifiedGraph width={screenWidth}/>},
            { key: 'senior-seriously-sick', title: 'חולים קשה - התחסנות', visualGraph: <SeniorSeriouslySickGraph width={screenWidth}/> },
            { key: 'sick-by-age', title: 'חולים פעילים - גיל והתחסנות', visualGraph: <SickByAgeGraph width={screenWidth}/> },
            { key: 'daily-seriously-sick' , title: 'מספר חולים - יומי', visualGraph: <HospitalizedGraph width={screenWidth}/> },
            { key: 'daily-hospitalized', title: 'מצב מאושפזים - שינוי יומי', visualGraph: <DailyHospitalizedGraph width={screenWidth}/> },
            { key: 'daily-dead', title: 'נפטרים-יומי', visualGraph: <DailyDeadGraph width={screenWidth}/> },
            { key: 'daily-dead-vaccinated' , title: 'נפטרים יומי – מצב התחסנות', visualGraph: <DailyDeadVaccinatedGraph width={screenWidth}/> },
            { key: 'corona-tests', title: 'מספר בדיקות קורונה - יומי', visualGraph: <CoronaTestsGraph width={screenWidth}/> },
            { key: 'weekly-avg-verified', title: 'ממוצע מאומתים שבועי' , visualGraph: <WeeklyAvgVerifiedGraph width={screenWidth}/> },
            { key: 'corona-strength', title: 'מקדם ההדבקה R', visualGraph: <CoronaStrengthGraph  width={screenWidth} /> },
            { key: 'isolation-reasons', title: 'מגמת מבודדים חדשים – סיבת בידוד' , visualGraph: <IsolationReasonsGraph width={screenWidth}/> },
            { key: 'sick-vaccinated-stats', title: 'תחקור תחלואה לאור אירועים והתחסנות', visualGraph: <SickVaccinatedStatsGraph width={screenWidth}/> },
            { key: 'sick-male-female', title: 'תחלואת נשים וגברים', visualGraph: <SickMaleFemaleGraph  width={screenWidth}/> }
        ]
        for(let i = 0; i < graphs.length ; i++ )
            if( graphs[i].key === props.graph ){
                setGraph( graphs[i] ); break; }
    },[props.graph,screenWidth])

    return (
        <div className='graph-card' style={ darkTheme ? { background: theme.darkTheme.background} : {background: theme.whiteTheme.background} }>
            { graph ? <Fragment>
                <GraphTitle title={graph.title}/>
                {graph.visualGraph}
            </Fragment> : <div className='test'>GRAPH</div> } 
        </div>
    );
};

export default GraphCard;