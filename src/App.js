import React, { Component } from 'react';
import MapContainer from './Components/MapContainer';
import Sidebar from './Components/Sidebar';
import './App.css';

class App extends Component {

constructor(props){
  super(props);
  this.state = {venues: null};
}

  render() {
    return (
      <div className = "container-flex">
      <div className= "row">
      <Sidebar sidebaritems = {this.state.venues}></Sidebar>
      <MapContainer markers = {this.state.venues}></MapContainer>
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
