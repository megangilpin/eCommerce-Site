import React, { Component } from "react";
import axios from "axios";  

export default class Login extends Component { 
  state = { 
    hidden: true,
  };

  handleClick = () => { 
    
  }

  handleKeyPress = (e) => { 
    switch(e.key) {
      case "Enter":
        e.preventDefault();
        this.handleSubmit(e);
        break;
        
      default:
          return; // Do nothing
    };
  };

  handleSubmit = (e) => {
        
  }; 

  render() {
    return (
      <>

      </>
    );
  };
}; 