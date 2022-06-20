import './burger-pop-up.scss';
import {SiReactrouter} from 'react-icons/si';
import {BsArrowDownCircle} from 'react-icons/bs';

const BurgerPopUp = ( {color,background}) => {
    return (
        <div className="burger-pop-up" style={{color: color, background: background}}>
            <div><SiReactrouter className='svg-city-vaccinated-burger-menu' />  לשיתוף</div>
            <div> <BsArrowDownCircle className='svg-city-vaccinated-burger-menu'/>  להורדה</div>
        </div>
    );
};

export default BurgerPopUp;