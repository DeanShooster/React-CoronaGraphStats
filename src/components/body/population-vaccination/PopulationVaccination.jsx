import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollContext } from '../../context/ScrollContext';

import GraphCard from "../GraphCard/GraphCard";

const PopulationVaccination = () =>{

    const [ ref, refView ] = useInView( {threshold: 1.0});
    const { setNavLightened } = useContext(ScrollContext);

    useEffect( ()=>{
        if(refView)
            setNavLightened(10);
    }, [refView,setNavLightened] )

    return (
        <div>
            <h3 ref={ref}>התחסנות האוכלוסייה</h3>
            <div className="graph-container">
                <GraphCard />
                <GraphCard />
                <GraphCard />
            </div>
        </div>
    );
};

export default PopulationVaccination;