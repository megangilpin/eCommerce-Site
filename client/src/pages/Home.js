import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Nav/Navbar";
import FilterButton from "../components/FilterButton/FilterButton";
import Item from "../components/Item/Item";
import "./Home.css";


export default class Register extends Component {
  state = {
    productList: [],
    selectedFilters: [],
    colorFilter: [{ name: "red", checked: false, id: 1 }, { name: "orange", checked: false, id: 2 }, { name: "yellow", checked: false, id: 3 }, { name: "green", checked: false, id: 4 }, { name: "blue", checked: false, id: 5}, {name: "purple", checked: false, id:6} ]
  }

  componentDidMount = () => {
    document.addEventListener("click", this.handleClick, false);

    const products = [];

    axios.get("/api/products").then(res => {

      res.data.data.forEach(product => {
        products.push({
          id: product.id,
          name: product.name,
          image: product.image,
          color: product.color
        });
      });
      
      this.setState({ productList: products});
    })
      .catch(err => console.log(err));
  };

  handleCheckboxChange = (event) => {
    event.preventDefault();
    let filters = this.state.colorFilter
    const value  = event.target.value;
    filters.forEach(color => {
      console.log(value)
      if(color.name === value) {
        color.checked = true
      }
    })
    this.setState({
      colorFilter: filters,
      selectedFilters: [...this.state.selectedFilters, event.target.value]
    })
  }




  render() {
    return (
        <>
        <Navbar />
        
        <div className="contentContainer">
          <div className="categoryFilter">
            <p>Categories to go here</p>
          </div>
          <div className="items">
            {this.state.selectedFilters.length > 0 ? this.state.selectedFilters.map((filter, index) => <button key={index}>{filter}</button>) : (null)}
            <FilterButton
              addFilter={this.addFilter}
              filters={this.state.colorFilter}
              handleCheckboxChange={this.handleCheckboxChange}
            />
            <div style={{display: "flex", justifyContent: "start", padding: "10px"}}>
            {this.state.productList ? this.state.productList.map(product => 
              <Item 
                key={product.id}
                img={product.image}
                name={product.name}
              />) : (null)}
            </div>
          </div>
        </div>
      </> 
    )
  }
}
