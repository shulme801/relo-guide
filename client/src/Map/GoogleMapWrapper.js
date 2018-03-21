import React, { Component } from 'react';
/*global google */
const neighborhoodMarkersArray = [];
let placesMarkersArray = [];
let infowindow;
let queryArray = [];//keeps a record of used queries
let queryCounter = 0;//keeps track of how many times a query has been used

class GoogleMapWrapper extends Component {

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {

        const prevCordLat = parseFloat(this.props.newCord.lat); //get the existing newCordLat
        const prevCordLng = parseFloat(this.props.newCord.lng); //get the existing newCordLng
        const newCordLat = parseFloat(nextProps.newCord.lat); //get the next newCordlat
        const newCordLng = parseFloat(nextProps.newCord.lng); //get the next newCordlng

        //Center map on new cords if newCordLat && newCordLng actually change
        if(prevCordLat !== newCordLat && prevCordLng !== newCordLng) {
            console.log("panTo");
            this.panTo(newCordLat, newCordLng);
        }

        const prevNeighborhoods = [...this.props.neighborhoods]; //Array of existing neighborhoods we received from Zillow
        const newNeighborhoods = [...nextProps.neighborhoods]; //Array of new neighborhoods we receive from Zillow

        //Plot new neighborhood markers when neighborhoods have been updated
        if(prevNeighborhoods.length === 0 || prevNeighborhoods[0].name._text !== newNeighborhoods[0].name._text) {
            console.log("neighborhood plotter");
            this.neighborhoodPlotter(newNeighborhoods);
        }

        //Places=================================================

        const placesQuery = nextProps.placesQuery;
        const placesColor = nextProps.placesColor;

        if (placesQuery) {
            queryCounter = 0;
            queryArray.push(placesQuery);
            for(let i = 0; i < queryArray.length; i++) {
                if(queryArray[i] === placesQuery) {
                    queryCounter++;
                }
            }
            if(queryCounter === 1) { //plot marker if query has only been used once
                this.placesPlotter(placesQuery, placesColor, newCordLat, newCordLng);
            }
            if(queryCounter === 2) { // remove marker if query has been used twice
                this.removeSetOfPlaces(placesQuery);
            }
        }

        //Places=================================================

    }

    //When called, centers map at provided lat, lng
    panTo = (lat, lng) => {
        //centers map off of data in state.newCord
        this.map.panTo({lat: lat, lng: lng});
        
        //Everytime map is panned to position, clear neighborhaddMarkersArray and remove those markers from the map
        for (var i = 0; i < neighborhoodMarkersArray.length; i++ ) {
            neighborhoodMarkersArray[i].setMap(null);
        };
        //Everytime map is panned to position, clear neighborhaddMarkersArray and remove those markers from the map
        for (var i = 0; i < placesMarkersArray.length; i++ ) {
            placesMarkersArray[i].setMap(null);
        };
    }

    //When called, plots markers based off of data in state.neighborhoods
    neighborhoodPlotter = (neighborhoods) => {
        infowindow = new google.maps.InfoWindow();
        for(let i = 0; i < neighborhoods.length; i++ ) {
            this.marker = new google.maps.Marker({
                position: {lat: parseFloat(neighborhoods[i].latitude['_text']), lng: parseFloat(neighborhoods[i].longitude['_text'])},
                map: this.map
            });

            const markerMarkup = "<p>" + neighborhoods[i].name['_text'] + "</p>" + 
            
            "<p><a href=" + "'" + neighborhoods[i].url['_text'] + "'" + "target='_blank'>More Info</a></p>"; 

            google.maps.event.addListener( this.marker, "click", function() {
                infowindow.setContent(markerMarkup);
                infowindow.open(this.map, this);
            });

            neighborhoodMarkersArray.push(this.marker);
        }
    }

