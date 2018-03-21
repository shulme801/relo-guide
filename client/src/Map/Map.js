import React from 'react';
import GoogleMapWrapper from './GoogleMapWrapper';

const Map = (props) => {

    return (
        <div style={{height: '450px'}}>
            <GoogleMapWrapper 
                defaultLat={props.defaultLat} 
                defaultLng={props.defaultLng}
                newCord={props.newCord}
                neighborhoods={props.neighborhoods}
                placesQuery={props.placesQuery}
                placesColor={props.placesColor}
            />
        </div>
    );

}

export default Map;