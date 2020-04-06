import React from "react"; 
import { Link } from "react-router-dom";
import Navbar from "../components/Nav/Navbar";
import Form from "../components/Form";
import "./Register.css"

export default function Register() { 
  return (

    <div>
      <Navbar />
      <div className="center">
        <div className="parent">
          <p className="title">
            <h2>Register</h2>
            <Link className="title" to="/">← Back to Shopping</Link>
          </p>
          
            <Form />
        </div>
      </div>
    </div>
  );
};