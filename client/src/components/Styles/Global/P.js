import styled from 'styled-components'

const P = styled.p.attrs(props => ({ 
    padding: props.padding || "0",
    fontWeight: props.weight || "",
}))` 
  font-weight: ${props => props.fontWeight}; 
  margin: 0;
  padding: ${props => props.padding};
`

export default P;