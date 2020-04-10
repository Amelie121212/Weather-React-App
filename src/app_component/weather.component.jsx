import React from 'react';

const Weather = (props) => {
    return(
        <div className="bd-highlight container">
            <div>{props.error ? error():null}</div>
            <div className="cards pt-4">
                {props.city?(<h1>{props.city}, {props.country}</h1>):null}
                <h5 className="py-4">
                    <i className={`wi ${props.weathericon} display-1`}></i>
                </h5>
                {props.temp_celsius?(<h1 className="py-2">{props.temp_celsius}&deg;</h1>):null}
                {minmaxTemp(props.temp_min,props.temp_max)}
                <h4 className="py-4">{props.description}</h4>
            </div>
        </div>
    );
};

function minmaxTemp(min,max) {
    if(min && max){
        return (
            <h3>
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h3>
        );
    }
}
function error(){
    return(
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter Country and City.
        </div>
    );
}

export default Weather;