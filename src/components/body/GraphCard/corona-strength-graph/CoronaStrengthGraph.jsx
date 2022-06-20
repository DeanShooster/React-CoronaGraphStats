
import { useContext } from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { ScrollContext } from "../../../context/ScrollContext";


const CoronaStrengthGraph = ( {width}) => {

    const {darkTheme,theme} = useContext(ScrollContext);

    const data = [
        {
          name: 'ריאות',
          risk: 3000,
          avgHuman: 2220
        },
        {
          name: 'גרון',
          risk: 3000,
          avgHuman: 2398
        },
        {
          name: 'סירקולציית דם',
          risk: 500,
          avgHuman: 500
        },
        {
          name: 'לב',
          risk: 500,
          avgHuman: 230
        },
        {
          name: 'שריר ושלד',
          risk: 1400,
          avgHuman: 1200
        },
      ];
      
      const getPath = (x, y, width, height) => `M${x},${y + height}
                C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
                C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
                Z`;
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

    const colors = [ 'rgb(80, 203, 253)',
        darkTheme ? 'rgb(253, 130, 100)' : 'rgb(182, 202, 81)',
        darkTheme ? 'rgb(155, 233, 133)' : 'rgb(35, 125, 125)',
        darkTheme ? 'rgb(186, 161, 239)' : 'rgb(186, 161, 239)',
        'darkOrange'];

    const color = darkTheme ? theme.darkTheme.color : theme.whiteTheme.color;

    return (
        <div>
            <div>
                <p>סיכון נגיף הקורונה למערכות ביולוגיות שונות.</p>
            </div>
            <BarChart width={width} height={250} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20}} >
                <CartesianGrid strokeDasharray="0" vertical={false}/>
                <XAxis dataKey="name" scale="band" tickMargin={5} tickSize={14} tickLine={{strokeWidth: 1,stroke: '#cccccc',}}
                    label={{ value: `תאריך`, position: 'bottom', fill: color}} stroke={color}/>
                <YAxis dataKey='risk' axisLine={false} tickLine={{ stroke: 'rgba(255, 0, 0, 0)'}} tick={{ dx:-20}}
                        label={ {value:'סיכון', position:'top', offset: 9,fill:color} } stroke={color}/>
                <Bar dataKey="avgHuman" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    )
}

export default CoronaStrengthGraph;