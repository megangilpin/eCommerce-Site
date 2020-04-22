import styled from 'styled-components';

const LoginInput = styled.input.attrs(props => ({
  size: props.size || "15px 0 15px 15px",
}))`
  border: 1px solid #efefef;
  box-sizing: border-box;
  font-size: 12pt;
  padding: ${props => props.size};
  width: 100%;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  &:focus { 
    border: 1px solid #779ecb;
    outline: none;
  }
`
export default LoginInput;