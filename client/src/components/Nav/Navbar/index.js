import React, { Component } from "react";
import axios from "axios"; 
import jwtdecode from "jwt-decode";
import Login from "../Login"
import "./Navbar.css";

export default class Home extends Component { 
  state = { 
      showLogin: false,
      loggedIn: false,
      nav: "",
  }; 

  componentDidMount = async () => { 
    document.addEventListener("keydown", this.handleKeyPress, false);

    const access_token = await window.localStorage.getItem("access_token");
    const jwt_decoded = await access_token ? jwtdecode(access_token) : ""; 
    const expired = `${new Date().getTime() > jwt_decoded.exp ? true : false}`;

    if(expired === 'false') { 
      window.localStorage.clear();
      this.setState({ 
        loggedIn: false, 
        nav: (
          <>
            <li className="nav" onClick={this.handleClick}>Login</li>
            <li className="nav">Register</li>
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
            loggedIn: false, nav: (
              <>
                <li className="nav" onClick={this.handleClick}>Login</li>
                <li className="nav">Register</li>
              </> 
            )
          }); 
        }
      }).catch(err => console.log(err));
    }
  };

  handleSubmit = (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value; 

    axios.post("/auth/login", {email, password}).then((result, err) => {
      if(result.data.status === 401) { 
        document.getElementById("error").innerHTML = result.data.message;
      } else { 
        document.getElementById("error").innerHTML = "";
        document.getElementById("login").classList.add("hidden");
        
        window.localStorage.setItem("access_token", result.data.access_token);
        this.setState({ 
          loggedIn: true,
          nav: (
            <>
              <li className="nav">Profile</li>
              <li className="nav" onClick={this.handleLogout}>Logout</li>
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
          return; // Do nothing if anything but enter is pressed
    };
  };

  handleLogout = () => { 
    window.localStorage.clear();
    window.location.reload();
  }

  handleClick = () => {
    if(this.state.showLogin === false) {
      document.getElementById("login").classList.remove("hidden");
      this.setState({ 
        showLogin: true
      });
    } else {
      document.getElementById("login").classList.add("hidden");
      this.setState({ 
        showLogin: false,
      });
    }
  }

  render() { 
    return ( 
      <div>
        <nav id="navbar">
          <div className="container"> 
            <ul className="nav">
              {this.state.nav} 
            </ul>
          </div>

          
        </nav>
        <Login onClick={this.handleSubmit} />
      </div> 
    );
  };
};