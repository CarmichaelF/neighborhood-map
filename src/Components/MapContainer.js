import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

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
        {this.props.markers}
        {this.props.createInfoWindows}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDEoKFWvzVvLPwQmlJG-LjlB8mX7DR9SEA'
})(MapContainer);