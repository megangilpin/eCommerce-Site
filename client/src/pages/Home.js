import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Nav/Navbar";
import Filterbar from "../components/Filterbar/Filterbar";
import Item from "../components/Item/Item";
import "./Home.css";


export default class Register extends Component {
  state = {
    productList: [],
    filterList: [],
  }

  componentDidMount = () => {
    document.addEventListener("click", this.handleClick, false);

    const products = [];

    axios.get("/api/products").then(res => {
      console.log(res.data.data)
      res.data.data.forEach(product => {
        products.push({
          id: product.id,
          name: product.name,
          image: product.image,
        });
      });
      this.setState({ productList: products });

    })
      .catch(err => console.log(err));
  };

  addFilter = (event) => {
    console.log("clicked")
    event.preventDefault();
    this.setState({
      filterList: [...this.state.filterList, event.target.value ]
    })
  }

  handleCheckChieldElement = (event) => {
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
            {this.state.filterList.length > 0 ? this.state.filterList.map(filter => <button>{filter}</button>) : (null)}
            <Filterbar 
              addFilter={this.addFilter}
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
