import styled from 'styled-components'

const Error = styled.div.attrs(props => ({
  padding: props.padding || "",
})) ` 
  color: red;
  padding: ${props => props.padding};
`

export default Error