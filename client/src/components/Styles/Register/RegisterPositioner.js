import styled from 'styled-components'

const RegisterPositioner = styled.div.attrs(props => ({
  float: props.float || "", 
  padding: props.padding || "8% 40px", 
  textAlign: props.align || "", 
}))`
  float: ${props => props.float};
  padding: ${props => props.padding};
  text-align: ${props => props.align}; 
  width: 50%;
`
export default RegisterPositioner;