    placesPlotter = (placesQuery, placesColor, newCordLat, newCordLng) => {
        const centerPlaces = {lat: newCordLat, lng: newCordLng}; //Ensures when places are added to map, they are centered on maps center
        const query = placesQuery;
        const tempPlacesMarkersArray = [];
        const placesObj = {[query]: tempPlacesMarkersArray};
        infowindow = new google.maps.InfoWindow();
        // var myObj = {[a]: b};

        // for (var i = 0; i < placesMarkersArray.length; i++) {
        //     const tempObj = placesMarkersArray[i];
        //     const key = Object.keys(tempObj);
        //     if(key[0] === placesQuery) {
        //         console.log(placesQuery + " markers will be removed");
        //         return;
        //     }
        // }
        

        //where to search for nearby places, radius of search, type of place (grocery, cafe, etc)
        const request = {
            query: query,
            location: centerPlaces,
            radius: 8047,
        };

        //Construct a service object
        const service = new google.maps.places.PlacesService(this.map);

        //Callback for text search. Ensures places are returned
        const callback = (results, status) => {
            if(status == google.maps.places.PlacesServiceStatus.OK) {
                for (let i=0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }
        
        //Custom maker icon
        const image = {
            url: "markers/" + placesColor + "_MarkerO.png",
            // size: new google.maps.Size(71, 71),
            // origin: new google.maps.Point(0, 0),
            // anchor: new google.maps.Point(17, 34),
            // scaledSize: new google.maps.Size(25, 25)
        };

        const createMarker = (place) => {
            const placeLoc = place.geometry.location;
            const marker = new google.maps.Marker({
                map: this.map,
                position: place.geometry.location,
                title: placesQuery,
                icon: image
            });
            tempPlacesMarkersArray.push(marker);

            const markerMarkup = "<p>" + place.name + "</p>"


            google.maps.event.addListener( marker, "click", function() {
                infowindow.setContent(markerMarkup);
                infowindow.open(this.map, this);
            });
        }

        service.textSearch(request, callback);
        placesMarkersArray.push(placesObj);
        console.log("from plotter ", placesMarkersArray);
    }

    removeSetOfPlaces = (placesQuery) => {
        let tempArray = [];//holds query values !== to placesQuery

        for (let i = 0; i < queryArray.length; i ++) {
            if (queryArray[i] !== placesQuery) {
                tempArray.push(queryArray[i]);
            };
        };
        console.log(queryArray);
        queryArray = tempArray;
        console.log(queryArray);
        console.log("before splice in remove " , placesMarkersArray);

        for (let i = 0; i < placesMarkersArray.length; i++) {
            if(placesMarkersArray[i][placesQuery]) {
                console.log("from match ", placesMarkersArray[i]);
                console.log(i);
                for (let j = 0; j < placesMarkersArray[i][placesQuery].length; j++) {
                    placesMarkersArray[i][placesQuery][j].setMap(null);
                }
                placesMarkersArray.splice(i,1);
                console.log("updated placesMarkers array ", placesMarkersArray);
                return;
            }
        }

        
        // for (let i = 0; i < placesMarkersArray.length; i++) {
        //     const tempObj = {...placesMarkersArray[i]};
        //     const key = Object.keys(tempObj);
        //     if(key[0] === placesQuery) {
        //         console.log("from match ", placesMarkersArray);
        //         for (let j = 0; j < placesMarkersArray[i][placesQuery].length; j++) {
        //             placesMarkersArray[i][placesQuery][j].setMap(null);
        //         }
        //         placesMarkersArray.splice(placesMarkersArray[i],1);
        //         console.log("updated placesMarkers array ", placesMarkersArray);
        //         return;
        //     }
        // }
    }

    componentDidMount() {

        const center = {lat: this.props.defaultLat, lng: this.props.defaultLng}; 

        this.map = new google.maps.Map(this.refs.map, {
            center: center,
            zoom: 11
        });

    }

    render() {
        return(
            <div ref="map" style={{height: '100%'}}></div>
        );
    }
};

export default GoogleMapWrapper;