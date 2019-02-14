import React, { Component } from 'react';
import '../App.css';

class SideBar extends Component {

  constructor(props){
    super(props);
    this.state = {sidebaritems: {}};
  }

  populateUl(items){
    try{
      return items.map((item) =>{
        return (<li key={item.id} className="nav-item">
        <button
        onClick = {() => this.handleClick(item, item)}
        className="nav-link" 
        href="#">{item.name}</button>
      </li>)
      })
    }
    catch(error){
      console.log("ERROR:", error);
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

  filter(value){
    this.setState({sidebaritems:this.props.sidebaritems.filter((element) =>{
      if(element.name.includes(value)){
        return element;
      }
      return null;
    })});
  }

  componentWillReceiveProps(props){
    this.setState({sidebaritems: props.sidebaritems})
  }

  render() {
    return (
      <aside id= "sidebar-list" className= "hidden">
        <button onClick={this.toggleMenu} id= "hamburguer"><i id="hamburguer-icon" className="fas fa-bars"></i></button>
        <ul className="nav flex-column">
        <input id="filter" onChange={(event) => this.filter(event.target.value)} type="text" placeholder="Filter results..." aria-label="Filter results"></input> 
        {this.populateUl(this.state.sidebaritems)}
        </ul>
      </aside>
    );
  }
}

export default SideBar;
