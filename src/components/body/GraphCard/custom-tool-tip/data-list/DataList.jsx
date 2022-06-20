const { Fragment } = require("react")


const DataList = ( {data,keys}) => {

    return (
        <Fragment>
            { data.map( (item,i) => { 
                if( i === 0 ) 
                    return null;
            return <li key={keys[i-1]}><span>{item}</span> {keys[i-1]}</li> } ) }
        </Fragment>
    )
}

export default DataList;