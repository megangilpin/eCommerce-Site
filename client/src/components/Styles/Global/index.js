import styled from 'styled-components'

// Styled components meant to be used on a global scale 
// these can be reused throughout the site to create 
// a similar look and feel 
export const Container = styled.div`
  @media only screen and (min-width: 1200px) {
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    width: 1170px;
  };
  @media only screen and (max-width: 1200px) {
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    width: 970px;
  };  
  @media only screen and (max-width: 992px) {
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    width: auto;
  };  
  @media only screen and (max-width: 768px) {
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    width: auto;
  };  
`

export const Error = styled.div.attrs(props => ({
  padding: props.padding || "",
})) ` 
  color: red;
  padding: ${props => props.padding};
`

export const H2 = styled.h2 ` 
  font-weight: 500; 
  margin: 0;
`

export const P = styled.p.attrs(props => ({ 
  padding: props.padding || "0",
  fontWeight: props.weight || "",
}))` 
  font-weight: ${props => props.fontWeight}; 
  margin: 0;
  padding: ${props => props.padding};
`

export const StyledLink = styled.a`
	&:link { 
    color: #779ecb;
    cursor: pointer;
    text-decoration: none;
  }; 
  &:visited { 
    color: #779ecb;
    curser: pointer;
    text-decoration: none;
  }; 
`

