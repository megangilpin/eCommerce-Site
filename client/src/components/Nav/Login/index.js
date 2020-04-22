import React, { Component } from "react";
import axios from "axios"; 

// Styles
import { 
  Error, 
  LoginLabel, 
  LoginInput, 
  LoginPasswordReveal, 
  LoginButton,
} from "../../Styles";

export default class Login extends Component { 
  state = { 
    showError: false,
    errorMsg: "",
  };

  componentDidMount = () => { 
    document.addEventListener("keydown", this.handleKeyPress, false);
  };

  handleSubmit = (e) => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value; 

    axios.post("/auth/login", { email, password }).then((r, err) => {
      if (r.data.status === 401) { 
        this.setState({
          showError: true,
          errorMsg: r.data.message,
        });
      } else { 
        window.location.reload();
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

  render() {  
    return (
      <>
        <LoginLabel>
          Email
        </LoginLabel>
        <LoginInput type="text" id="loginEmail" />

        <LoginLabel>
            Password
        </LoginLabel>
        <LoginInput type="password" id="loginPassword" size="15px 0 15px 65px" />

        <LoginButton id="loginSubmit" onClick={this.handleSubmit}>
          Submit
        </LoginButton>

        {this.state.showError === false ? "" : <Error>{this.state.errorMsg}</Error>}

        <LoginPasswordReveal
          id="revealPassword" 
          onClick={
            () => { 
              switch (document.getElementById("loginPassword").type) {
                case "text": 
                  document.getElementById("loginPassword").type = "password";
                  document.getElementById("revealPassword").innerHTML = "ABC";
                break;
                default:
                  document.getElementById("loginPassword").type = "text";
                  document.getElementById("revealPassword").innerHTML = "***";
              };
            }
          }
        > 
          ABC
        </LoginPasswordReveal>
      </>
    );
  };
}; 