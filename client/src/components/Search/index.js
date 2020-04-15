import React, { Component } from "react";
import axios from "axios";
import "./Search.css"

// Dynamic search box
export default class Search extends Component {
  state = { 
    productList: [],
    searchOpen: true, 
    searchInput: "", 
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
        });
    });

    this.setState({ productList: products });

    })
    .catch(err => console.log(err));
  };

  handleChange = (e) => { 
    const list = document.getElementById("searchMenu").classList;
    let searchLength = document.getElementById("searchInput").value.length

    switch (searchLength > 0) {
    case true: 
        list.remove("hidden");
        this.setState({ searchOpen: true })
        break;
    default: 
        list.add("hidden");
    };

    this.setState({ searchInput: e.target.value });
  }

  handleClick = (e) => { 
    const list = document.getElementById("searchMenu").classList;
    const searchInput = document.getElementById("searchInput").classList;
    
    // Toggle list if menu button is not clicked on
    switch (e.target.parentNode.id || e.target.id) {
        case "searchMenu":
          list.add("hidden");
          searchInput.remove("focus");
          this.setState({ searchOpen: false })
          break;
        case "searchInput":
          searchInput.add("focus");
          if(e.target.value !== "" && this.state.searchOpen === false) { 
              list.remove("hidden"); 
          }
          break;
        default:
            return; 
    };
  };

  render() {
    let searchFilter = this.state.productList.filter((products) => { 
       return products.name.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) !== -1;
    });

    return (
      <>
        {
        this.state.searchOpen
          ? (
              <div>
                  <input 
                      type="text" 
                      id="searchInput" 
                      onChange={this.handleChange} 
                  />
                  <ul id="searchMenu" className="hidden"> 
                  {
                    searchFilter.slice(0, 10).map((product, index) => { 
                          return (
                            <li className="search" key={index} data-product={product.id}>
                              <div className="searchContainer">
                                <div className="searchDiv">
                                  <img src={product.image} alt={product.name} />
                                </div> 
                                <div className="searchText">
                                  {product.name}
                                </div>
                              </div>
                            </li>
                          )
                      })
                  }
                  </ul>
              </div>
            )
          : "" 
        }
      </>
    );
  };
};