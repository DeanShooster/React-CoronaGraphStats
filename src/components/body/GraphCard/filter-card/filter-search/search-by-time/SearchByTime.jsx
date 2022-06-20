import { Fragment } from "react";


const SearchByTime = () => {
    return (
        <Fragment>
            <h4>זמן</h4>
            <div>
                <input type='radio' name='time'/> <label>עד עכשיו</label>
            </div>
            <div>
                <input type='radio' name='time'/> <label>שנה</label>
            </div>
            <div>
                <input type='radio' name='time'/> <label>6 חודשים</label>
            </div>
            <div>
                <input type='radio' name='time'/> <label>3 חודשים</label>
            </div>
            <div>
                <input type='radio' name='time'/> <label>חודש אחרון</label>
            </div>
        </Fragment> 
    )
}

export default SearchByTime;