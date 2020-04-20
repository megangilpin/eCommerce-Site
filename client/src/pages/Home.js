import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Nav/Navbar";
import FilterBar from "../components/FilterBar/FilterBar";
import Item from "../components/Item/Item";
import "./Home.css";


export default class Register extends Component {
  state = {
    productList: [],
    filteredProducts: [],
    selectedFilters: [],
    checked: false,
    color: [{ name: "Red", checked: false, id: 1 }, { name: "Orange", checked: false, id: 2 }, { name: "Yellow", checked: false, id: 3 }, { name: "Green", checked: false, id: 4 }, { name: "Blue", checked: false, id: 5}, {name: "Purple", checked: false, id:6} ],
    size: [{ name: "Small", checked: false, id: 1 }, { name: "Medium", checked: false, id: 2 }, { name: "Large", checked: false, id: 3 }]
  }

  componentDidMount = () => {
    const products = [];
    axios.get("/api/products").then(res => {
      res.data.data.forEach(product => {
        products.push({
          id: product.id,
          name: product.name,
          image: product.image,
          color: product.color,
          size: product.size
        });
      });
      console.log(products)
      this.setState({ productList: products, filteredProducts: products});
    })
      .catch(err => console.log(err));
  };

  handleCheckboxChange = (event) => {
    const value = event.target.value.toLowerCase();
    const name = event.target.name.toLowerCase();
    let filters = this.state[name]
    filters.forEach(filter => {
      if(filter.name.toLowerCase() === value) {
        filter.checked = event.target.checked
      }
    })
    if(event.target.checked) {
      this.filterProduct(name, value)
      this.setState({
        [event.target.name]: filters,
      })
    } else {
      this.removeFilter(name, value)
      this.setState({
        [name]: filters,
      })
    }
  }

  filterProduct = (name, value) => {
    let filter = [name, value];
    let newFilters = [...this.state.selectedFilters];
    newFilters.push(filter);
    let newList = [];
    this.state.productList.forEach(product =>{
      newFilters.forEach(filter => {
        if(product[name].toLowerCase() === filter[1]){
          newList.push(product)
        }
      })
    })
    this.setState({
      filteredProducts: newList,
      selectedFilters: newFilters
    })
  }

  removeFilter = (name, value) => {
    let newFilters = this.state.selectedFilters.filter(filter => filter[1] !== value);
    if(newFilters.length === 0){
      console.log(newFilters)
      this.setState({
        filteredProducts: this.state.productList,
        selectedFilters: []
      })
    } else {
      let newList = [];
      this.state.productList.forEach(product => {
        newFilters.forEach(filter => {
          if (product[name].toLowerCase() === filter[1]) {
            newList.push(product)
          }
        })
      })
      this.setState({
        filteredProducts: newList,
        selectedFilters: newFilters
      })
    }
  }

  removeFilterButton = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.removeFilter(name, value)
    let filters = this.state[name]
    filters.forEach(filter => {
      if (filter.name.toLowerCase() === value) {
        filter.checked = event.target.checked
      }
    })
    this.setState({
      [event.target.name]: filters,
    })
  }

  

  render() {
    return (
        <>
        <Navbar />
        
        <div className="contentContainer">
          <div className="products">
            <div style={{ display: "flex", justifyContent: "start", flexWrap: "wrap", padding: "10px" }}>
              {this.state.selectedFilters.length > 0 ? this.state.selectedFilters.map((filter, index) => 
                <button style={{margin: "5px"}}
                  key={index}
                  value={filter[1]}
                  name={filter[0]} 
                  onClick={this.removeFilterButton}
                >{filter[1]}</button>) : (null)
              }
            </div>
            <div style={{ width: "100%"}}>
              <FilterBar style={{ display: "inline-block"}}
                filterName1="Color"
                filterName2="Size"
                addFilter={this.addFilter}
                filters1={this.state.color}
                filters2={this.state.size}
                checked={this.state.checked}
                handleCheckboxChange={this.handleCheckboxChange}
              />
            </div>
            <div style={{display: "flex", justifyContent: "start", flexWrap: "wrap",padding: "10px"}}>
            {this.state.filteredProducts ? this.state.filteredProducts.map(product => 
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
