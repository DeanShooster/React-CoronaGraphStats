import { useContext } from 'react';
import { ScrollContext } from '../../../context/ScrollContext';

import './custom-tool-tip.scss';
import '../hospitalized-graph/hospitalized-graph.scss';
import '../new-daily-verified-graph/new-daily-verified.scss';
import '../bed-hospitalized-graph/bed-hospitalized.scss';

import DataList from './data-list/DataList';

const CustomToolTip = ( props ) => {

    const {darkTheme,theme} = useContext(ScrollContext);

    if( !props.payload?.length ) return <div>אין נתונים</div>;
    const days = ['ב','ג','ד','ה','ו','ש','א'];
    const tempDate = props.payload[0].payload.date.replaceAll('/','.');
    const date = tempDate[3] + tempDate[4] + '/' + tempDate[0] + tempDate[1];

    const listClass = [
        { key: 'hospitalized' , className: darkTheme ? 'hospitalized-list-dark-theme' : 'hospitalized-list-light-theme' },
        { key: 'new-verified' , className: darkTheme ? 'daily-verified-list-dark-theme' : 'daily-verified-list-light-theme' },
        { key: 'daily-dead', className: darkTheme ? 'daily-dead-list-dark-theme' : 'daily-dead-list-light-theme' },
        { key: 'epidemic' , className: darkTheme ? 'daily-dead-list-dark-theme' : 'daily-dead-list-light-theme' },
        { key: 'bed-hospitalized', className: darkTheme ? 'bed-hospitalized-list-dark-theme' : 'bed-hospitalized-list-light-theme' },
        { key: 'child-verified' , className: darkTheme ? 'child-verified-list-dark-theme' : 'child-verified-list-light-theme' }
    ]

    let finalClass = '';
    for(let i = 0; i < listClass.length; i++)
        if( listClass[i].key === props.tableName ){
            finalClass = listClass[i].className; break;
        }

    return (
        <div className='tool-tip-container' style={darkTheme ? {backgroundColor: 'rgb(42, 59, 71)', color: theme.darkTheme.color} 
            : { backgroundColor: theme.whiteTheme.background, color: theme.whiteTheme.color }}>
            <p>יום {days[new Date( '2022.' + date ).getUTCDay()]}' { tempDate }.22</p>
            <div className={finalClass}>
                <DataList data={Object.values( props.payload[0]?.payload )} keys={props.keys}/>
            </div>
        </div>
    )
}

export default CustomToolTip;