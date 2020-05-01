import styled from 'styled-components'

// Covers the page with an opaque black div 
// This is used to bring attention to the form
export const LoginCover = styled.div`
  background: #000;
  min-height: 100%;
  opacity: .4;
	position: absolute; 
  top: 60px;
  width: 100%;
`

// The wrapper adds a white div on top of the cover 
// so the form is not sucked into the div with opacity
export const LoginWrapper = styled.div`
  background: #fff;
  overflow: auto;
  padding: 20px 0 40px 0;
  position: absolute; 
  top: 60px;
  min-width: 100%;
  z-index: 100;
`

export const LoginLabel = styled.div `
    padding: 10px 0;
`

export const LoginInput = styled.input.attrs(props => ({
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

// Creates a floating div that can be clicked 
// to change the input type from password to text
export const LoginPasswordReveal = styled.div `
  color: #ccc;
  cursor: pointer;
  font-size: 10pt;
  float: right;
  padding: 15px;
  position: absolute;
  text-align: right; 
  top: 148px;
`

export const LoginButton = styled.button `
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