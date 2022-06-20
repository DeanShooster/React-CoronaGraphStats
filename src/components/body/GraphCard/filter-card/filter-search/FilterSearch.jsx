import SearchByStats from "./search-by-stats/SearchByStats";
import SearchByTime from "./search-by-time/SearchByTime";


const FilterSearch = ( {Filter,title,FilterFocusHandler,darkTheme,theme} ) => {

    const OnFilterHandler = ( event ) => {
        event.preventDefault();
        FilterFocusHandler();
        if( event.target[0].name === 'daily-hospitalized' )
            return Filter( { mild: event.target[0].checked, moderately: event.target[1].checked, seriously: event.target[2].checked } );
        if( event.target[0].name === 'bed-hospitalized')
            return Filter ( {beds: event.target[0].checked, percent: event.target[1].checked} );
        if( event.target[0].name === 'child-city-percent' )
            return Filter( event.target[0].value );
    }

    const CloseFilterSearch = () => FilterFocusHandler();

    return (
        <div className="filter-check-box" 
            style={darkTheme ? {backgroundColor: theme.darkTheme.background} : {backgroundColor: theme.whiteTheme.background}}>
            <form onSubmit={OnFilterHandler}>
                <SearchByStats title={title}/>
                <SearchByTime />
                <div className="button-container">
                    <button style={darkTheme ? {backgroundColor: '#2a3b47',color:theme.darkTheme.color} 
                        : {backgroundColor: '#e6f1f4',color:theme.whiteTheme.color}}>אישור</button>
                    <button type='button' onClick={CloseFilterSearch} 
                        style={darkTheme ? {backgroundColor: '#2a3b47',color:theme.darkTheme.color} 
                        : {backgroundColor: '#e6f1f4',color:theme.whiteTheme.color}}>ביטול</button>
                </div>
            </form>
        </div>
    )
}

export default FilterSearch;