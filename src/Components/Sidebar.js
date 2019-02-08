import React, { Component } from 'react';
import '../App.css';

class SideBar extends Component {
  populateUl(items){
    try{
      return items.map((item) =>{
        return (<li key={item.id} className="nav-item">
        <a className="nav-link" href="#">{item.name}</a>
      </li>)
      })
    }
    catch(error){
      console.log(error);
    }
  }

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

  render() {
    return (
      <aside id= 'sidebar-list' className= "hidden">
        <button onClick={this.toggleMenu} id= "hamburguer"><i id="hamburguer-icon" className="fas fa-bars"></i></button>
        <ul className="nav flex-column">
          {this.populateUl(this.props.sidebaritems)}
        </ul>
      </aside>
    );
  }
}

export default SideBar;
