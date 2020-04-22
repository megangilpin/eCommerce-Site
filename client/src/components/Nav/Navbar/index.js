import React, { Component } from "react";
import axios from "axios"; 

// Styles
import { 
  Container, 
  Nav, 
  NavUl, 
  NavLi, 
} from "../../Styles";

export default class Home extends Component { 
  state = { 
    navOptions: [],
    userInfo: "", 
  }; 

  componentDidMount = async () => { 
    document.addEventListener("click", this.handleClick, false);  

    axios.post("/auth/validate").then(r => {
      this.setState({ 
        navOptions: r.data.navOptions, 
        navURL: r.data.navURL,
        userInfo: r.data.database,
      });
    });
  };

  render() { 
    return ( 
      <Nav>
        <Container>
          <NavUl>
            {
              this.state.navOptions.map((options, index) => { 
                return (
                  <NavLi key={index} id={options.toLowerCase() + "-nav"}>{options}</NavLi>
                )
              })
            }
          </NavUl>
        </Container>
      </Nav>
    );
  };
};