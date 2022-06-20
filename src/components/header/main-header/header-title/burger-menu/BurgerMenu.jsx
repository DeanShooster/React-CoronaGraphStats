import './burger-menu.scss';

import ContentWorlds from './content worlds/ContentWorlds';
import DataWorlds from './data-worlds/DataWorlds';
import AboutDashboard from './about-dashboard/AboutDashboard';

const BurgerMenu = ()=>{
    return (
        <div className='modal-block'>
            <div className='modal-burger-menu'>
                <ContentWorlds />
                <hr></hr>
                <DataWorlds />
                <hr></hr>
                <AboutDashboard />
            </div>
        </div>
    );
};

export default BurgerMenu;