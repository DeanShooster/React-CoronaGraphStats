import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollContext } from '../../context/ScrollContext';

import GraphCard from "../GraphCard/GraphCard";

const VaccineTests = () => {

    const [ ref, refView ] = useInView( {threshold: 1.0});
    const { setNavLightened } = useContext(ScrollContext);

    useEffect( ()=>{
        if(refView)
            setNavLightened(7);
    }, [refView,setNavLightened] )

    return (
        <div>
            <h3 ref={ref}>בדיקות</h3>
            <div className="graph-container">
                <GraphCard graph='corona-tests'/>
            </div>
        </div>
    );
};

export default VaccineTests;