import React, { Component } from 'react';
import '../App.css';

class SideBar extends Component {
  populateUl(items){
    try{
      return items.map((title) =>{
        return (<li className="nav-item">
        <a className="nav-link" href="#">{title}</a>
      </li>)
      })
    }
    catch(error){
      console.log(error);
    }
  }
  render() {
    return (
      <aside className= "hidden">
        <button id= "hamburguer"><i class="fas fa-bars"></i></button>
        <ul className="nav flex-column">
          {this.populateUl(this.props.sidebaritems)}
        </ul>
      </aside>
    );
  }
}

export default SideBar;
