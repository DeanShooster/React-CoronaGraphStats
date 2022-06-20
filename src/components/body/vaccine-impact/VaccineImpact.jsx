import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollContext } from '../../context/ScrollContext';

import GraphCard from "../GraphCard/GraphCard";

const VaccineImpact = () => {

    const [ ref, refView ] = useInView( {threshold: 1.0});
    const { setNavLightened } = useContext(ScrollContext);

    useEffect( ()=>{
        if(refView)
            setNavLightened(4);
    }, [refView,setNavLightened] )

    return (
        <div>
            <h3 ref={ref}>השפעת התחסנות על התחלואה</h3>
            <div className="graph-container">
                <GraphCard graph='senior-daily-verified'/>
                <GraphCard graph='senior-seriously-sick'/>
                <GraphCard graph='sick-by-age'/>
            </div>
        </div>
    );
};

export default VaccineImpact;