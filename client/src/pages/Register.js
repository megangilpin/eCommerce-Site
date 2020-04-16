import React, { Component } from "react";
import axios from "axios"; 
import { Div, Input, Button, Label } from "../components/FormComponents";

export default class Register extends Component {
  state = {
    firstName: "",
    lastName: "", 
    emailInput: "",
    passwordInput: "", 
    confirmPassword: "",
    button: "active",
  };

  componentDidMount = (e) => { 
    document.addEventListener("keydown", this.handleKeyPress, false);
  };

  handleKeyPress = (e) => { 
    switch(e.key) {
      case "Enter":
        this.handleRegisterSubmit(e);
        break;
      default:
        return; 
    };
  };

  handleInputChange = (e) => { 
    const { id, value } = e.target;

    this.setState({
      [id]: value,
    });
  };

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const confirmEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.exec(this.state.emailInput); 
    const error = document.getElementById("error");
    const button = document.getElementById("registerSubmit");
    error.innerHTML = "";

    if(this.state.firstName === "") {
      error.innerHTML = "Please provide a first name"
    } else if(this.state.lastName === "") { 
      error.innerHTML = "Please provide a last name"
    } else if(confirmEmail === null) { 
      error.innerHTML = "Please provide a valid email address"
    } else if (this.state.passwordInput !== this.state.confirmPassword) { 
      error.innerHTML = "Password does not match"
    } else {
      axios.post("/auth/register", {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.emailInput,
        password: this.state.passwordInput,
      })
      .then(res => {
        if(res.data.saved){
          this.setState({ button: "disabled" });
          button.setAttribute("disabled", true);
          window.location.href = "/";
        } else {
          this.setState({ button: "active" });
          button.setAttribute("disabled", false);
          error.innerHTML = res.data.message;
        };
      })
      .catch(function (error) {
        console.log(error);
      });
    };
  };

  render() {
    const registerContainer = {
      height: "100%",
      minWidth: "100%",
    };

    const registerLeft = { 
      background: "#f7f7f7",
      float: "left",
      minHeight: "100%",
      minWidth: "50%",
      maxWidth: "50%",
      outline: "1px solid #f1f1f1",
    };

    const registerRight = { 
      float: "left",
      height: "100%",
      minWidth: "50%",
      maxWidth: "50%",
      overflow: "auto",
    };

    const divTable = { 
      padding: "5px 0", 
      width: "100%",
    };

    const logoFloat = { 
      float: "right", 
      padding: "8% 80px", 
      textAlign: "right", 
      width: "50%",
    };
    
    const noInputError = { 
      border: "1px solid #efefef",
      borderRadius: "5px",
      fontSize: "12pt",
      margin: "0 0 10px 0",
      padding: "10px",
      width: "100%", 
    };
    
    const error = { 
      color: "red",
      padding: "20px 0",
    };
    
    const activeButton = {
      background: "#779ecb",
      border: "0px",
      borderRadius: "5px",
      color: "#fff",
      cursor: "pointer",
      fontSize: "12pt",
      fontWeight: "500",
      margin: "15px 0 0 0",
      padding: "15px 20px",
      width: "60%",
    };
    
    const disabledButton = { 
      background: "#f7f7f7",
      border: "0px",
      borderRadius: "5px",
      color: "#000",
      cursor: "auto",
      fontSize: "12pt",
      fontWeight: "500",
      margin: "15px 0 0 0",
      padding: "15px 20px",
      width: "60%",
    };

    const clearFix = { 
      clear: "both",
    }

    return (
      <Div id="registerContainer" style={registerContainer}>
        <Div id="registerLeft" style={registerLeft}>
          <Div style={logoFloat}>Logo</Div>
        </Div>

        <Div id="registerRight" style={registerRight}>
          <Div style={{width: "50%", padding: "8% 40px"}}>
            <Div>
              <h2 style={{fontWeight: "500", margin: "0"}}>Create an account</h2>
              <p style={{padding: "10px 0 40px 0", margin: "0"}}>Change your mind? <a href="/">Return to shopping</a>.</p>
            </Div>
            <Div style={divTable}>
              <Label>First name</Label>
            </Div>
            <Div style={divTable}>
              <Input 
                type="text"
                id="firstName"
                className="noInputError"
                style={noInputError}
                onChange={this.handleInputChange}
              />
            </Div>
            <Div style={divTable}>
              <Label>Last name</Label>
            </Div>
            <Div style={divTable}>
              <Input 
                type="text"
                id="lastName"
                className="noInputError"
                style={noInputError}
                onChange={this.handleInputChange}
              />
            </Div>
            <Div style={divTable}>
              <Label>Email</Label>
            </Div>
            <Div style={divTable}>
              <Input 
                type="email"
                id="emailInput"
                className="noInputError"
                style={noInputError}
                onChange={this.handleInputChange}
              />
            </Div>
            <Div style={divTable}>
              <Label>Password</Label>
            </Div>
            <Div style={divTable}>
              <Input 
                type="password"
                id="passwordInput"
                className="noInputError"
                style={noInputError}
                onChange={this.handleInputChange}
              />
            </Div>
            <Div style={divTable}>
              <Label>Confirm password</Label>
            </Div>
            <Div style={divTable}>
              <Input 
                type="password"
                id="confirmPassword"
                className="noInputError"
                style={noInputError}
                onChange={this.handleInputChange}
              />
            </Div>
            <Button id="registerSubmit" style={this.state.button === "active" ? activeButton : disabledButton} onClick={this.handleRegisterSubmit}>
              Create your account
            </Button>
            <Div id="error" style={error}></Div>
          </Div>
          <Div style={clearFix}></Div>
        </Div>
      </Div>
    );
  };
};