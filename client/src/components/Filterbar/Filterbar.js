import React, { Component } from 'react';
import './filterbar.css'

class Filterbar extends Component {
  state = {
    showMenu: false
  }

  showMenu = (event) => {
    event.preventDefault()
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu = (event) => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }




  render() {
    return (
      <div >
        <div className="filterContainer">
            <button onClick={this.showMenu} className="filter">Show Menu</button>
        </div>
        {this.state.showMenu ? 
        (<div 
            className="filterMenu"
            ref={(element) => {
              this.dropdownMenu = element;
            }}
          >
            <button className="filter">Thing 1</button>
            <button className="filter">Thing 2</button>
            <button className="filter">Thing 3</button>
        </div>):(null) }
      </div>
    );
  }
}

export default Filterbar;