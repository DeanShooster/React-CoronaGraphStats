import { useState } from 'react';
import { useContext } from 'react';
import { ScrollContext } from '../../../../../../context/ScrollContext';

import './city-search.scss';
import SearchResult from './search-result/SearchResult';

const CitySearch = ( {cities,citySearch,searchBox} ) => {

    const {darkTheme,theme} = useContext(ScrollContext);
    const [citiesSearchResult,setCitiesSearchResult] = useState(['הצג הכל']);

    const SearchHandler = ( event ) => {
        const search = event.target.value;
        if( search.length === 0 ){
            setCitiesSearchResult(['הצג הכל']);
            return;
        }
        const searchResult = [];
        cities.forEach( city => {
            if(city.city.includes(search) )
                searchResult.push(city.city);
        });
        setCitiesSearchResult(searchResult);
    }

    return (
        <div className="city-search-container" style={darkTheme ? {backgroundColor: theme.darkTheme.background} 
                : {backgroundColor: theme.whiteTheme.background} }>
            <input type='text' placeholder='חיפוש ישוב' onChange={SearchHandler}
                    className={darkTheme ? 'search-input search-dark' : 'search-input search-light'}/>
            {citiesSearchResult && <SearchResult darkTheme={darkTheme} cities={citiesSearchResult} citySearch={citySearch} searchBox={searchBox}/> }
        </div>
    )
}

export default CitySearch;