import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';

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
      selectedPlace: {},
    };
  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  createMarkers(markers){
    try{
      console.log("Markers", markers);
      return markers.map((element) =>{
        return <Marker
                onClick={this.onMarkerClick}
                key = {element.id}
                title={element.name}
                name={element.name}
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
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDEoKFWvzVvLPwQmlJG-LjlB8mX7DR9SEA'
})(MapContainer);