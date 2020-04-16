import React, { Component } from "react";
import axios from "axios"; 
import jwtdecode from "jwt-decode";
import Login from "../Login"; 
import { Div } from "../../FormComponents";

import "./Navbar.css";

export default class Home extends Component { 
  state = { 
      loggedIn: false,
      nav: "",
      liDotNav: { 
        listStyle: "none",
        cursor: "pointer",
        display: "inline-block",
        padding: "0 30px 0 0",
        paddingInlineStart: "0px",
      }, 
  }; 

  componentDidMount = async () => { 
    document.addEventListener("keydown", this.handleKeyPress, false);
    document.addEventListener("click", this.handleClick, false);

    const access_token = await window.localStorage.getItem("access_token");
    const jwt_decoded = await access_token ? jwtdecode(access_token) : ""; 
    const expired = `${new Date().getTime() > jwt_decoded.exp ? true : false}`;

    if(expired === 'false') { 
      window.localStorage.clear();
      this.setState({ 
        loggedIn: false, 
        nav: (
          <>
            <li id="loginNav" style={this.state.liDotNav}>Login</li>
            <li id="registerNav" style={this.state.liDotNav}>Register</li>
          </> 
        ),
      }); 
    } else {
      axios.post("/auth/validate", { 
        access_token: access_token, 
        uuid: jwt_decoded.uuid, 
      }).then(res => {
        if(res.data.access === "approve") {
          window.localStorage.setItem("access_token", res.data.access_token);
          this.setState({ 
            loggedIn: true, 
            nav: (
              <>
                <li className="nav">Profile</li>
                <li className="nav" onClick={this.handleLogout}>Logout</li>
              </>
            )
          }); 
        } else {
          this.setState({ 
            loggedIn: false, 
            nav: (
              <>
                <li id="loginNav" style={this.state.liDotNav}>Login</li>
                <li id="registerNav" style={this.state.liDotNav}>Register</li>
              </> 
            )
          }); 
        }
      }).catch(err => console.log(err));
    };
  };

  handleSubmit = (e) => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value; 

    axios.post("/auth/login", {email, password}).then((result, err) => {
      if(result.data.status === 401) { 
        document.getElementById("error").innerHTML = result.data.message;
      } else { 
        document.getElementById("error").innerHTML = "";
        document.getElementById("login").setAttribute("style", "display: none");
        
        window.localStorage.setItem("access_token", result.data.access_token);
        this.setState({ 
          loggedIn: true,
          nav: (
            <>
              <li className="nav" style={this.state.liDotNav}>Profile</li>
              <li className="nav" style={this.state.liDotNav} onClick={this.handleLogout}>Logout</li>
            </>
          ),
        });
      };
    });
  }; 

  handleKeyPress = (e) => { 
    switch(e.key) {
      case "Enter":
        this.handleSubmit(e);
      break;
      default:
          return; 
    };
  };

  handleLogout = () => { 
    window.localStorage.clear();
    window.location.reload();
  };

  handleClick = (e) => {
    const navOption = e.target.id; 

    if(navOption === "registerNav") { 
      window.location.href = "/register";
    };
  };

  render() { 
    
    const navbar = { 
      backgroundColor: "#f1f1f1",
      height: "70px",
      position: "absolute",
      top: "0px",
      width: "100%", 
    };
    
    const navContainer = { 
      lineHeight: "35px",
      margin: "0 auto",
      position: "relative",
      width: "964px", 
    };
    
    const ulDotNav = { 
      listStyle: "none",
      paddingInlineStart: "0px",
    };

    return ( 
      <Div>
        <nav id="navbar" style={navbar}>
          <Div className="container" style={navContainer}> 
            <ul className="nav" style={ulDotNav}>
              {this.state.nav} 
            </ul>
          </Div>
        </nav>
        <Login onClick={this.handleSubmit} />
      </Div> 
    );
  };
};