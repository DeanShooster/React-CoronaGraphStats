import { Fragment,useState } from 'react';

import './main-header.scss';
import { FiMenu } from 'react-icons/fi';  // Burger button
import { ImCross } from 'react-icons/im'; // X button

import HeaderTitle from './header-title/HeaderTitle';
import DarkLightMode from '../dark-light-mode/DarkLightMode';
import Navigation from '../navigation/Navigation';
import BurgerMenu from './header-title/burger-menu/BurgerMenu';

const MainHeader = () => {

    const [burgerMenu,setBurgerMenu] = useState(false);

    const BurgerMenuHandler = () => {
        setBurgerMenu(!burgerMenu);
    }

    return (
        <Fragment>
            <div className='main-header-container'>
                { burgerMenu ? <ImCross className='burger-menu-cross-exit' onClick={BurgerMenuHandler}/> : <FiMenu className='burger-menu' onClick={BurgerMenuHandler}/> }
                <img alt='' src={require('../../../assets/Dashboard_logo.png')} />
                <HeaderTitle />
            </div>
            <DarkLightMode />
            <Navigation />
            { burgerMenu && <BurgerMenu />}
        </Fragment>
    );
};

export default MainHeader;