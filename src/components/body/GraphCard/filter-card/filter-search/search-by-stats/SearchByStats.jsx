import { Fragment } from "react";

const SearchByStats = ( {title} ) => {

    const filterByTitle = [ 
        { key: 'מספר מאושפזים', 
            filter: <Fragment>
                <h4>מצב מאושפזים</h4>
                <div>
                    <input type='checkbox' name='daily-hospitalized'/> <label>קל</label>
                </div>
                <div>
                    <input type='checkbox'/> <label>בינוני</label>
                </div>
                <div>
                    <input type='checkbox'/> <label>קשה</label>
                </div>
            </Fragment>},
        {
            key: 'אחוז תפוסת מיטות באשפוזים',
            filter: <Fragment>
                <h4>הצג לפי</h4>
                <div>
                    <input type='checkbox' name='bed-hospitalized'/> <label>תפוסת מיטות</label>
                </div>
                <div>
                    <input type='checkbox'/> <label>אחוז תפוסה</label>
                </div>
            </Fragment>
        },
        {
            key: 'אחוז ילדים לפי עיר',
            filter: <div>
                <input type='text' placeholder="חפש יישוב" name='child-city-percent'/>
            </div>
        }
    ];

    let filter = null;
    for(let i = 0; i < filterByTitle.length ; i++ )
        if( filterByTitle[i].key === title ){
            filter = filterByTitle[i].filter;
        }
    return filter;
}

export default SearchByStats;