import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollContext } from '../../context/ScrollContext';

import CityColor from "./city-color/CityColor";
import CityVaccination from "./city-vaccination/CityVaccination";

const TableStats = () => {

    const [ ref, refView ] = useInView( {threshold: 1.0});
    const { setNavLightened } = useContext(ScrollContext);

    useEffect( ()=>{
        if(refView)
            setNavLightened(11);
    }, [refView,setNavLightened] )

    return (
        <section ref={ref}>
            <CityVaccination />
            <hr></hr>
            <CityColor />
        </section>
    );
};

export default TableStats;