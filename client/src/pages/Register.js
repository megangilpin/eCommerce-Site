import React, { Component } from "react";
import axios from "axios"; 
import { Div, Input, Button, Label } from "../components/FormComponents"
import "./Register.css"

export default class Register extends Component {
  state = {
    firstName: "",
    lastName: "", 
    emailInput: "",
    passwordInput: "", 
    confirmPassword: "",
  };

  handleInputChange = (e) => { 
    const { id, value } = e.target

    this.setState({
      [id]: value
    })
  }

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const confirmEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.exec(this.state.emailInput); 
    const error = document.getElementById("error");
    
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
          window.location.href = "/"
        } else {
          error.innerHTML = res.data.message
        };
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    return (
      <Div id="registerContainer">
        <Div id="registerLeft">
          <Div style={{width: "50%", textAlign: "right", float: "right", padding: "8% 80px"}}>Logo</Div>
        </Div>

        <Div id="registerRight">
          <Div style={{width: "50%", padding: "8% 40px"}}>
            <Div>
              <h2 style={{fontWeight: "500", margin: "0"}}>Create an account</h2>
              <p style={{padding: "10px 0 40px 0", margin: "0"}}>Change your mind? <a href="/">Return to shopping</a>.</p>
            </Div>
            <Div style={{width: "100%", padding: "5px 0"}}>
              <Label>First name</Label>
            </Div>
            <Div style={{width: "100%", padding: "5px 0"}}>
              <Input 
                type="text"
                id="firstName"
                className="noInputError"
                onChange={this.handleInputChange}
              />
            </Div>
            <Div style={{width: "100%", padding: "5px 0"}}>
              <Label>Last name</Label>
            </Div>
            <Div style={{width: "100%", padding: "5px 0"}}>
              <Input 
                type="text"
                id="lastName"
                className="noInputError"
                onChange={this.handleInputChange}
              />
            </Div>
            <Div style={{width: "100%", padding: "5px 0"}}>
              <Label>Email</Label>
            </Div>
            <Div style={{width: "100%", padding: "5px 0"}}>
              <Input 
                type="email"
                id="emailInput"
                className="noInputError"
                onChange={this.handleInputChange}
              />
            </Div>
            <Div style={{width: "100%", padding: "5px 0"}}>
              <Label>Password</Label>
            </Div>
            <Div style={{width: "100%", padding: "5px 0"}}>
              <Input 
                type="password"
                id="passwordInput"
                className="noInputError"
                onChange={this.handleInputChange}
              />
            </Div>
            <Div style={{width: "100%", padding: "5px 0"}}>
              <Label>Confirm password</Label>
            </Div>
            <Div style={{width: "100%", padding: "5px 0"}}>
              <Input 
                type="password"
                id="confirmPassword"
                className="noInputError"
                onChange={this.handleInputChange}
              />
            </Div>
            <Button id="registerSubmit" style={{width: "60%", padding: "15px 20px", borderRadius: "5px", background: "#779ecb", border: "0px", fontSize: "12pt", margin: "15px 0 0 0", color: "#fff", fontWeight: 500}} onClick={this.handleRegisterSubmit}>
              Create your account
            </Button>
            <Div id="error"></Div>
          </Div>
          <Div style={{clear: "both"}}></Div>
        </Div>
      </Div>
    );
  };
};
