import { useEffect, useState,useContext } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import './hospitalized-graph.scss';

import {GetSick} from '../../../../api/DataFetches';
import { ScrollContext } from '../../../context/ScrollContext';
import FilterCard from '../filter-card/FilterCard';
import CustomToolTip from '../custom-tool-tip/CustomToolTip';

const HospitalizedGraph = ( {width} ) =>{

    const [data,setData] = useState(null);
    const [filteredData,setFilteredData] = useState( {mild: true, moderately: true, seriously: true } );
    const [filteredText,setFilteredText] = useState('קשה,בינוני,קל');
    const {darkTheme,theme} = useContext(ScrollContext);

    useEffect( ()=>{
        const fetchData = async () =>{
            const result = await GetSick();
            const finalResult = [];
            for(let i = 0; i < result.length; i++ )
                finalResult.push( {date: new Date(result[i].date) ,mild: result[i].sick.mild, moderately: result[i].sick.moderately
                ,seriously: result[i].sick.seriously.critical + result[i].sick.seriously.ECMO + result[i].sick.seriously.ventilated} );
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
    const green = darkTheme ? 'rgb(155, 233, 133)' : 'rgb(35, 125, 125)';
    const lightGreen = darkTheme ? 'rgb(253, 130, 100)' : 'rgb(182, 202, 81)';
    const teal = 'rgb(80, 203, 253)';
    const dotStroke = darkTheme ? 'black' : 'white';


    const Filter = ( filterBy ) => {
        if( !filterBy.mild && !filterBy.moderately && !filterBy.seriously){
            setFilteredData( {mild: true, moderately: true, seriously: true } );
            setFilteredText('קשה,בינוני,קל'); return;
        }
        setFilteredData(filterBy);
        const text = ((filterBy.seriously ? 'קשה,':'') + (filterBy.moderately ? 'בינוני,' : '') + (filterBy.mild ? 'קל' : ''));
        setFilteredText( text );
    }

    return (
        <div>
            <FilterCard Filter={Filter} title='מספר מאושפזים' filteredText={filteredText}/>
            <div className={darkTheme ? 'hospitalized-list-dark-theme' : 'hospitalized-list-light-theme'}>
                <li>קשה</li>
                <li>בינוני</li>
                <li>קל</li>
            </div>
            <AreaChart width={width} height={250} data={ data }
                margin={ {top: 25, right: 30, left: -5, bottom: 10, }} >
                <CartesianGrid strokeDasharray="0" padding={10} vertical={false} y={50}/>
                <XAxis dataKey="date" axisLine={false} padding={ {left: 10,right:10}} 
                    label={ {value:'תאריך', position:'bottom', offset: -2, fill: color } }
                    stroke={color}
                    tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc'}}
                />
                <YAxis axisLine={false} padding={ { bottom: 20 } } tick={{ dx:-20}} 
                    label={ {value:'מאושפזים', position: 'top', offset:13, fill: color } }
                    stroke={color}
                    tickLine={{ stroke: 'rgba(255, 0, 0, 0)'}}
                />
                <Tooltip content={<CustomToolTip />} keys={['קשה','בינוני','קל']} tableName='hospitalized'/>
                { filteredData.seriously &&  <Area type="monotone" dataKey="seriously" stackId="1" stroke={teal} strokeWidth={1.75} fill={teal} fillOpacity={0.8} isAnimationActive={false}
                    dot={ {stroke: dotStroke,strokeWidth: 1,fillOpacity:1,r:4}} activeDot={ { r:8,stroke: dotStroke } }
                />}
                { filteredData.moderately &&  <Area type="monotone" dataKey="moderately" stackId="1" stroke={lightGreen} strokeWidth={1.75} fill={lightGreen} fillOpacity={0.8} isAnimationActive={false}
                    dot={ {stroke:dotStroke,strokeWidth: 1,fillOpacity:1,strokeOpacity:1,r:4 }} activeDot={ { r:8,stroke: dotStroke } }
                /> }
                { filteredData.mild &&  <Area type="monotone" dataKey="mild" stackId="1" stroke={green} fill={green} strokeWidth={1.75} fillOpacity={0.8} isAnimationActive={false}
                    dot={ {stroke: dotStroke, strokeWidth: 1, fillOpacity:1,r:4} } activeDot={ { r:8,stroke: dotStroke } }
                />}
            </AreaChart>
        </div>
    )
}

export default HospitalizedGraph;