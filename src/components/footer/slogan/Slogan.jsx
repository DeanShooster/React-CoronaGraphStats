

const Slogan = ( props ) =>{
    return (
        <div className="slogan-card" style={props.darkTheme ? {background: '#384f5f'} : {background: '#fff'}}>
            <div>
                <img src={props.image} alt='corona map status'/>
            </div>
            <div className="slogan">
                <h4>{props.title}</h4>
                <p>{props.slogan}</p>
                <p className="site">{props.site}</p>
            </div>
        </div>
    );
};

export default Slogan;