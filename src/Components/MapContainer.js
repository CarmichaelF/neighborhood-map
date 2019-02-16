import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  /*
    /Method used to set an animation when mouse is over.
    */

  onMouseover(props, marker) {
    marker.setAnimation(props.google.maps.Animation.BOUNCE);
  }

  /*
  /Method used to unset an animation when mouse is out.
  */

  onMouseOut(props,marker){
  marker.setAnimation(null);
  }

  /*
  /Create all the markers in the map
  */

  createMarker(markers){
    try{
      return markers.map((element) =>{
        return <Marker
                id = {element.id}
                onClick={this.props.onMarkerClick}
                onMouseover={this.onMouseover}
                onMouseout={this.onMouseOut}
                key = {element.id}
                title={element.name}
                name={element.name}
                address={element.location.formattedAddress[0]}
                address2 = {element.location.formattedAddress[1]}
                position={{lat: element.location.lat, lng: element.location.lng}}
                animation= {this.props.google.maps.Animation.DROP}>
        </Marker>
      })
    }
    
    catch(error){
      console.log("ERROR:",error);
    }
  }
  
  /*
    /Render the map
    */

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{
        lat: 40.752557,
        lng: -73.973435
        }}>
        {this.createMarker(this.props.venues)}
        {this.props.createInfoWindows}
      </Map>
    );
  }
  
}

GoogleApiWrapper.onerror = function() {
  alert("Error loading Google Maps API");
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDEoKFWvzVvLPwQmlJG-LjlB8mX7DR9SEA',
})(MapContainer);