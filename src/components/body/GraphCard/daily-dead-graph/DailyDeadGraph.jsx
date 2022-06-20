import { useEffect, useState } from 'react';

import './daily-dead.scss';

import { Bar, CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { GetDeadAvg } from '../../../../api/DataFetches';
import { useContext } from 'react';
import { ScrollContext } from '../../../context/ScrollContext';
import FilterCard from '../filter-card/FilterCard';
import CustomToolTip from '../custom-tool-tip/CustomToolTip';

const DailyDeadGraph = ( {width} ) => {

    const [deadAvg,setDeadAvg] = useState(null);
    const {darkTheme,theme} = useContext(ScrollContext);

    useEffect( ()=>{
        const fetchData = async () =>{
            const result = await GetDeadAvg();
            const finalResult = [];
            for(let i = 0; i < result.length; i++)
                finalResult.push( {date: new Date(result[i].date), dead: result[i].dead, percent: result[i].percent});
            finalResult.sort( (a,b)=> { return a.date - b.date} );  
            finalResult.map( (res)=> { return res.date =  (res.date.getDate() < 10 ? '0'+res.date.getDate() : res.date.getDate())
            + "/" + (res.date.getMonth() < 10 ? '0'+(res.date.getMonth()+1) : res.date.getMonth()+1) } )
            setDeadAvg(finalResult);
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    },[])

    const color = darkTheme ? theme.darkTheme.color : theme.whiteTheme.color;
    const bar = darkTheme ? 'rgb(155, 233, 133)' : 'rgb(35, 125, 125)';
    const dot = darkTheme ? 'rgb(252, 197, 55)' : 'rgb(255, 125, 103)';

    return(
        <div>
            <FilterCard filteredText='חודש אחרון'/>
            <div className={darkTheme ? 'daily-dead-list-dark-theme' : 'daily-dead-list-light-theme'}>
                <li>נפטרים</li>
                <li>ממוצע נע נפטרים</li>
            </div>
            <ComposedChart width={width} height={250} data={deadAvg} margin={{ top: 20, right: 20, bottom: 20, left: 20}}>
                <CartesianGrid strokeDasharray="1" vertical={false}/>
                <XAxis dataKey="date" scale="band" tickMargin={5} tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc',}}
                    label={{ value: `תאריך`, position: 'bottom', fill: color}} stroke={color}
                />
                <YAxis dataKey='dead' axisLine={false} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'}} tick={{ dx:-20}}
                    label={ {value:'נפטרים', position:'top', offset: 11,fill:color} } stroke={color}
                    />
                <Tooltip content={<CustomToolTip />} keys={['נפטרים','ממוצע נע נפטרים']} tableName='daily-dead'/>
                <Bar dataKey="dead" fill={bar} barSize={15}/>
                <Line type="linear" dataKey="percent" strokeWidth={2.5} stroke={dot} isAnimationActive={false}
                    dot={{ fill: dot, stroke: darkTheme ? 'black' :'white',strokeWidth: 1,r: 5}} activeDot={ {r:8,stroke: darkTheme ? 'black' :'white'}}
                />
            </ComposedChart>
        </div>
    )
}

export default DailyDeadGraph;