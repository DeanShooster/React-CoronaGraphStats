import {useContext, useState } from 'react';

import './city-vaccination.scss';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import TableCard from "../table-card/TableCard";
import VaccinationCityStats from './vaccination-city-stats/VaccinationCityStats';
import BurgerPopUp from './burger-pop-up/BurgerPopUp';
import { ScrollContext } from '../../../context/ScrollContext';

const CityVaccination = () =>{

    const [showMenu,setShowMenu] = useState(false);
    const {darkTheme,theme} = useContext(ScrollContext);

    const burgerMenuHandler = () => setShowMenu(!showMenu);

    return (
        <div className="city-vaccination-container" 
        style={darkTheme ? {background: theme.darkTheme.background} : {background: theme.whiteTheme.background}}>
            <TableCard title={'התחסנות לפי ישובים'} 
                menu={ <BiDotsVerticalRounded className='city-vaccination-burger-menu' onClick={burgerMenuHandler}/> }/>
            { showMenu  && <BurgerPopUp color={darkTheme? theme.darkTheme.color : theme.whiteTheme.color}
                            background={darkTheme? theme.darkTheme.background : theme.whiteTheme.background}/>}
            <VaccinationCityStats color={darkTheme ? theme.darkTheme.color : theme.whiteTheme.color}
                background={darkTheme ? '#2A3B47' : '#ddeaf2'} darkTheme={darkTheme}/>   
        </div>
    );
};

export default CityVaccination;