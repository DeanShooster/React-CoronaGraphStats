import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollContext } from '../../context/ScrollContext';

import GraphCard from "../GraphCard/GraphCard";

const KeyMeasures = () => {

    const [ ref, refView ] = useInView( {threshold: 1.0});
    const { setNavLightened } = useContext(ScrollContext);

    useEffect( ()=>{
        if(refView)
            setNavLightened(1);
    }, [refView,setNavLightened] )

    return (
        <div>
            <h3 ref={ref}>מדדים מרכזיים</h3>
            <div className="graph-container">
                <GraphCard graph='hospitalized'/>
                <GraphCard graph='epidemic'/>
                <GraphCard graph='daily-new-verified'/>
            </div>
        </div>
    );
};

export default KeyMeasures;