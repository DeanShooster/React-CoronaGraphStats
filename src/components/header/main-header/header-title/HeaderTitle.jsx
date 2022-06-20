import './header-title.scss';

import LastDateUpdate from './last-date-update/LastDateUpdate';

const HeaderTitle = () => {
    return (
        <div className='title-container'>
            <p className='title'>נגיף הקורונה בישראל - תמונת מצב כללית</p>
            <p className='title-date'>
                <span>עדכון אחרון: </span>
                <LastDateUpdate />
            </p>
        </div>
    );
};

export default HeaderTitle;