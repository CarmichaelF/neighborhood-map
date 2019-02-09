import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import Foursquare from '../Images/powered-by-foursquare-grey.png';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onMouseover(props, marker) {
      marker.setAnimation(props.google.maps.Animation.BOUNCE);
  }

  onMouseOut(props,marker){
    marker.setAnimation(null);
  }

  createMarkers(markers){
    try{
      return markers.map((element) =>{
        return <Marker
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
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 40.752557,
         lng: -73.973435
        }}>
        {this.createMarkers(this.props.markers)}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h5>{this.state.selectedPlace.name}</h5>
              <p>Address: {this.state.selectedPlace.address}<br></br>{this.state.selectedPlace.address2}</p><br></br>
              <a href= "https://developer.foursquare.com/" target="blank"><img id="foursquareImg" src= {Foursquare} alt= "Foursquare Icon"></img></a>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDEoKFWvzVvLPwQmlJG-LjlB8mX7DR9SEA'
})(MapContainer);