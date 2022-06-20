import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollContext } from '../../context/ScrollContext';

import GraphCard from "../GraphCard/GraphCard";

const AdditionalResearch = () => {
    const [ ref, refView ] = useInView( {threshold: 1.0});
    const { setNavLightened } = useContext(ScrollContext);

    useEffect( ()=>{
        if(refView)
            setNavLightened(8);
    }, [refView,setNavLightened] )

    return (
        <div>
            <h3 ref={ref}>תחקורים נוספים</h3>
            <div className="graph-container">
                <GraphCard graph='corona-strength'/>
                <GraphCard graph='weekly-avg-verified'/>
                <GraphCard graph='isolation-reasons' />
                <GraphCard graph='sick-vaccinated-stats'/>
            </div>
        </div>
    );
};

export default AdditionalResearch;