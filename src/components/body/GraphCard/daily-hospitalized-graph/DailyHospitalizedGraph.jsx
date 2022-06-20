import { useContext,useState,useEffect } from "react";
import { ScrollContext } from "../../../context/ScrollContext";

import '../hospitalized-graph/hospitalized-graph.scss';

import FilterCard from "../filter-card/FilterCard";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import CustomToolTip from "../custom-tool-tip/CustomToolTip";
import { GetDailyHospitalized } from "../../../../api/DataFetches";

const DailyHospitalizedGraph = ( {width} ) =>{

    const [data,setData] = useState(null);
    const {darkTheme,theme} = useContext(ScrollContext);

    useEffect( ()=>{
        const fetchData = async ()=>{
            const result = await GetDailyHospitalized();
            const finalResult = [];
            for(let i = 0; i < result.length; i++ )
                finalResult.push( {date: new Date(result[i].date), critical: result[i].critical, moderately: result[i].moderately,
                mild: result[i].mild } );
            finalResult.sort( (a,b)=> { return a.date - b.date} );
            finalResult.map( (res)=> { return res.date =  (res.date.getDate() < 10 ? '0'+res.date.getDate() : res.date.getDate())
            + "/" + (res.date.getMonth() < 10 ? '0'+(res.date.getMonth()+1) : res.date.getMonth()+1) } )
            setData( finalResult );
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    },[] )

    const color = darkTheme ? theme.darkTheme.color : theme.whiteTheme.color;
    const lineTwo = darkTheme ? 'rgb(253, 130, 100)' : 'rgb(182, 202, 81)';
    const lineThree = darkTheme ? 'rgb(155, 233, 133)' : 'rgb(35, 125, 125)';

    return (
        <div>
            <FilterCard filteredText='חודש אחרון'/>
            <div className={darkTheme ? 'hospitalized-list-dark-theme' : 'hospitalized-list-light-theme'}>
                <li>קשה</li>
                <li>בינוני</li>
                <li>קל</li>
            </div>
            <LineChart width={width} height={250} data={data} margin={ {top: 25, right: 30, left: -5, bottom: 10, }}>
                <CartesianGrid strokeDasharray="0" vertical={false} padding={10} />
                <XAxis dataKey="date" axisLine={false} padding={ {left: 10,right:10}}
                    label={ {value:'תאריך', position:'bottom', offset: -2,fill: color}} stroke={color}
                    tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc'}}/>
                <YAxis dataKey='critical' axisLine={false} padding={ { bottom: 20 } } tick={{ dx:-30}} stroke={color}
                    label={ {value:'מאושפזים', position: 'top', offset:15, fill: color}} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'} }/>
                <Tooltip content={<CustomToolTip />} keys={['קשה','בינוני','קל']} tableName='child-verified'/>
                <Line type="monotone" dataKey="mild" stroke='rgb(80, 203, 253)' strokeWidth={2.5} isAnimationActive={false}
                    dot={{ fill: 'rgb(80, 203, 253)', stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} 
                    activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>
                <Line type="monotone" dataKey="moderately" stroke={lineTwo} strokeWidth={2.5} isAnimationActive={false}
                    dot={{ fill: lineTwo, stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} 
                    activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>
                <Line type="monotone" dataKey="critical" stroke={lineThree} strokeWidth={2.5} isAnimationActive={false}
                    dot={{ fill: lineThree, stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} 
                    activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>
            </LineChart>
        </div>
    )
}

export default DailyHospitalizedGraph;