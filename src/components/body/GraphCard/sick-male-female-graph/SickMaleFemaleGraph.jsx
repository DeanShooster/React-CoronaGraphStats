import { useContext } from "react";
import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";
import { ScrollContext } from "../../../context/ScrollContext";

import '../bed-hospitalized-graph/bed-hospitalized.scss';

import FilterCard from "../filter-card/FilterCard";

const SickMaleFemaleGraph = ( {width} ) =>{

    const {darkTheme,theme} = useContext(ScrollContext);

    const data = [
        {
          name: '01/05',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: '02/05',
          uv: -3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: '03/05',
          uv: -2000,
          pv: -9800,
          amt: 2290,
        },
        {
          name: '04/05',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: '05/05',
          uv: -1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: '06/05',
          uv: 2390,
          pv: -3800,
          amt: 2500,
        },
        {
          name: '07/05',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

    const color = darkTheme ? theme.darkTheme.color : theme.whiteTheme.color;
    const female = darkTheme ? '#FFFFFF' : '#898989';

    return (
        <div>
            <FilterCard filteredText='חודש אחרון'/>
            <div className={darkTheme ? 'bed-hospitalized-list-dark-theme' : 'bed-hospitalized-list-light-theme'}>
                <li>גברים</li>
                <li>נשים</li>
            </div>
            <BarChart width={width} height={300} data={data} margin={ {top: 25, right: 30, left: -5, bottom: 10, }} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" axisLine={false} padding={ {left: 10,right:10}}
                    label={ {value:'תאריך', position:'bottom', offset: -2,fill: color}} stroke={color}
                    tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc'}}/>
                <YAxis axisLine={false} padding={ { bottom: 20 } } tick={{ dx:-30}} stroke={color}
                    label={ {value:'מאומתים', position: 'top', offset:15, fill: color}} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'} }/>
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="pv" fill='rgb(80, 203, 253)' />
                <Bar dataKey="uv" fill={female} />
            </BarChart>
        </div>
    )
}

export default SickMaleFemaleGraph;