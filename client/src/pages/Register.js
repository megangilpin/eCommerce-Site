import React, { Component } from "react";
import axios from "axios"; 

// Styles 
import { 
  RegisterWrapper,
  RegisterLeftContainer,
  RegisterRightContainer,
  RegisterPositioner,
  RegisterInput,
  RegisterLabel,
  RegisterButton,
  H2, 
  P,
  StyledLink,
  Error,
} from "../components/Styles";

export default class Register extends Component {
  state = {
    firstName: "",
    lastName: "", 
    emailInput: "",
    passwordInput: "", 
    confirmPassword: "",
    errorMsg: "",
    problemInput: "",
  };

  componentDidMount = (e) => { 
    document.addEventListener("keydown", this.handleKeyPress, false);
  };

  handleKeyPress = (e) => { 
    if (e.key === "Enter") {
      this.handleRegisterSubmit(e);
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

    this.setState({ 
      errorMsg: "",
      problemInput: "",
    });
  
    if (this.state.firstName === "") {
      this.setState({ 
        errorMsg: "Please provide a first name",
        problemInput: "firstName",
      });

    } else if (this.state.lastName === "") { 
      this.setState({ 
        errorMsg: "Please provide a last name",
        problemInput: "lastName",
      });

    } else if (confirmEmail === null) { 
      this.setState({ 
        errorMsg: "Please provide a valid email address",
        problemInput: "emailInput",
      });

    } else if (this.state.passwordInput !== this.state.confirmPassword) { 
      this.setState({ 
        errorMsg: "Password does not match",
        problemInput: "passwordInput",
      });
      
    } else {
      axios.post("/auth/register", {
        first_name: this.state.firstName.trim(),
        last_name: this.state.lastName.trim(),
        email: this.state.emailInput.trim().toLowerCase(),
        password: this.state.passwordInput,
      })
      .then(res => {
        if (res.data.saved) {
          window.location.href = "/";
        } else {
          this.setState({ 
            errorMsg: res.data.message,
          });
        };
      })
      .catch(function (error) {
        console.log(error);
      });
    };
  };

  handleInputChange = (e) => { 
    const { id, value } = e.target

    this.setState({
      [id]: value
    })
  };

  render() {
    return (
      <RegisterWrapper>
        <RegisterLeftContainer>
          <RegisterPositioner 
            float="right" 
            padding = "8% 80px" 
            align="right"
          >
            Logo
          </RegisterPositioner>
        </RegisterLeftContainer>

        <RegisterRightContainer>
          <RegisterPositioner>
            <H2>Create an account</H2>
            <P padding="10px 0 40px 0">
              Change your mind? <StyledLink href="/">Return to shopping</StyledLink>.
            </P>
            
            <RegisterLabel>First name</RegisterLabel>
            <RegisterInput 
              type="text"
              id="firstName"
              onChange={this.handleInputChange}
            />
          
            <RegisterLabel>Last name</RegisterLabel>
            <RegisterInput 
              type="text"
              id="lastName"
              onChange={this.handleInputChange}
            />
          
            <RegisterLabel>Email</RegisterLabel>
            <RegisterInput 
              type="email"
              id="emailInput"
              onChange={this.handleInputChange}
            />
          
            <RegisterLabel>Password</RegisterLabel>
            <RegisterInput 
              type="password"
              id="passwordInput"
              onChange={this.handleInputChange}
            />
          
            <RegisterLabel>Confirm password</RegisterLabel>
            <RegisterInput 
              type="password"
              id="confirmPassword"
              onChange={this.handleInputChange}
            />
            
            <RegisterButton id="registerSubmit" onClick={this.handleRegisterSubmit}>
              Create your account
            </RegisterButton>
            <Error padding="20px 0">{this.state.errorMsg}</Error>
          </RegisterPositioner>
        </RegisterRightContainer>
      </RegisterWrapper>
    );
  };
};
