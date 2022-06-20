import { useState,useContext } from 'react';
import { ScrollContext } from '../../../context/ScrollContext';

import './filter-card.scss';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md';

import FilterSearch from './filter-search/FilterSearch';

const FilterCard = ( {Filter,title,filteredText} ) => {

    const [filterFocus,setFilterFocus] = useState(false);
    const {darkTheme, theme} = useContext(ScrollContext);

    const FilterFocusHandler = () => setFilterFocus(!filterFocus);

    return (
        <div className='filter-card' >
            <button onClick={FilterFocusHandler} className='filter-button' 
                    style={darkTheme? {backgroundColor: theme.darkTheme.background,color: theme.darkTheme.color} 
                    : {backgroundColor: 'rgb(233, 236, 240)',color:theme.whiteTheme.color}}>
                <span> {filteredText} </span>
                { filterFocus ? <MdOutlineKeyboardArrowUp className='filter-arrow'/> : <MdOutlineKeyboardArrowDown className='filter-arrow'/> }
            </button>
            { filterFocus && <FilterSearch Filter={Filter} title={title} FilterFocusHandler={FilterFocusHandler} darkTheme={darkTheme} theme={theme}/> }
        </div>
    )
}

export default FilterCard;