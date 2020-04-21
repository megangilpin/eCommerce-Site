import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Nav/Navbar";
import FilterBar from "../components/FilterBar/FilterBar";
import Item from "../components/Item/Item";
import "./Home.css";


export default class Register extends Component {
  state = {
    productList: [], //all products from api call
    filteredProducts: [],// products that match filters
    selectedFilters: [], // filters
    color: [{ name: "red", checked: false, id: 1 }, { name: "orange", checked: false, id: 2 }, { name: "yellow", checked: false, id: 3 }, { name: "green", checked: false, id: 4 }, { name: "blue", checked: false, id: 5}, {name: "purple", checked: false, id:6} ], //list of color filters for check boxes
    size: [{ name: "small", checked: false, id: 1 }, { name: "medium", checked: false, id: 2 }, { name: "large", checked: false, id: 3 }] //list of size filters for check boxes
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
      this.setState({ productList: products, filteredProducts: products});
    })
      .catch(err => console.log(err));
  };

  // handles click event for check box then adds or removes filters to products depending on checked value in filter
  handleCheckboxChange = (event) => {
    const value = event.target.value;
    const type = event.target.name;
    let filters = [...this.state[type]] //array to determine which check box is selected
    filters.forEach(filter => {
      if (filter.name === value) {
        filter.checked = event.target.checked
      }
    })
    if(event.target.checked) {
      this.filterProduct(type, value, filters)
    } else {
      this.removeFilter(type, value, filters)
    }
  }
  
  // removes the filters button, updates the checked boxes then removes filters
  removeFilterButton = (event) => {
    let value = event.target.value
    let type = event.target.name
    let filters = [...this.state[type]] //array to determine which check box is selected
    filters.forEach(filter => {
      if (filter.name === value) {
        filter.checked = false
      }
    })
    this.removeFilter(type, value, filters)
  }

  // filters product list to only show selected filters
  filterProduct = (type, value, filters) => {
    let filter = [type, value];
    let newFilters = [...this.state.selectedFilters]; //array to determine which check box is selected
    newFilters.push(filter);
    let newList = [];
    // loops through the product list and creates new filteredProducts array
    this.state.productList.forEach(product =>{
      newFilters.forEach(filter => {
        if(product[type] === filter[1]){
          newList.push(product)
        }
      })
    })
    this.setState({
      filteredProducts: newList,
      selectedFilters: newFilters,
      [type]: filters
    })
  }

  // removes filters from product list
  removeFilter = (type, value, filters) => {
    // remove the selected filter from the filter list
    let newFilters = this.state.selectedFilters.filter(filter => filter[1] !== value);
    // if the length is 0 reset the filteredProduct array to be all products
    if(newFilters.length === 0){
      this.setState({
        filteredProducts: this.state.productList,
        selectedFilters: []
      })
    } else {
      // loops through the product list and creates new filteredProducts array
      let newList = [];
      this.state.productList.forEach(product => {
        newFilters.forEach(filter => {
          if (product[type] === filter[1]) {
            newList.push(product)
          }
        })
      })
      this.setState({
        filteredProducts: newList,
        selectedFilters: newFilters,
        [type]: filters
      })
    }
  }

  render() {
    return (
        <>
        <Navbar />
        <div className="contentContainer">
          <div className="products">
            <div style={{ display: "flex", justifyContent: "start", flexWrap: "wrap", padding: "10px" }}>
              {this.state.selectedFilters.length > 0 ? this.state.selectedFilters.map((filter, index) => 
                <button style={{ margin: "5px", textTransform: "capitalize"}}
                  key={index}
                  name={filter[0]} 
                  value={filter[1]}
                  onClick={this.removeFilterButton}
                  aria-label={`Remove ${filter[1]} filter`}
                >
                  {filter[1]} &times;
                </button>) : (null)
              }
            </div>
            <FilterBar
              filter1={this.state.color}
              filterName1="color"
              filter2={this.state.size}
              filterName2="size"
              handleCheckboxChange={this.handleCheckboxChange}
            />
            <div style={{display: "flex", justifyContent: "start", flexWrap: "wrap",padding: "10px"}}>
              {this.state.filteredProducts ? this.state.filteredProducts.map(product => 
                <Item 
                  key={product.id}
                  img={product.image}
                  name={product.name}
                />) : (null)
              }
            </div>
          </div>
        </div>
      </> 
    )
  }
}
