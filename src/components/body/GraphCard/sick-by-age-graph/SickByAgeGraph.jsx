import { useState,useContext,useEffect } from 'react';
import { ScrollContext } from '../../../context/ScrollContext';

import '../hospitalized-graph/hospitalized-graph.scss';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import FilterCard from "../filter-card/FilterCard";
import { GetSickByAge } from '../../../../api/DataFetches';


const SickByAgeGraph = ( {width} ) =>{

    const [data,setData] = useState(null);
    const {darkTheme,theme} = useContext(ScrollContext);

    useEffect( ()=>{
        const fetchData = async () => {
            const result = await GetSickByAge();
            setData( result );
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    },[] );

    const color = darkTheme ? theme.darkTheme.color : theme.whiteTheme.color;
    const lineTwo = darkTheme ? 'rgb(253, 130, 100)' : 'rgb(182, 202, 81)';
    const lineThree = darkTheme ? 'rgb(155, 233, 133)' : 'rgb(35, 125, 125)';

    return (
        <div>
            <FilterCard filteredText='חודש אחרון'/>
            <div className={darkTheme ? 'hospitalized-list-dark-theme' : 'hospitalized-list-light-theme'}>
                <li>לא מחוסנים</li>
                <li>מחוסנים ללא תוקף</li>
                <li>מחוסנים</li>
            </div>
            <BarChart width={width} height={250} data={data} margin={ {top: 25, right: 30, left: -5, bottom: 10, }}>
                <CartesianGrid strokeDasharray="0" vertical={false} padding={10} />
                <XAxis dataKey="age" axisLine={false} padding={ {left: 10,right:10}}
                    label={ {value:'קבוצת גיל', position:'bottom', offset: -2,fill: color}} stroke={color}
                    tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc'}}/>
                <YAxis dataKey='total' axisLine={false} padding={ { bottom: 20 } } tick={{ dx:-30}} stroke={color}
                    label={ {value:'חולים', position: 'top', offset:15, fill: color}} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'} }/>
                <Bar dataKey="vaccinated" fill="rgb(80, 203, 253)" />
                <Bar dataKey="outdatedVaccinated" fill={lineTwo} />
                <Bar dataKey="notVaccinated" fill={lineThree} />
            </BarChart>
        </div>
    )
}

export default SickByAgeGraph;