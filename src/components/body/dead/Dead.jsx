import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollContext } from '../../context/ScrollContext';

import GraphCard from "../GraphCard/GraphCard";

const Dead = () => {

    const [ ref, refView ] = useInView( {threshold: 1.0});
    const { setNavLightened } = useContext(ScrollContext);

    useEffect( ()=>{
        if(refView)
            setNavLightened(6);
    }, [refView,setNavLightened] )

    return (
        <div>
            <h3 ref={ref}>נפטרים</h3>
            <div className="graph-container">
                <GraphCard graph='daily-dead'/>
                <GraphCard graph='daily-dead-vaccinated'/>
            </div>
        </div>
    );
};

export default Dead;