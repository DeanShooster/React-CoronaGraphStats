import { Fragment, useEffect, useState } from "react";
import _ from 'lodash';

import './vaccination-city-stats.scss';
import { RiArrowDropLeftFill } from 'react-icons/ri';

import {GetCityVaccinationStats} from '../../../../../api/DataFetches';
import Loader from "../../../../shared/loader/Loader";
import CityStatList from "./city-stat-list/CityStatList";
import CitySearchFilter from "./city-search-filter/CitySearchFilter";
import CitySearch from "./city-search-filter/city-search/CitySearch";

const VaccinationCityStats = ( {color,background}) => {

    const [citiesVaccinationData,setCitiesVaccinationData] = useState(null);
    const [citiesData,setCitiesData] = useState(null);
    const [activeSearch, setActiveSearch] = useState(false);
    const [columSortState,setColumnSortState] = useState([null,null,null,null,null,null]);

    useEffect( ()=>{
        const fetchData = async () =>{
            let result = await GetCityVaccinationStats();
            if( result ){
                setCitiesVaccinationData( result );
                setCitiesData(result);
            }
        }
        setTimeout(() => {
            fetchData();
        }, 500);
    },[]);

    // Sorts the table and renders it according to a selected value.
    const Sort = ( event ) => {
        let field = tableColumFieldNameHandler( event.target.innerHTML );
        if( !field )
            return;
        if( !columSortState[field.index] ) {
            for(let i = 0; i < columSortState.length; i++) columSortState[i] = null;
            columSortState[field.index] = true;  setColumnSortState(columSortState);
            if( field.index === 0 )
                setCitiesData( _.sortBy(citiesData,(element)=>{ return element[field.value] }) );
            else
                setCitiesData( _.sortBy(citiesData,(element)=>{ return parseFloat( element[field.value] ) }) );
        } else{
            for(let i = 0; i < columSortState.length; i++) columSortState[i] = null;
            columSortState[field.index] = false;  setColumnSortState(columSortState);
            if( field.index === 0 )
                setCitiesData( (_.sortBy(citiesData,(element)=>{ return  element[field.value]  })).reverse() );
            else
                setCitiesData( (_.sortBy(citiesData,(element)=>{ return parseFloat( element[field.value] ) })).reverse() );
        }
    }

    // Given a column name returns the field DB name accordingly for the sort method. 
    const tableColumFieldNameHandler = ( name )=>{
        switch( name ){
            case 'ישוב': return {index: 0, value: 'city'};
            case '% מתחסנים מנה ראשונה': return { index: 1,value: 'firstDose'};
            case '% מתחסנים מנה שניה': return {index: 2, value: 'secondDose'};
            case '% מתחסנים מנה שלישית': return {index:3, value: 'thirdDose'};
            case 'חולים פעילים לכל 10,000 נפש': return {index:4 ,value: 'sick'};
            case 'ציון יומי מחושב': return {index: 5, value:'score'};
            default: return null;
        }
    }

    const ActiveSearchHandler = () => setActiveSearch(!activeSearch);

    // Shows the selected city data instead of the entire cities list.
    const CityDataSearchHandler = ( cityName ) => {
        for(let i = 0; i < columSortState.length; i++) columSortState[i] = null;
        if( cityName === 'הצג הכל')
            return setCitiesData( citiesVaccinationData );
        for(let i = 0; i < citiesVaccinationData.length; i++)
            if(cityName === citiesVaccinationData[i].city ){ setCitiesData([ citiesVaccinationData[i] ]); return; }
    }

    return (
        <section>
            {citiesData ? <Fragment>
                <CitySearchFilter openSearch={ActiveSearchHandler}/>
                {activeSearch && <CitySearch cities={citiesVaccinationData} citySearch={CityDataSearchHandler} searchBox={ActiveSearchHandler}/>}
                <li className="table-titles" onClick={Sort} style={{color: color, background: background}}>
                    <div className={ columSortState[0] != null ? "city selected" : 'city' }>
                        <span>ישוב</span>
                        {columSortState[0] != null &&  <RiArrowDropLeftFill className={columSortState[0] ? 'sort-mark sortAscend' : 'sort-mark' }/>}
                    </div>
                    <div className={ columSortState[1] != null ? "selected" : '' }>
                        <span >% מתחסנים מנה ראשונה</span>
                        {columSortState[1] != null &&  <RiArrowDropLeftFill className={columSortState[1] ? 'sort-mark sortAscend' : 'sort-mark' }/>}
                    </div>
                    <div className={ columSortState[2] != null ? "selected" : '' }>
                        <span >% מתחסנים מנה שניה</span>
                        {columSortState[2] != null &&  <RiArrowDropLeftFill className={columSortState[2] ? 'sort-mark sortAscend' : 'sort-mark' }/>}
                    </div>
                    <div className={ columSortState[3] != null ? "selected" : '' }>
                        <span >% מתחסנים מנה שלישית</span>
                        {columSortState[3] != null &&  <RiArrowDropLeftFill className={columSortState[3] ? 'sort-mark sortAscend' : 'sort-mark' }/>}
                    </div>
                    <div className={ columSortState[4] != null ? "selected" : '' }>
                        <span >חולים פעילים לכל 10,000 נפש</span>
                        {columSortState[4] != null &&  <RiArrowDropLeftFill className={columSortState[4] ? 'sort-mark sortAscend' : 'sort-mark' }/>}
                    </div>
                    <div className={ columSortState[5] != null ? "selected" : '' }>
                        <span >ציון יומי מחושב</span>
                        {columSortState[5] != null &&  <RiArrowDropLeftFill className={columSortState[5] ? 'sort-mark sortAscend' : 'sort-mark' }/>}
                    </div>
                </li>
                <CityStatList citiesVaccinationData={citiesData}/>
            </Fragment> : <Loader />}
        </section>
    );
};

export default VaccinationCityStats;