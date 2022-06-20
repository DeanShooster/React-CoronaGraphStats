import './dose-stat-bar.scss';

const DoseStatBar = ( props ) => {

    return (
        <div className='dose-stat-bar'>
            <p style={ { background: props.color , width: parseInt(props.percent), height: '100%' } }></p>
        </div>
    );
};

export default DoseStatBar;