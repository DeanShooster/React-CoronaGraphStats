import { useContext,useEffect,useRef } from 'react';
import { ScrollContext } from '../context/ScrollContext';

import './body.scss';

import Overview from "./overview/Overview";
import KeyMeasures from './key-measures/KeyMeasures';
import KeyMorbidity from './key-morbidity/KeyMorbidity';
import ChildMorbidity from './child-morbidity/ChildMorbidity';
import VaccineImpact from './vaccine-impact/VaccineImpact';
import SeriouslySick from './seriously-sick/SeriouslySick';
import Dead from './dead/Dead';
import VaccineTests from './vaccineTests/VaccineTests';
import AdditionalResearch from './additional-research/AdditionalResearch';
// import RepeatedSicknessRecover from './repeated-sickness-recover/RepeatedSicknessRecovre';
// import PopulationVaccination from './population-vaccination/PopulationVaccination';
import TableStats from './table-stats/TableStats';
import DataWorld from './data-world/DataWorld';

const Body = () => {

    const scrollRef = useRef();
    const { setScrollsRef,darkTheme,theme } = useContext(ScrollContext);

    useEffect( ()=>{
        setScrollsRef(scrollRef);
    },[setScrollsRef]);

    return (
        <main ref={scrollRef} style={ darkTheme ? { color: theme.darkTheme.color} : { color: theme.whiteTheme.color } }>
            <Overview />
            <hr></hr>
            <KeyMeasures/>
            <hr></hr>
            <KeyMorbidity />
            <hr></hr>
            <ChildMorbidity />
            <hr></hr>
            <VaccineImpact />
            <hr></hr>
            <SeriouslySick />
            <hr></hr>
            <Dead/>
            <hr></hr>
            <VaccineTests />
            <hr></hr>
            <AdditionalResearch />
            <hr></hr>
            <TableStats />
            <hr></hr>
            <DataWorld />
        </main>
    );
};

export default Body;