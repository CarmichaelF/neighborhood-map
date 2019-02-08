import React, { Component } from 'react';
import MapContainer from './Components/MapContainer';
import Sidebar from './Components/Sidebar';
import './App.css';

class App extends Component {
  render() {
    const items = ["Jorge", "Matheus", "João", "Augusto", "Roberto","Jorge", "Matheus", "João", "Augusto", "Roberto"];
    return (
      <div className = "container-flex">
      <div className= "row">
      <Sidebar sidebaritems = {items}></Sidebar>
      <MapContainer>{this.test()}</MapContainer>
        
        </div>
      </div>
      
    );
  }

  test(){
    fetch('https://api.foursquare.com/v2/venues/trending?ll=40.7,-74&limit=10&radius=2000&client_id=UCF54S5TJFOVXMJ1J4AGS0MTAW0CBRCCPAXGX2CTOINGGXTU&client_secret=VIEJP3NBRQ3U2KAXEMDYHQ1XTLAJJS2AROH3YXYCJYEHACVV&v=20190208')
    .then((response) => {
        // Code for handling API response
      response.json().then((resp) => console.log(resp.response.venues));
    })
    .catch((error)=> {
        // Code for handling errors
        console.log(error);
    });
  }
}

export default App;
