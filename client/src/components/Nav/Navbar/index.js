import React, { Component } from "react";
import axios from "axios"; 
import jwtdecode from "jwt-decode";
import "./Navbar.css";

export default class Home extends Component { 
  state = { 
      loggedIn: false,
      nav: "",
  }; 

  componentDidMount = async () => { 
    const access_token = await window.localStorage.getItem("access_token");
    const jwt_decoded = await access_token ? jwtdecode(access_token) : ""; 
    const expired = `${new Date().getTime() > jwt_decoded.exp ? true : false}`;

    if(expired === 'false') { 
      window.localStorage.clear();
      this.setState({ 
        loggedIn: false, 
        nav: (
          <>
            <li className="nav">Login</li>
            <li className="nav">Register</li>
          </> 
        )
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
              <li className="nav">Profile</li>
            )
          }); 
        } else {
          this.setState({ 
            loggedIn: false, nav: (
              <>
                <li className="nav">Login</li>
                <li className="nav">Register</li>
              </> 
            )
          }); 
        }
      }).catch(err => console.log(err));
    }
  };

  render() { 
    return ( 
      <>
        <div id="navbar">
          <div className="container"> 
            <ul>
              {this.state.nav} 
            </ul>
          </div>
        </div>
      </> 
    );
  };
};