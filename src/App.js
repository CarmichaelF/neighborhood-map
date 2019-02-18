import React, { Component } from 'react';
import MapContainer from './Components/MapContainer';
import { InfoWindow } from 'google-maps-react';
import Foursquare from './Images/powered-by-foursquare-grey.png';
import Sidebar from './Components/Sidebar';
import ErrorBoundary from './Components/ErrorBoundary';
import './App.css';

class App extends Component {
  /*
  /State: showingInfoWindow is used to show or hide an infoWindow,
  /activeMarker is used to save the actual marker/position,
  /selectedPlace is used to save props of a clicked marker.
  */

  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      venues: null,
      filteredVenues: null
    };
  }

  /*
  /This method is used to change the state
  /when a marker is clicked on the map
  /or when the user clicks on a list item.
  */

  onMarkerClick= (props, marker)=>{
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });
  }
  /*
  /Used to handle the click from user and is passed to Sidebar component.
  */
  handleClick = (item) => {
    this.onMarkerClick(item, item);
    this.filter(item.name);
  }

  /*
  /Creates the infoWindow that's passed to the MapContainer component.
  */
  createInfoWindows(){
    return <InfoWindow
            position={this.state.activeMarker.position}
            visible={this.state.showingInfoWindow}>
              <div>
                <h5>{this.state.selectedPlace.name}</h5>
                <p>Address: {this.state.selectedPlace.address}<br></br>{this.state.selectedPlace.address2}</p><br></br>
                <a href= "https://developer.foursquare.com/" target="blank"><img id="foursquareImg" src= {Foursquare} alt= "Foursquare Icon"></img></a>
              </div>
          </InfoWindow>
  }

  /*
  /Render the component
  */

  render() {
    return (
      <div className = "container-flex">
      <div role="application" className= "row">
      <Sidebar sidebaritems = {this.state.filteredVenues ? this.state.filteredVenues :this.state.venues}
      handleClick = {this.handleClick}
      filter = {this.filter}
      showAll = {this.showAll}></Sidebar>
      <ErrorBoundary>
      <MapContainer 
      venues = {this.state.filteredVenues ? this.state.filteredVenues :this.state.venues}
      onMarkerClick = {this.onMarkerClick}
      createInfoWindows = {this.createInfoWindows()}></MapContainer>
      </ErrorBoundary>
        </div>
      </div>
    );
  }

  componentDidMount(){
    this.getAll();
  }

  /*
  /Filter the li's in the list based on the input of user.
  */

  filter = (value) =>{
    this.setState({filteredVenues:this.state.venues.filter((element) =>{
      if(element.name.includes(value)){
        return element;
      }
      return null;
    })});
  }

  showAll=()=>{
    this.setState({filteredVenues: this.state.venues});
    this.setState({showingInfoWindow: false});
  }

  /*
  /Get all the information of Foursquare API
  */

  getAll(){
    fetch('https://api.foursquare.com/v2/venues/search?ll=40.752557,-73.973435&query=food&limit=10&intent=browse&radius=10000&client_id=UCF54S5TJFOVXMJ1J4AGS0MTAW0CBRCCPAXGX2CTOINGGXTU&client_secret=VIEJP3NBRQ3U2KAXEMDYHQ1XTLAJJS2AROH3YXYCJYEHACVV&v=20190208')
    .then((response) => {
        // Code for handling API response
      response.json().then((resp) => {
        this.setState({venues: resp.response.venues});
      });
    })
    .catch((error)=> {
        alert("Sorry, it wasn't possible to load all the information, try to check out your internet connection.");
        console.log("ERROR: ", error);
    });
  }
}


export default App;
