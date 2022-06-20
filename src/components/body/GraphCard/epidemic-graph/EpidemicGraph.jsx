import { useEffect,useState,useContext } from "react";

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import FilterCard from "../filter-card/FilterCard";
import { GetEpidemic } from "../../../../api/DataFetches";
import { ScrollContext } from "../../../context/ScrollContext";
import GraphLegend from "./graph-legend/GraphLegend";
import CustomToolTip from "../custom-tool-tip/CustomToolTip";


const EpidemicGraph = ( {width}) => {

    const [data,setData] = useState(null);
    const {darkTheme,theme} = useContext(ScrollContext);

    useEffect( ()=>{
        const fetchData = async () => {
            const result = await GetEpidemic();
            const finalResult = [];
            for(let i = 0; i < result.length; i++ )
                finalResult.push( {date: new Date(result[i].date), status: result[i].status, statusR: 1 } );
            finalResult.sort( (a,b)=> { return a.date - b.date} );
            finalResult.map( (res)=> { return res.date =  (res.date.getDate() < 10 ? '0'+res.date.getDate() : res.date.getDate())
            + "/" + (res.date.getMonth() < 10 ? '0'+(res.date.getMonth()+1) : res.date.getMonth()+1) } )
            setData( finalResult );
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    },[])


    const color = darkTheme ? theme.darkTheme.color : theme.whiteTheme.color;
    const lineOne = darkTheme ? 'rgb(155, 233, 133)' : 'rgb(35, 125, 125)';
    const lineTwo = darkTheme ? 'rgb(252, 197, 55)' : 'rgb(253, 130, 100)';

    return (
        <div>
            <FilterCard filteredText='חודש אחרון'/>
            <GraphLegend darkTheme={darkTheme}/>
            <LineChart width={width} height={250} data={data} margin={ {top: 25, right: 30, left: -5, bottom: 10, }}>
                <CartesianGrid strokeDasharray="0" vertical={false} padding={10} />
                <XAxis dataKey="date" axisLine={false} padding={ {left: 10,right:10}}
                    label={ {value:'תאריך', position:'bottom', offset: -2,fill: color}} stroke={color}
                    tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc'}}/>
                <YAxis dataKey='status' axisLine={false} padding={ { bottom: 20 } } tick={{ dx:-30}} stroke={color}
                    label={ {value:'מקדם', position: 'top', offset:15,fill: color}} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'} }/>
                <Tooltip content={<CustomToolTip />} keys={['מקדם הדבקה','סטאטוס']} tableName='epidemic'/>
                <Line type="monotone" dataKey="statusR" stroke={lineTwo} strokeWidth={2.5} isAnimationActive={false}
                    dot={{ fill: lineTwo, stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>
                <Line type="monotone" dataKey="status" stroke={lineOne} strokeWidth={2.5} isAnimationActive={false}
                    dot={{ fill: lineOne, stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>
            </LineChart>
        </div>
    )
}

export default EpidemicGraph;