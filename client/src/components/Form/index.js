import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
  handleFormSubmit = event => {
    event.preventDefault();
    alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);
    this.setState({ username: "", password: "" });
  };

  render() {
    return (
      <div>
        <form class="form1" action="">
          <label for="first_name" class="first-name">First Name</label>
          <input 
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={this.handleInputChange}
          />

          <label for="last_name" class="last-name">Last Name</label>
          <input 
            type="text"
            name="last_name"
            value={this.state.last_name}
            onChange={this.handleInputChange}
          />

          <label for="email">Email</label>
          <input 
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <label for="password">Password</label>
          <input 
            type="text" 
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="text" 
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
          />

          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;