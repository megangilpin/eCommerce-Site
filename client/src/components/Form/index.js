import React, { Component } from "react";
import axios from "axios"; 
import "./Form.css";

class Form extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    uuid: ""
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, prevent the default event and alert the username and password
  handleRegisterSubmit = event => {
    event.preventDefault();
    // check if password matches
    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords don't match, please try again");
      this.setState({ password: "", confirmPassword: "" });
      return;
    }
    // send user to 
    axios.post("/auth/register", {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }).then(res => {
      if(res.data.saved){
        
        this.setState({ 
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirmPassword: "",
          uuid: res.data.uuid
        });
        alert("Thank you for registering!")
      } else if (!res.data.saved) {
        this.setState({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        alert(`${res.data.message}, please try again`)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <form className="form1" >
          <label className="first-name">First Name</label>
          <input 
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={this.handleInputChange}
          />

          <label className="last-name">Last Name</label>
          <input 
            type="text"
            name="last_name"
            value={this.state.last_name}
            onChange={this.handleInputChange}
          />

          <label >Email</label>
          <input 
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <label>Password</label>
          <input 
            type="text" 
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <label>Confirm Password</label>
          <input 
            type="text" 
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
          />

          <button onClick={this.handleRegisterSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;