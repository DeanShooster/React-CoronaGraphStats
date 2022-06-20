import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollContext } from '../../context/ScrollContext';

import './overview.scss';

import Status from './status/Status';
import WeekSummary from './week-summary/WeekSummary';

const Overview = () => {

    const [ ref, refView ] = useInView( { threshold: 1.0});
    const { setNavLightened,darkTheme,theme } = useContext( ScrollContext );

    useEffect( ()=>{
        if(refView)
            setNavLightened(0);
    }, [refView,setNavLightened] )

    return (
        <section style={darkTheme ? {color: theme.darkTheme.color} : {color: theme.whiteTheme.color}}>
            <h3 ref={ref}>מבט על</h3>
            <Status />
            <WeekSummary background={ darkTheme ? theme.darkTheme.background :  theme.whiteTheme.background }/>
        </section>
    );
};

export default Overview;