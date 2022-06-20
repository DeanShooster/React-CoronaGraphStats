import './new-daily-verified.scss';

import { Bar, CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { useEffect, useState,useContext } from 'react';
import { GetDailySick } from '../../../../api/DataFetches';
import { ScrollContext } from '../../../context/ScrollContext';
import FilterCard from '../filter-card/FilterCard';
import CustomToolTip from '../custom-tool-tip/CustomToolTip';

const NewDailyVerifiedGraph = ( {width}) =>{

    const [newVerified,setNewVerified] = useState(null);
    const {darkTheme,theme} = useContext(ScrollContext);

    useEffect( ()=>{
        const fetchData = async () =>{
            const result = await GetDailySick();
            const finalResult = [];
            for(let i = 0; i < result.length; i++)
                finalResult.push( {date: new Date(result[i].date), sick: result[i].sick , avg: result[i].avg} );
            finalResult.sort( (a,b)=> { return a.date - b.date} );
            finalResult.map( (res)=> { return res.date =  (res.date.getDate() < 10 ? '0'+res.date.getDate() : res.date.getDate())
            + "/" + (res.date.getMonth() < 10 ? '0'+(res.date.getMonth()+1) : res.date.getMonth()+1) } )
            setNewVerified(finalResult);
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    },[] )

    const color = darkTheme ? theme.darkTheme.color : theme.whiteTheme.color;
    const dot = darkTheme ? 'rgb(252, 197, 55)' : 'rgb(255, 125, 103)';

    return (
        <div>
            <FilterCard filteredText='חודש אחרון'/>
            <div className={darkTheme ? 'daily-verified-list-dark-theme' : 'daily-verified-list-light-theme'}>
                <li>מאומתים חדשים</li>
                <li>ממוצע נע מאומתים</li>
            </div>
            <ComposedChart width={width} height={250} data={ newVerified } margin={{ top: 20, right: 20, bottom: 20, left: 20}} >
                <CartesianGrid stroke="#f5f5f5" vertical={false}/>
                <XAxis dataKey="date" scale="band" tickMargin={5} tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc',}}
                    label={{ value: `תאריך`, position: 'bottom', fill: color}}
                    stroke={color}
                />
                <YAxis dataKey='sick' axisLine={false} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'}} tick={{ dx:-20}}
                    label={ {value:'מאומתים', position:'top', offset: 10, fill: color} }
                    stroke={color}
                />
                <Tooltip content={<CustomToolTip /> } keys={['מאומתים','ממוצע נע']} tableName='new-verified'/>
                <Bar dataKey="sick" barSize={20} fill="#50cbfd" />
                <Line type="linear" dataKey="avg" strokeWidth={2.5} stroke={dot} isAnimationActive={false}
                    dot={{ fill: dot, stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>
            </ComposedChart>
        </div>
    )
}


export default NewDailyVerifiedGraph;