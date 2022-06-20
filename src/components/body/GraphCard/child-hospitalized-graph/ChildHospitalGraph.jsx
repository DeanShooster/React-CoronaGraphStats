import { useContext, useEffect, useState } from "react";
import { ScrollContext } from "../../../context/ScrollContext";

import '../child-verified-graph/child-verified.scss';

import { GetHospitalizedChildren } from "../../../../api/DataFetches";
import FilterCard from "../filter-card/FilterCard";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import CustomToolTip from "../custom-tool-tip/CustomToolTip";

const ChildHospitalGraph = ( {width} ) => {

    const [data,setData] = useState(null);
    const {darkTheme,theme} = useContext(ScrollContext);

    useEffect(()=>{
        const fetchData = async ()=> {
            const result = await GetHospitalizedChildren();
            const finalResult = [];
            for(let i = 0; i < result.length; i++ )
                finalResult.push( {date: new Date(result[i].date), infant: result[i].infant, child: result[i].child,
                    kid: result[i].kid, teenager: result[i].teenager } );
            finalResult.sort( (a,b)=> { return a.date - b.date} );
            finalResult.map( (res)=> { return res.date =  (res.date.getDate() < 10 ? '0'+res.date.getDate() : res.date.getDate())
            + "/" + (res.date.getMonth() < 10 ? '0'+(res.date.getMonth()+1) : res.date.getMonth()+1) } )
            setData(finalResult);
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
            <div className={darkTheme ? 'child-verified-list-dark-theme' : "child-verified-list-light-theme"}>
                <li>0-4</li>
                <li>5-11</li>
                <li>12-15</li>
                <li>16-18</li>
            </div>
            <LineChart width={width} height={250} data={data} margin={ {top: 25, right: 30, left: -5, bottom: 10, }}>
                <CartesianGrid strokeDasharray="0" vertical={false} padding={10} />
                <XAxis dataKey="date" axisLine={false} padding={ {left: 10,right:10}}
                    label={ {value:'תאריך', position:'bottom', offset: -2,fill: color}} stroke={color}
                    tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc'}}/>
                <YAxis dataKey='infant' axisLine={false} padding={ { bottom: 20 } } tick={{ dx:-30}} stroke={color}
                    label={ {value:'מאושפזים', position: 'top', offset:15, fill: color}} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'} }/>
                <Tooltip content={ <CustomToolTip /> } keys={['גילאי 0-4','גילאי 5-11','גילאי 12-15','גילאי 16-18']} tableName='child-verified' />
                <Line type="monotone" dataKey="infant" stroke='rgb(80, 203, 253)' strokeWidth={2.5} isAnimationActive={false}
                    dot={{ fill: 'rgb(80, 203, 253)', stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} 
                    activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>
                <Line type="monotone" dataKey="child" stroke={lineTwo} strokeWidth={2.5} isAnimationActive={false}
                    dot={{ fill: lineTwo, stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} 
                    activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>
                <Line type="monotone" dataKey="kid" stroke={lineThree} strokeWidth={2.5} isAnimationActive={false}
                    dot={{ fill: lineThree, stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} 
                    activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>
                <Line type="monotone" dataKey="teenager" stroke='rgb(186, 161, 239)' strokeWidth={2.5} isAnimationActive={false}
                    dot={{ fill: 'rgb(186, 161, 239)', stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} 
                    activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>
            </LineChart>
        </div>
    )
}

export default ChildHospitalGraph;