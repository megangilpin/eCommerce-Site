import styled from 'styled-components'

const RegisterInput = styled.input`
  border: 1px solid #efefef;
  border-radius: 5px;
  font-size: 12pt;
  margin: 0 0 10px 0;
  padding: 13px;
  width: 100%; 
  &:focus { 
    border: 1px solid #779ecb;
    outline: none;
  };
`
export default RegisterInput;