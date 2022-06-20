
import './graph-legend.scss';
import {AiOutlineInfoCircle,AiOutlineLine} from 'react-icons/ai';

const GraphLegend = ( {darkTheme} ) =>{
    return (
        <div className='epidemic-graph-legend'>
            <p><AiOutlineInfoCircle className='info'/> <span style={darkTheme ? {backgroundColor: 'rgb(42, 59, 71)'} : {backgroundColor: 'rgb(230, 241, 244)'}}>הנתון היומי מתאר את הממוצע השבועי של מקדם ההדבקה לפני 10 ימים</span></p>
            <p><AiOutlineLine className='statusR' style={darkTheme ? {color: 'rgb(252, 197, 55)'} : {color: 'rgb(253, 130, 100)'}}/> <span className='statusR-info'>R=1 ‏(R>1 מגיפה בהתפשטות)</span></p>
        </div>
    )
}

export default GraphLegend;