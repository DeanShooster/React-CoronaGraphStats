import { useContext } from "react";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { GetWeeklyVerifiedAvg } from "../../../../api/DataFetches";
import { ScrollContext } from "../../../context/ScrollContext";

const WeeklyAvgVerifiedGraph = ( {width}) => {

    const [weeklyAvg,setWeeklyAvg] = useState(null);
    const {darkTheme,theme} = useContext(ScrollContext);

    useEffect( ()=>{
        const fetchData = async () => {
            const result = await GetWeeklyVerifiedAvg();
            const tempResult = [];
            for(let i = 0; i < result.length; i++)
                tempResult.push( {date: new Date(result[i].date), sick: result[i].sick} );
            tempResult.sort( (a,b)=> { return a.date - b.date} );
            const finalResult = [];
            let sick = 0, count = parseInt(tempResult.length/3), start = null,end = null;
            for(let i = 0; i < tempResult.length; i++){
                if( count === 0 ){
                    end = (tempResult[i].date.getDate() < 10 ? '0'+tempResult[i].date.getDate() : ''+tempResult[i].date.getDate())
                        +'.'+(tempResult[i].date.getMonth() < 10 ? '0'+(tempResult[i].date.getMonth()+1) : tempResult[i].date.getMonth()+1);
                    finalResult.push( { sick: parseInt(sick/3), date: start +'-'+end } );
                    count = parseInt(tempResult.length/3); sick = 0;
                }
                if( count === parseInt(tempResult.length/3))
                    start = (tempResult[i].date.getDate() < 10 ? '0'+tempResult[i].date.getDate() : ''+tempResult[i].date.getDate())
                    +'.'+(tempResult[i].date.getMonth() < 10 ? '0'+(tempResult[i].date.getMonth()+1) : tempResult[i].date.getMonth()+1);
                sick += tempResult[i].sick;
                count--;
            }
            setWeeklyAvg(finalResult);
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    }, [] )

    const color = darkTheme ? theme.darkTheme.color : theme.whiteTheme.color;

    return (
        <div>
            <LineChart width={width} height={300} margin={ { top: 60, right: 30, left: 0, bottom: 20, } } data={ weeklyAvg } >
                <CartesianGrid strokeDasharray="0" vertical={false}/>
                <XAxis dataKey="date" axisLine={false} tickSize={17} tickMargin={5} tickLine={{strokeWidth: 0,stroke: '#cccccc'}} 
                    angle={-20} stroke={color}
                />
                <YAxis dateKey="sick" label={ {value:'ממוצע', position:'top', offset: 20,fill: color} } 
                    axisLine={false} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'}} tick={{ dx:-40}} stroke={color}
                />
                <Line type="step" dataKey="sick" strokeWidth={2.5} stroke="rgb(80, 203, 253)" dot={false}/>
            </LineChart>
        </div>
    )
}

export default WeeklyAvgVerifiedGraph;