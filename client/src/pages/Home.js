import React, { Component } from "react"; 
import axios from "axios";

import Navbar from "../components/Nav/Navbar";
import Login from "../components/Nav/Login"; 
import Search from "../components/Search";

// Styles
import { 
  Container, 
  LoginCover, 
  LoginWrapper,
} from "../components/Styles";

export default class Home extends Component { 
  state = { 
    showLogin: false,
  }; 

  componentDidMount = () => { 
    document.addEventListener("click", this.handleClick, false);
  };

  handleClick = (e) => { 
    const target = e.target.id; 

    if (target === "cover") { 
      this.setState({
        showLogin: false,
      });

    } else if (target === "login-nav" && this.state.showLogin) { 
      this.setState({
        showLogin: false,
      });

    } else if (target === "login-nav" && this.state.showLogin === false) { 
      this.setState({
        showLogin: true,
      });

    } else if (target === "register-nav") { 
      window.location.href = "/register"; 

    } else if (target === "logout-nav") { 
      axios.post("/auth/logout").then(r => { 
        if (r.data.access === "revoked") { 
          window.location.href = "/"; // If loggged out redirect to home page
        } else { 
          // TODO
          // show error on page if logout fails
          console.log(r.data.message);
        };
      });
    };
  };

  render() { 
    return ( 
      <>
        <LoginCover id="cover" className={this.state.showLogin ? "" : "hide"}></LoginCover>
        <LoginWrapper className={this.state.showLogin ? "" : "hide"}>
          <Container>
            <Login />
          </Container>
        </LoginWrapper>

        <Navbar />
        <Container> 
          <Search />
        </Container>
      </> 
    );
  };
};