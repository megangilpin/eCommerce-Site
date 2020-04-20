import React, { Component } from 'react';
import './filterbutton.css'

class FilterButton extends Component {
  state = {
    isShown: false
  }

  showMenu = (event) => {
    event.preventDefault();
    this.setState ({
      isShown: !this.state.isShown
    })
  }


  render() {
    return (
        <div className="filterContainer">
          <button onClick={this.showMenu} className="filter">{this.props.filterName} filter</button>
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
                  <span >{filter.name}</span>
                </label>
              )}
        </div>):(null) }
      </div>
    );
  }
}

export default FilterButton;