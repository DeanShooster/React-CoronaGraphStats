import { useEffect, useState,useContext, Fragment } from 'react';

import '../hospitalized-graph/hospitalized-graph.scss';

import FilterCard from "../filter-card/FilterCard";
import { ScrollContext } from '../../../context/ScrollContext';
import { GetIsolationReasons } from '../../../../api/DataFetches';
import { Cell, Pie, PieChart } from 'recharts';

const IsolationReasonsGraph = ( {width}) => {

    const [data,setData] = useState(null);
    const {darkTheme} = useContext(ScrollContext);

    useEffect( ()=>{
        const fetchData = async () =>{
            const result = await GetIsolationReasons();
            setData(result);
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    },[] );

    const colors = [ 
        {color: 'rgb(80, 203, 253)'},
        {color: darkTheme ? 'rgb(253, 130, 100)' : 'rgb(182, 202, 81)' },
        {color: darkTheme ? 'rgb(155, 233, 133)' : 'rgb(35, 125, 125)' }
        ]

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
        );
    };

    return (
        <div>
            <FilterCard filteredText='חודש אחרון'/>
            <div className={darkTheme ? 'hospitalized-list-dark-theme' : 'hospitalized-list-light-theme'}>
                <li>חזרה מחו"ל</li>
                <li>מגע עם חולה מאומת</li>
                <li>אחר</li>
            </div>
            <PieChart width={width} height={250}>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={110} labelLine={false} isAnimationActive={false}
                     label={renderCustomizedLabel}> 
                {data ? <Fragment>
                    { data.map( (entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index].color}  />
                    ))}
                </Fragment> : null}
                
                </Pie>
            </PieChart>
        </div>
    )
}

export default IsolationReasonsGraph;