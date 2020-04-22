import styled from 'styled-components';

const LoginButton = styled.button `
  border-radius: 5px; 
  background: #779ecb; 
  border: 0px; 
  color: #fff; 
  font-size: 12pt; 
  font-weight: 500;
  margin: 15px 0; 
  padding: 12px 15px; 
  &:focus { 
    color: #fff;

    outline: none;
  }
`
export default LoginButton;