import React, { Component } from 'react';
import '../App.css';

class SideBar extends Component {

  constructor(props){
    super(props);
    this.state = {sidebaritems: {}};
  }

  /*
  /Put on the list the elements using
  /the information of foursquare API.
  */

  populateUl(items){
    try{
      return items.map((item) =>{
        return (<li key={item.id} className="nav-item">
        <button
        onClick = {() => this.props.handleClick({
          position:{
            lat: item.location.labeledLatLngs[0].lat, 
            lng:item.location.labeledLatLngs[0].lng
          },
            address: item.location.formattedAddress[0],
            address2: item.location.formattedAddress[1],
            name: item.name
        })}
        className="nav-link" 
        href="#">{item.name}</button>
      </li>)
      })
    }
    catch(error){
      console.log("ERROR:", error);
    }
  }

  /*
  /Toggle the classes of hamburguer menu.
  */

  toggleMenu(){
    document.getElementById('sidebar-list').classList.toggle('hidden');
    if(document.getElementById('hamburguer-icon').classList.contains('fa-bars')){
      document.getElementById('hamburguer-icon').classList.remove('fa-bars');
      document.getElementById('hamburguer-icon').classList.add('fa-times');
    }
    else{
      document.getElementById('hamburguer-icon').classList.remove('fa-times');
    document.getElementById('hamburguer-icon').classList.add('fa-bars');
    }
  }

  componentWillReceiveProps(props){
    this.setState({sidebaritems: props.sidebaritems})
  }

  render() {
    return (
      <aside id= "sidebar-list" className= "hidden">
        <button onClick={this.toggleMenu} id= "hamburguer"><i id="hamburguer-icon" className="fas fa-bars"></i></button>
        <ul className="nav flex-column">
        <input id="filter" onChange={(event) => this.props.filter(event.target.value)} type="text" placeholder="Filter results..." aria-label="Filter results"></input> 
        {this.populateUl(this.state.sidebaritems)}
        <li className="nav-item"><button onClick={this.props.showAll} className="nav-link" href="#"><i className="fas fa-arrows-alt"></i>Show All</button>
      </li>
        </ul>
      </aside>
    );
  }
}

export default SideBar;
