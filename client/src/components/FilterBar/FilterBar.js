import React, { Component } from 'react';
import FilterButton from './FilterButton/FilterButton'

class FilterBar extends Component {
state = {
  show: { color: false, size: false }
}

  showMenu = (event) => {
    let name = event.target.value
    let show = {...this.state.show}
      for (var key in show) {
        if(key === name){
          show[key] = !this.state.show[name];
        } 
        else{
          show[key] = false;
        }
      }
    this.setState({
      show
    })
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <FilterButton 
          filterName={this.props.filterName1}
          filters={this.props.filter1}
          handleCheckboxChange={this.props.handleCheckboxChange}
          isShown={this.state.show.color}
          showMenu={this.showMenu}
        />
        <FilterButton
          filterName={this.props.filterName2}
          filters={this.props.filter2}
          handleCheckboxChange={this.props.handleCheckboxChange}
          isShown={this.state.show.size}
          showMenu={this.showMenu}
        />
      </div>
    );
  }
}

export default FilterBar;
