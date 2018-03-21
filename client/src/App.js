import React, { Component } from 'react';
import Search from './Search/Search';
import Chips from './Chips/Chips';
import Map from './Map/Map';
import './App.css';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import axios from 'axios';
import convert from 'xml-js';

/*global google */

class App extends Component {

  state = {
    chips: ["Grocery","Church","Parks","School","Hospital"],
    color: ["red", "green", "blue", "yellow", "orange"],
    defaultCord: {lat: 35.779,lng: -78.638}, //map is centered on raleigh when app loads
    newCord: {}, //center map on cord we get from zillow
    neighborhoods: [], //populated when we query zillow
    placesQuery: "", //updates to the text value stored in the selected chip
    placesColor: ""
  }

  addChipHandler = () => {
    const newChips = [...this.state.chips];
    const newChip = document.getElementById('createChip').value;
    newChips.push(newChip);
    this.setState({chips: newChips});
  }

  deleteChipHandler = (chipIndex) => {
    const newChips = [...this.state.chips];
    newChips.splice(chipIndex, 1);
    this.setState({chips: newChips});
  }

  zillowSearch = () => {
    const baseURL = 'https://www.zillow.com/webservice/GetRegionChildren.htm?output=json&';
    const zwsid = 'zws-id=' + 'X1-ZWz1g7awznkjyj_4ok8b' + '&';
    const address = document.getElementById('search').value.split(',');
    const city = address[0];
    const state = address[1];
    const addressQuery = 'state=' + state + '&city=' + city + '&';
    const type = 'childtype=' + 'neighborhood';

    //Now, we are going to use a Heroku proxy service to wrap our baseURL with a wrapper to avoid the CORS error from
    //Zillow.
    let corsURL = 'https://cors-anywhere.herokuapp.com/'+baseURL;
    
    axios.get(corsURL + zwsid + addressQuery + type)
    .then(res => {
      const json = convert.xml2js(res.data, {compact: true, spaces: 4});
      const region = json['RegionChildren:regionchildren'].response.region;
      const regionID = json['RegionChildren:regionchildren'].response.region.id._text;
      const regionLat = json['RegionChildren:regionchildren'].response.region.latitude._text;
      const regionLng = json['RegionChildren:regionchildren'].response.region.longitude._text;
      const neighborhoods = json['RegionChildren:regionchildren'].response.list.region;
      this.setState({ 
        newCord: {_id: regionID, lat: regionLat, lng: regionLng},
        neighborhoods: neighborhoods 
      });
      console.log('state ', this.state);
    })
    .catch(function (error) {
      console.log("zillow error! ", error);
    });
  }

  //Search autocomplete
  activateAutocompletePlacesSearch = () => {
    console.log("autocomplete");
    const options = {
      types: ['(cities)'],
      componentRestrictions: {country: "us"}
     };
    const input = document.getElementById('search');
    const autocomplete = new google.maps.places.Autocomplete(input, options);
  }

  addPlacesHandler = (e) => {
    console.log("addPlacesHandler");
    if (this.state.neighborhoods.length === 0) {
      console.log("Search for City, State first!");
    } else {
      this.setState({placesQuery: e.target.getAttribute('data-query')});
      this.setState({placesColor: e.target.getAttribute('data-color')});
    }

  }

  render() {

    return (
      <div>
        <Navbar />
        <Search zillowSearch={this.zillowSearch} autocomplete={this.activateAutocompletePlacesSearch}/>
        <Chips chips={this.state.chips} color={this.state.color} addChip={this.addChipHandler} deleteChip={this.deleteChipHandler} addPlaces={this.addPlacesHandler}/>
        <Map 
          defaultLat={this.state.defaultCord.lat} 
          defaultLng={this.state.defaultCord.lng}
          newCord={this.state.newCord}
          neighborhoods={this.state.neighborhoods}
          placesQuery={this.state.placesQuery}
          placesColor={this.state.placesColor}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
