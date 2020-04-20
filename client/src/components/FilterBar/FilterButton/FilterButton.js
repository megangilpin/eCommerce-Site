import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './filterbutton.css'

class FilterButton extends Component {
  state = {
    isShown: false
  }

  showMenu = (event) => {
    event.preventDefault();
    const element = document.getElementById(`${this.props.filterName}`).classList;
    if(!this.state.isShown) {
      element.add("down")
    } else{
      element.remove("down")
    }
    this.setState ({
      isShown: !this.state.isShown
    })
  }

  render() {
    return (
        <>
        <button onClick={this.showMenu} className="filter">{this.props.filterName} <FontAwesomeIcon className="fa-xs rotate" id={this.props.filterName} icon="chevron-up" /></button>
        {this.state.isShown ? 
        (<div className="filterMenu">
            {this.props.filters.map(filter => 
              <label key={filter.id}>
                  <input 
                    type="checkbox"
                    name={this.props.filterName}
                    value={filter.name}
                    checked={filter.checked}
                    onChange={this.props.handleCheckboxChange}/>
                  <span className="filterName">{filter.name}</span>
                </label>
              )}
        </div>):(null) }
      </>
    );
  }
}

export default FilterButton;