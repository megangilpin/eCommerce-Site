import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    username: "",
    password: ""
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
          <label for="firstName" class="first-name">First Name</label>
          <input id="firstName" type="text"/>

          <label for="lastName" class="last-name">Last Name</label>
          <input id="lastName" type="text"/>

          <label for="email">Email</label>
          <input id="email" type="email"/>

          <label for="email">Password</label>
          <input id="email" type="password" />

          <label for="email">Retype Password</label>
          <input id="email" type="password" />

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;