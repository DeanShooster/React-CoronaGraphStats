import { useContext, useEffect, useState } from "react";
import { CartesianGrid, Cell, Scatter, ScatterChart, XAxis, YAxis } from "recharts";
import { GetChildPercentCity } from "../../../../api/DataFetches";
import { ScrollContext } from "../../../context/ScrollContext";
import FilterCard from "../filter-card/FilterCard";

const ChildPercentCityGraph = ( {width} ) => {

    const [data,setData] = useState(null);
    const [filteredData,setFilteredData] = useState(null);
    const [filteredText,setFilteredText] = useState(null);
    const [citySearchError,setCitySearchError] = useState(false);
    const {darkTheme,theme} = useContext(ScrollContext);

    useEffect(()=>{
        const fetchData = async ()=> {
            const result = await GetChildPercentCity();
            const finalResult = [];
            for(let i = 0; i < result.length; i++ )
                finalResult.push( {city: result[i].city , percent: result[i].percent, value: 10*(i+1) } );
            setFilteredText(`${finalResult.length} ישובים מוצגים`);
            setFilteredData(finalResult);
            setData(finalResult);
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    },[] )

    const color = darkTheme ? theme.darkTheme.color : theme.whiteTheme.color;

    const Filter = ( filterBy ) => {
        if( filterBy === '' )
            return setCitySearchError(false) && setFilteredText(`${data.length} ישובים מוצגים`) && setFilteredData(data);
        let cityFilter = [];
        for(let i = 0; i < data.length; i++)
            if( filterBy === data[i].city ){
                cityFilter.push( {city: data[i].city, percent: data[i].percent, value: data[i].value}) ;
                setFilteredText(data[i].city); setFilteredData(cityFilter); setCitySearchError(false); return ;
            }
        setCitySearchError(true); setFilteredText(`${data.length} ישובים מוצגים`); setFilteredData(data);
    }

    return (
        <div>
            <FilterCard Filter={Filter} filteredText={filteredText} title='אחוז ילדים לפי עיר'/>
            {citySearchError && <p style={{color:'red'}}>לא נמצא.</p>}
            <ScatterChart width={width} data={filteredData} height={250} margin={{ top: 25, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="0 0" />
                <XAxis dataKey='value' name="stature" axisLine={false} padding={ {left: 10,right:10}}
                    label={ {value:'חולים פעילים', position:'bottom', offset: 0,fill: color}} stroke={color}
                    tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc'}}/>
                <YAxis dataKey="percent" axisLine={false} padding={ { bottom: 20 } } tick={{ dx:-30}} stroke={color}
                    label={ {value:'אחוזים', position: 'top', offset:12, fill: color}} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'}}/>
                <Scatter name="A school" data={filteredData} fill="#8884d8">
                    { filteredData && filteredData.map((city) => ( <Cell key={city.city} fill={darkTheme ? 'rgb(230, 55, 29)' : 'salmon'} stroke='black'/> ))}
                </Scatter>
            </ScatterChart>
        </div>
    )
}

export default ChildPercentCityGraph;