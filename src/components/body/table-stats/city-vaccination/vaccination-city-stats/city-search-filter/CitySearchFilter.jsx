import { useState,useContext } from 'react';
import { ScrollContext } from '../../../../../context/ScrollContext';

import './city-search-filter.scss';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {MdKeyboardArrowUp} from 'react-icons/md';

const CitySearchFilter = ( {openSearch} ) => {

    const [activeSearch,setActiveSearch] = useState(false);
    const {darkTheme,theme} = useContext(ScrollContext);

    const ActiveSearchHandler = () => {setActiveSearch(!activeSearch); openSearch(); }

    return (
        <button onClick={ActiveSearchHandler} className={activeSearch ? 'search-bar selected' : 'search-bar'}
            style={ darkTheme ? {backgroundColor: theme.darkTheme.background, color: theme.darkTheme.color}
                    : {backgroundColor:'#e9ecf0', color: theme.whiteTheme.color} }>
            <span>כלל היישובים</span>
            { activeSearch ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown /> }
        </button>
    )
}

export default CitySearchFilter;