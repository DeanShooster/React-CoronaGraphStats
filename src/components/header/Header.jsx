import { useContext } from 'react';

import './header.scss';

import MainHeader from './main-header/MainHeader';
import { ScrollContext } from '../context/ScrollContext';

const Header = () => {

    const { darkTheme } = useContext(ScrollContext);

    return (
        <header style={ darkTheme ? { boxShadow: '0 0 25px 0 rgba(0, 0, 0, 0.723)' } : null }>
            <MainHeader />
        </header>
    );
};

export default Header;