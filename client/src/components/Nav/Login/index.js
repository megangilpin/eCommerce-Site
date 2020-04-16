import React, { Component } from "react";
import { Div, Input, Button } from "../../FormComponents";

export default class Login extends Component { 
  state = { 
    hidden: true,
  };

  componentDidMount = () => { 
    document.addEventListener("click", this.hideLogin, false);
  };

  hideLogin = (e) => { 
    const showLogin = e.target.id;

    if(showLogin === "loginNav" && this.state.hidden) {
      this.setState({ hidden: false }); 
    } else if (showLogin === "loginNav" && this.state.hidden === false) { 
      this.setState({ hidden: true }); 
    };
  };

  render() {
    const container = {  
      lineHeight: "35px",
      margin: "0 auto",
      position: "relative",
      width: "964px", 
    };

    const login = {
      height: "200px", 
      position: "absolute",
      top: "90px",
      width: "100%", 
    };
    
    const loginEmail = { 
      border: "1px solid #efefef",
      boxSizing: "border-box",
      focus: "none",
      fontSize: "12pt",
      padding: "15px 0 15px 15px",
      width: "100%",
      MozBoxSizing: "border-box",
      WebkitBoxSizing: "border-box",
    };
    
    const loginPassword = { 
      border: "1px solid #efefef",
      boxSizing : "border-box",
      fontSize: "12pt",
      padding: "15px 0px 15px 65px",
      width: "100%",
      MozBoxSizing: "border-box",
      WebkitBoxSizing: "border-box",
    };

    const showPass = { 
      color: "#ccc",
      cursor: "pointer",
      fontSize: "10pt",
      float: "right",
      padding: "15px",
      position: "absolute",
      textAlign: "right", 
      top: "113px",
    };
    
    const hidden = { 
      display: "none",
    };

    const error = { 
      color: "red",
    }

    return (
      <>
        <Div id="login" className={this.state.hidden ? hidden : ""} style={this.state.hidden ? hidden : login}>
          <Div className="container" style={container}> 
            <Div> 
              <Div>
                  Email
              </Div>
              <Div>
                  <Input type="text" id="loginEmail" style={loginEmail} />
              </Div>

              <Div>
                  Password
              </Div>
              <Div>
                <Input type="password" id="loginPassword" style={loginPassword} />
              </Div>

              <Button id="loginSubmit" {...this.props}>
                Submit
              </Button>

              <Div id="error" style={error}></Div> 
            </Div>

            <Div
              id="showPass" 
              style={showPass}
              onClick={
                () => { 
                  switch (document.getElementById("loginPassword").type) {
                    case "text": 
                      document.getElementById("loginPassword").type = "password";
                      document.getElementById("showPass").innerHTML = "ABC";
                    break;
                    default:
                      document.getElementById("loginPassword").type = "text";
                      document.getElementById("showPass").innerHTML = "***";
                  }
                }
              }
            > 
              ABC
            </Div>
          </Div>
        </Div>
      </>
    );
  };
}; 