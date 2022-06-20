import { useContext } from 'react';
import { ScrollContext } from '../context/ScrollContext';

import './footer.scss';

import Slogan from './slogan/Slogan';

const Footer = () =>{

    const {darkTheme, theme} = useContext(ScrollContext);
    const image = require('../../assets/corona.jfif'); //Random map image

    return (
        <footer style={darkTheme ? {color: theme.darkTheme.color} : {color: theme.whiteTheme.color}}>
            <Slogan title='מפת מדדי רמזור' slogan='מדדי תחלואה וציוני רמזור, בחלוקה לפי ישובים ורובעים' image={image} site='experience.arcgis.com' darkTheme={darkTheme}/>
            <Slogan title='רובעי רמזור' slogan='תמונת מצב מובחנת אודות האוכלוסיה, בתוך תשעת היישובים הגדולים בארץ, רובעי רמזור.' image={image} site='maps.arcgis.com' darkTheme={darkTheme}/>
            <Slogan title='נתוני תחלואה לפי יישוב' slogan='תמונת מצב לפי יישוב בקטגוריית-חולים פעילים, מבודדים, מאושפזים, נפטרים ומחוסנים בתוקף.' image={image} site='experience.arcgis.com' darkTheme={darkTheme}/>
        </footer>
    );
};

export default Footer;