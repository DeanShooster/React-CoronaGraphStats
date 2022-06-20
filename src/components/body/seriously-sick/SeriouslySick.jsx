import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollContext } from '../../context/ScrollContext';

import GraphCard from "../GraphCard/GraphCard";

const SeriouslySick = () => {

    const [ ref, refView ] = useInView( {threshold: 1.0});
    const { setNavLightened } = useContext(ScrollContext);

    useEffect( ()=>{
        if(refView)
            setNavLightened(5);
    }, [refView,setNavLightened] )

    return (
        <div>
            <h3 ref={ref}>חולים קשה ומאושפזים</h3>
            <div className="graph-container">
                <GraphCard graph='daily-seriously-sick'/>
                <GraphCard graph='daily-hospitalized'/>
            </div>
        </div>
    );
};

export default SeriouslySick;