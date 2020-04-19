import React, { Component } from 'react';
import './filterbutton.css'

class FilterButton extends Component {
  state = {
    isShown: false,
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
        <div className="filterContainer">
          <button onClick={this.showMenu} className="filter">Show Menu</button>
        {this.state.isShown ? 
        (<div className="filterMenu">
          {this.props.filters.map(filter => 
            <label key={filter.id}>
                <input 
                  key={filter.id}
                  type="checkbox"
                  name={filter.name}
                  value={filter.name}
                  checked={filter.checked}
                  onChange={this.props.handleCheckboxChange}/>
                <span >{filter.name}</span>
              </label>
            )}
        </div>):(null) }
      </div>
    );
  }
}

export default FilterButton;