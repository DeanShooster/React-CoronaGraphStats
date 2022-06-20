import { useContext, useState } from 'react';

import './dark-light-mode.scss';
import {BsSun} from 'react-icons/bs';
import { ScrollContext } from '../../context/ScrollContext';

const DarkLightMode = () => {

    const [currentTheme,setCurrentTheme] = useState(false);
    const { darkTheme,setDarkTheme } = useContext(ScrollContext);

    const lightMode = 'general-mode light-mode';
    const darkMode = 'general-mode dark-mode';

    const ChangeTheme = () =>{
        const root = document.getElementById('root');
        setCurrentTheme(!currentTheme);
        if( darkTheme ){
            root.classList.remove('dark-theme-root'); root.classList.add('white-theme-root');
            root.classList.remove('page-scroll-dark-theme');
        }else{
            root.classList.remove('white-theme-root'); root.classList.add('dark-theme-root');
            root.classList.add('page-scroll-dark-theme');
        }
        setDarkTheme( !darkTheme );
    }

    return (
        <div className={currentTheme ? darkMode : lightMode} onClick={ChangeTheme}>
            <BsSun className='sun'/>
        </div>
    );
};

export default DarkLightMode;