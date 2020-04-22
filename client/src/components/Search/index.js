import React, { Component } from "react";
import axios from "axios";

// Styles
import { 
  SearchInput, 
  SearchUl, 
  SearchLi,
  SearchContainer,
  SearchImgContainer,
  SearchImg,
  SearchText,
} from "../Styles";

// Dynamic search box
export default class Search extends Component {
  state = { 
    productList: [],
    searchOpen: false, 
    searchInput: "", 
  };

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

    this.setState({ 
      productList: products 
    });

    })
    .catch(err => console.log(err));
  };

  handleChange = (e) => { 
    let searchLength = document.getElementById("searchInput").value.length

    if (searchLength > 0) {
      this.setState({ 
        searchOpen: true,
        searchInput: e.target.value,
      }, () => { 
        // Updating state creates a pending state transition so an input change is always 
        // one behind. Using the callback that invokes state forces the change to be recognized
        // immediately. If state is one step behind, it can affect click logic around how to 
        // handle search open/close logic and filtering

        // Passing pending state to function that returns nothing
        this.forceStateUpdate(this.state.searchInput) 
      })
    };
  };

  forceStateUpdate = (state) => { 
    return;
  }

  handleClick = (e) => { 
    const searchSelect = e.target.className.includes('searchOpen');
  
    if (searchSelect === false && this.state.searchOpen) { 
      this.setState({ 
        searchOpen: false,
      });
    
     } else if (searchSelect && this.state.searchOpen === false) { 
      this.setState({ 
        searchOpen: true,
      });
    };
  };

  render() {
    let searchFilter = this.state.productList.filter((products) => { 
       return products.name.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) !== -1;
    });

    return (
      <>
        <SearchInput 
            type="text" 
            id="searchInput" 
            className="searchOpen"
            onChange={this.handleChange} 
        />
            
        { 
          this.state.searchOpen
            ? 
              (
                <SearchUl id="searchMenu" style={{
                  display: this.state.searchOpen 
                    ? "block" 
                    : "none"
                  }}
                > 
                  {
                    searchFilter.slice(0, 10).map((product, index) => { 
                      return (
                        <SearchLi key={index} className="searchOpen" data-product={product.id}>
                          <SearchContainer>
                            <SearchImgContainer>
                              <SearchImg src={product.image} alt={product.name} />
                            </SearchImgContainer> 
                            <SearchText>
                              {product.name}
                            </SearchText>
                          </SearchContainer>
                        </SearchLi>
                      );
                    })
                  }
                </SearchUl>
              )
            : ""
        }
      </>
    );
  };
};