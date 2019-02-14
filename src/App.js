import React, { Component } from 'react';
import MapContainer from './Components/MapContainer';
import { InfoWindow, Marker } from 'google-maps-react';
import Foursquare from './Images/powered-by-foursquare-grey.png';
import Sidebar from './Components/Sidebar';
import './App.css';

class App extends Component {
//Construtor foi modificado
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      venues: null
    };
  }

  //*
  onMarkerClick = (props, marker) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  //*
  onMouseover(props, marker) {
      marker.setAnimation(props.google.maps.Animation.BOUNCE);
  }
  //*
  onMouseOut(props,marker){
    marker.setAnimation(null);
  }
  //*

  handleClick = (item) => {
    this.onMarkerClick(item, item);
  }

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
  //*

  createMarker(markers){
    try{
      return markers.map((element) =>{
        return <Marker
                id = {element.id}
                onClick={this.onMarkerClick}
                onMouseover={this.onMouseover}
                onMouseout={this.onMouseOut}
                key = {element.id}
                title={element.name}
                name={element.name}
                address={element.location.formattedAddress[0]}
                address2 = {element.location.formattedAddress[1]}
                position={{lat: element.location.lat, lng: element.location.lng}}>
        </Marker>
      })
    }
    
    catch(error){
      console.log("ERROR:",error);
    }
  }

  render() {
    return (
      <div className = "container-flex">
      <div className= "row">
      <Sidebar sidebaritems = {this.state.venues}
      handleClick = {this.handleClick}></Sidebar>
      <MapContainer 
      markers = {this.createMarker(this.state.venues)}
      createInfoWindows = {this.createInfoWindows()}></MapContainer>
        </div>
      </div>
    );
  }

  componentDidMount(){
    this.getAll();
  }

  getAll(){
    fetch('https://api.foursquare.com/v2/venues/search?ll=40.752557,-73.973435&query=restaurant&limit=10&intent=browse&radius=10000&client_id=UCF54S5TJFOVXMJ1J4AGS0MTAW0CBRCCPAXGX2CTOINGGXTU&client_secret=VIEJP3NBRQ3U2KAXEMDYHQ1XTLAJJS2AROH3YXYCJYEHACVV&v=20190208')
    .then((response) => {
        // Code for handling API response
      response.json().then((resp) => {
        this.setState({venues: resp.response.venues});
      });
    })
    .catch((error)=> {
        console.log(error);
    });
  }
}


export default App;
