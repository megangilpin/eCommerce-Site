import React, { Component } from "react";
import "./Login.css"

export default class Login extends Component { 
  state = { 
    hidden: true,
  };

  render() {
    return (
      <>
        <div id="login" className="hidden">
          <div className="container"> 
            <div className="main"> 
              <div>
                  Email
              </div>
              <div>
                  <input type="text" id="email" />
              </div>

              <div>
                  Password
              </div>
              <div>
                <input type="password" id="password" />
              </div>

              <button id="loginSubmit" {...this.props}>
                Submit
              </button>

              <div id="error">
                
              </div> 
            </div>

            <div
              id="showPass" 
              onClick={
                () => { 
                  switch (document.getElementById("password").type) {
                    case "text": 
                      document.getElementById("password").type = "password"
                      document.getElementById("showPass").innerHTML = "ABC"
                    break;
                    
                    default:
                      document.getElementById("password").type = "text"
                      document.getElementById("showPass").innerHTML = "***"
                  }
                }
              }
            > 
              ABC
            </div>
          </div>
        </div>
      </>
    );
  };
}; 