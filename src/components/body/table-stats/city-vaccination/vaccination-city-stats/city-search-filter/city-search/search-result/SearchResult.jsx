

const SearchResult = ( {darkTheme, cities,citySearch,searchBox}) => {

    const SearchHandler = ( event ) => {citySearch( event.target.innerHTML ); searchBox();}

    return (
        <div className='search-result-container'>
            { cities.map( (city,i)=> { 
                return <li key={i} onClick={SearchHandler} className={darkTheme ? 'city-result result-dark' : 'city-result result-light'}>{city}</li> }
            ) }
        </div>
    )
}

export default SearchResult;