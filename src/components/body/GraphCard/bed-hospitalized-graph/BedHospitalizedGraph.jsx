import { useContext,useState,useEffect } from "react";

import './bed-hospitalized.scss';
import { Bar, CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis } from "recharts";

import FilterCard from "../filter-card/FilterCard";
import { ScrollContext } from "../../../context/ScrollContext";
import { GetBedHospitalized } from "../../../../api/DataFetches";
import CustomToolTip from "../custom-tool-tip/CustomToolTip";

const BedHospitalizedGraph = ( {width} ) => {

    const [data,setData] = useState(null);
    const [filteredData,setFilteredData] = useState( {beds: true, percent: true} );
    const [filteredText,setFilteredText] = useState('תפוסת מיטות,אחוז תפוסה');
    const {darkTheme,theme} = useContext(ScrollContext);

    useEffect( ()=> {
        const fetchData = async () => {
            const result = await GetBedHospitalized();
            const finalResult = [];
            for(let i = 0; i < result.length; i++)
                finalResult.push( {date: new Date(result[i].date), beds: result[i].bed, percent: parseInt((result[i].bed / result[i].totalBed)*100)});
            finalResult.sort( (a,b)=> { return a.date - b.date} );
            finalResult.map( (res)=> { return res.date =  (res.date.getDate() < 10 ? '0'+res.date.getDate() : res.date.getDate())
            + "/" + (res.date.getMonth() < 10 ? '0'+(res.date.getMonth()+1) : res.date.getMonth()+1) } )
            setData( finalResult );
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    }, [] )

    const color = darkTheme ? theme.darkTheme.color : theme.whiteTheme.color;
    const dot = darkTheme ? '#FFFFFF' : '#898989';

    const Filter = ( filterBy ) => {
        if( !filterBy.beds && !filterBy.percent ){
            setFilteredData({beds: true, percent: true} );
            setFilteredText( 'תפוסת מיטות,אחוז תפוסה'); return;
        }
        setFilteredData( filterBy );
        const text = ( (filterBy.beds ? 'תפוסת מיטות' : '') + ','+ (filterBy.percent ? 'אחוז תפוסה':''));
        setFilteredText( text );
    }

    return (
        <div>
            <FilterCard Filter={Filter} title='אחוז תפוסת מיטות באשפוזים' filteredText={filteredText}/>
            <div className={darkTheme ? 'bed-hospitalized-list-dark-theme' : 'bed-hospitalized-list-light-theme'}>
                <li>מיטות בתפוסה</li>
                <li>אחוז ממוצע נע</li>
            </div>
            <ComposedChart width={width} height={250} data={ data } margin={{ top: 20, right: 20, bottom: 20, left: 20}} >
                <CartesianGrid stroke="#f5f5f5" vertical={false} strokeDasharray="0"/>
                <XAxis dataKey="date" scale="band" tickMargin={5} tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc',}}
                    label={{ value: `תאריך`, position: 'bottom',fill: color}} stroke={color}
                   
                />
                <YAxis dataKey={filteredData.percent ? 'percent' : 'beds'} axisLine={false} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'}} tick={{ dx:-20}}
                    label={ {value:'% תפוסה', position:'top', offset: 10,fill: color} } stroke={color}

                />
                <Tooltip content={<CustomToolTip /> } keys={['מיטות בתפוסה','אחוז ממוצע נע']} tableName='bed-hospitalized'/>
                { filteredData.beds &&  <Bar dataKey="beds" barSize={20} fill="#50cbfd" /> }
                { filteredData.percent && <Line type="linear" dataKey="percent" strokeWidth={2.5} stroke={dot} isAnimationActive={false}
                    dot={{ fill: dot, stroke: darkTheme ? 'black' :'white', strokeWidth: 1 ,r: 5}} activeDot={ {r: 8, stroke: darkTheme ? 'black' :'white'} }/>}
            </ComposedChart>
        </div>
    )
}

export default BedHospitalizedGraph;