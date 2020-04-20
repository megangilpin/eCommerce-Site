import React, { Component } from 'react';
import './filterbar.css'

class FilterBar extends Component {
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
          <button onClick={this.showMenu} className="filter">{this.props.filterName1} Filter</button>
        {this.state.isShown ? 
        (<div className="filterMenu">
            {this.props.filters1.map(filter => 
              <label key={filter.id}>
                  <input 
                    type="checkbox"
                    name={this.props.filterName1}
                    value={filter.name}
                    checked={filter.checked}
                    onChange={this.props.handleCheckboxChange}/>
                  <span className="filterName">{filter.name}</span>
                </label>
              )}
        </div>):(null) }
        <button onClick={this.showMenu} className="filter">{this.props.filterName2} Filter</button>
        {this.state.isShown ?
          (<div className="filterMenu">
            {this.props.filters2.map(filter =>
              <label key={filter.id}>
                <input
                  type="checkbox"
                  name={this.props.filterName2}
                  value={filter.name}
                  checked={filter.checked}
                  onChange={this.props.handleCheckboxChange} />
                <span className="filterName">{filter.name}</span>
              </label>
            )}
          </div>) : (null)}
      </div>
    );
  }
}

export default FilterBar;