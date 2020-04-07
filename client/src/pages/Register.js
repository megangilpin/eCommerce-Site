import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Nav/Navbar";
import Form from "../components/Form";
import "./Register.css"

class Register extends Component {
  state = {

  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="center">
          <div className="parent">
            <div className="title">
              <h2>Register</h2>
              <Link className="title" to="/">← Back to Authors</Link>
            </div>
            <Form />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;