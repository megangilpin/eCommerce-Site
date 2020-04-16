import React, { Component } from 'react';
import './filterbar.css'

class Filterbar extends Component {
  state = {
    isShown: false
  }

  showMenu = (event) => {
    event.preventDefault();
    if(!this.state.isShown){
      this.setState({
        isShown: true
      })} else {
        this.setState({
          isShown: false
        })
      }
  }


  render() {
    return (
      <div >
        <div className="filterContainer">
          <button onClick={this.showMenu} className="filter">Show Menu</button>
        {this.state.isShown ? 
        (<div className="filterMenu">
              <label>
                <input 
                  type="checkbox" 
                  checked={this.props.checked}
                  onChange={this.props.handleCheckboxChange}/>
                <span>Label Text</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={this.props.checked}
                  onChange={this.props.handleCheckboxChange} />
                <span>Label Text</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={this.props.checked}
                  onChange={this.props.handleCheckboxChange} />
                <span>Label Text</span>
              </label>
        </div>):(null) }
        </div>
      </div>
    );
  }
}

export default Filterbar;