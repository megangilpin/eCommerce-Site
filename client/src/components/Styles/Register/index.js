import styled from 'styled-components'

// Unique style commponents designed for the Register page
export const RegisterWrapper = styled.div`
  height: 100%;
  minWidth: 100%;
`
// The register page as two containers, a left side 
// and a right side 
export const RegisterLeftContainer = styled.div`
  background: #f7f7f7;
  float: left;
  min-height: 100%;
  min-width: 50%;
  max-width: 50%;
  outline: 1px solid #f1f1f1;
  overflow: auto;
  position: absolute;
`

export const RegisterRightContainer = styled.div`
  margin-left: 50%;
  height: 100%;
  min-width: 50%;
  max-width: 50%;
  overflow: auto;
  position: absolute;
`

// The positioner allows you to pass in float, padding 
// and text alignment props if needed. This positions the 
// text and the register inputs within the containers
export const RegisterPositioner = styled.div.attrs(props => ({
  float: props.float || "", 
  padding: props.padding || "8% 40px", 
  textAlign: props.align || "", 
}))`
  float: ${props => props.float};
  padding: ${props => props.padding};
  text-align: ${props => props.align}; 
  width: 50%;
`

// Labels are used to break apart the inputs so users 
// know which input collects what information
export const RegisterLabel = styled.label`
  display: block;
  margin: 10px 0; 
  width: 100%;
`

// Input styling
export const RegisterInput = styled.input`
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

// Button styling
export const RegisterButton = styled.button`
  background: #779ecb;
  border: 0px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 12pt;
  font-weight: 500;
  margin: 15px 0 0 0;
  padding: 15px 20px;
  width: 60%;
`