import { useContext } from 'react';
import { ScrollContext } from '../../context/ScrollContext';

import './navigation.scss';

const Navigation = () =>{

    const {navLightened,scrollRef} = useContext(ScrollContext);

    const ScrollTo = ( event ) => {
        const list = ['מבט על','מדדים מרכזיים','מדדי תחלואה כללית','תחלואת ילדים','השפעת התחסנות על התחלואה',
                        'חולים קשה ומאושפזים','נפטרים','בדיקות','תחקורים נוספים','תחלואה חוזרת ומחלימים',
                        'תחלואה חוזרת ומחלימים','התחסנות האוכלוסיה','רמזור בישובים','עולם הדאטה'];
        let index = null;
        for(let i = 0; i < list.length; i++ )
            if( event.target.innerHTML === list[i] )  index = i;
        if( index === null ) return;
        scrollRef.current.children[index*2].scrollIntoView(false);
    }

    return (
        <ul onClick={ScrollTo}>
            <li className={navLightened === 0 ? 'scrolled-upon' : ''}>מבט על</li>
            <li className={navLightened === 1 ? 'scrolled-upon' : ''}>מדדים מרכזיים</li>
            <li className={navLightened === 2 ? 'scrolled-upon' : ''}>מדדי תחלואה כללית</li>
            <li className={navLightened === 3 ? 'scrolled-upon' : ''}>תחלואת ילדים</li>
            <li className={navLightened === 4 ? 'scrolled-upon' : ''}>השפעת התחסנות על התחלואה</li>
            <li className={navLightened === 5 ? 'scrolled-upon' : ''}>חולים קשה ומאושפזים</li>
            <li className={navLightened === 6 ? 'scrolled-upon' : ''}>נפטרים</li>
            <li className={navLightened === 7 ? 'scrolled-upon' : ''}>בדיקות</li>
            <li className={navLightened === 8 ? 'scrolled-upon' : ''}>תחקורים נוספים</li>
            {/* <li className={navLightened === 9 ? 'scrolled-upon' : ''}>תחלואה חוזרת ומחלימים</li> */}
            {/* <li className={navLightened === 10 ? 'scrolled-upon' : ''}>התחסנות האוכלוסיה</li> */}
            {/* <li className={navLightened === 11 ? 'scrolled-upon' : ''}>רמזור בישובים</li> */}
            {/* <li className={navLightened === 12 ? 'scrolled-upon' : ''}>עולם הדאטה</li> */}
        </ul>
    );
};

export default Navigation;