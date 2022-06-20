import { useContext } from "react";
import { ScrollContext } from "../../../../../context/ScrollContext";
import DoseStatBar from "../dose-stat-bar/DoseStatBar";

const CityStatList = ( props ) =>{

    const {darkTheme} = useContext(ScrollContext);

    // Sets the background color of a city score according to a given score.
    const cityScoreColor = ( score ) =>{
        if(score <= 4.5 )
            return 'rgb(143, 220, 143)'; // Light Green
        if( score <= 6 )
            return 'yellow';
        if( score <= 7.5 )
            return 'lightsalmon';
        return 'rgb(255, 88, 88)'; // Red
    }

    return (
        <div className="cities-list">
            {props.citiesVaccinationData.map( (cities,i)=> <li key={i}>
                <div className="city">{cities.city}</div>
                <span>
                    <DoseStatBar percent={cities.firstDose} color={darkTheme ? 'rgb(155, 233, 133)' : 'rgb(20, 104, 107)'}/>
                    <span>{cities.firstDose}%</span>
                </span>
                <span>
                    <DoseStatBar percent={cities.secondDose} color={darkTheme ? 'rgb(253, 130, 100)' : 'rgb(115, 195, 93)'}/>
                    <span>{cities.secondDose}%</span>
                </span>
                <span>
                    <DoseStatBar percent={cities.secondDose} color='rgb(100, 215, 215)'/>
                    <span>{cities.thirdDose}%</span>
                </span>
                <span>{cities.sick}</span>
                <span>
                    <p className="city-score" style={ {color: 'black', background: cityScoreColor(cities.score)} }>
                        {cities.score}
                    </p>
                </span>
            </li> ) }
        </div>
    );
};

export default CityStatList;