import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollContext } from '../../context/ScrollContext';

import GraphCard from "../GraphCard/GraphCard";

const ChildMorbidity = () => {

    const [ ref, refView ] = useInView( {threshold: 1.0});
    const { setNavLightened } = useContext(ScrollContext);

    useEffect( ()=>{
        if(refView)
            setNavLightened(3);
    }, [refView,setNavLightened] )

    return (
        <div>
            <h3 ref={ref}>תחלואת ילדים</h3>
            <div className="graph-container">
                <GraphCard graph='child-verified'/>
                <GraphCard graph='child-isolated' />
                <GraphCard graph='child-percent-city'/>
                <GraphCard graph='child-hospitalized'/>
            </div>
        </div>
    );
};

export default ChildMorbidity;