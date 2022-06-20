import { useEffect, useState,useContext } from 'react'

import '../new-daily-verified-graph/new-daily-verified.scss';

import FilterCard from "../filter-card/FilterCard";
import { ScrollContext } from '../../../context/ScrollContext';
import { Bar, CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import CustomToolTip from '../custom-tool-tip/CustomToolTip';
import { GetVaccinatedSickStats } from '../../../../api/DataFetches';


const SickVaccinatedStatsGraph = ( {width} ) =>{

    const [data,setData] = useState(null);
    const {darkTheme,theme} = useContext(ScrollContext);

    useEffect( ()=>{
        const fetchData = async()=>{
            const result = await GetVaccinatedSickStats();
            const finalResult = [];
            for(let i = 0; i < result.length; i++)
                finalResult.push( {date: new Date(result[i].date), sick: result[i].sick , vaccinatedPercent: result[i].vaccinatedPercent} );
            finalResult.sort( (a,b)=> { return a.date - b.date} );
            finalResult.map( (res)=> { return res.date =  (res.date.getDate() < 10 ? '0'+res.date.getDate() : res.date.getDate())
            + "/" + (res.date.getMonth() < 10 ? '0'+(res.date.getMonth()+1) : res.date.getMonth()+1) } )
            setData(finalResult);
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    } ,[])

    const color = darkTheme ? theme.darkTheme.color : theme.whiteTheme.color;
    const dot = darkTheme ? 'rgb(252, 197, 55)' : 'rgb(255, 125, 103)';

    return (
        <div>
            <FilterCard filteredText='חודש אחרון'/>
            <div className={darkTheme ? 'daily-verified-list-dark-theme' : 'daily-verified-list-light-theme'}>
                <li>% מחוסנים מצטבר</li>
                <li>מאומתים</li>
            </div>
            <ComposedChart width={width} height={250} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20}} >
                <CartesianGrid stroke="#f5f5f5" vertical={false}/>
                <XAxis dataKey="date" scale="band" tickMargin={5} tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc',}}
                    label={{ value: `תאריך`, position: 'bottom', fill: color}}
                    stroke={color}
                />
                <YAxis dataKey='sick' axisLine={false} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'}} tick={{ dx:-20}}
                    label={ {value:'מאומתים', position:'top', offset: 10, fill: color} }
                    stroke={color}
                />
                <Tooltip content={<CustomToolTip /> } keys={['אחוז מחוסנים מצטבר','מאומתים']} tableName='new-verified'/>
                <Bar dataKey="sick" barSize={20} fill="#50cbfd" />
                <Line type="linear" dataKey="vaccinatedPercent" strokeWidth={2.5} stroke={dot} isAnimationActive={false}
                    dot={{ fill: dot, stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>
            </ComposedChart>
        </div>
    )
}

export default SickVaccinatedStatsGraph;