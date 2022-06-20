import { useContext,useState,useEffect, Fragment } from "react";
import { ScrollContext } from "../../../context/ScrollContext";

import '../hospitalized-graph/hospitalized-graph.scss';
import './corona-tests.scss';

import FilterCard from "../filter-card/FilterCard";
import { RadialBar, RadialBarChart } from "recharts";
import { GetCoronaTests } from "../../../../api/DataFetches";

const CoronaTestsGraph = ( {width} ) => {

    const [data,setData] = useState(null);
    const {darkTheme} = useContext(ScrollContext);

    useEffect( ()=>{
        const fetchData = async ()=>{
            const result = await GetCoronaTests();
            setData(result);
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    },[] )

    const lineTwo = darkTheme ? 'rgb(253, 130, 100)' : 'rgb(182, 202, 81)';
    const lineThree = darkTheme ? 'rgb(155, 233, 133)' : 'rgb(35, 125, 125)';

    return (
        <div>
            <FilterCard filteredText='חודש אחרון'/>
            <div className={darkTheme ? 'hospitalized-list-dark-theme' : 'hospitalized-list-light-theme'}>
                <li>בדיקות PCR</li>
                <li>בדיקות אנטיגן</li>
            </div>
            <div className="corona-tests-numbers">
                {data ? <Fragment><p className="PCR">{data[0].PCR} PCR</p>
                <p style={darkTheme ? {color: lineTwo} : {color: lineTwo}}>{data[0]?.Ant} אנטיגן</p></Fragment> : null }
            </div>
            <RadialBarChart  width={width}  height={250}  innerRadius="50%"  outerRadius="100%" 
                            data={data}  startAngle={180}  endAngle={0} >
                <RadialBar minAngle={15} label={{ fill: lineTwo, position: 'insideStart' }} background clockWise={true} dataKey='PCR' 
                            isAnimationActive={false}  fill={'rgb(80, 203, 253)'} />
                <RadialBar minAngle={15} label={{ fill: lineThree, position: 'insideStart' }} background clockWise={true} dataKey='Ant'
                            isAnimationActive={false} fill={lineTwo}/>
            </RadialBarChart>
        </div>
    )
}

export default CoronaTestsGraph;