import styled from 'styled-components'

// Unique style commponents designed for the Navigation bar
// Responsive to screensize
export const Nav = styled.nav`
  @media only screen and (min-width: 1200px) {
    background: #f1f1f1;
    height: 60px;
    line-height: 30px;
    margin: 0;
    overflow: none;
    width: 100%;
  };
  @media only screen and (max-width: 1200px) {
    background: #f1f1f1;
    height: 60px;
    line-height: 30px;
    margin: 0;
    overflow: none;
    width: 100%;
  };  
  @media only screen and (max-width: 992px) {
    background: #f1f1f1;
    height: 60px;
    line-height: 30px;
    margin: 0;
    overflow: none;
    width: 100%;
  };  
  @media only screen and (max-width: 768px) {
    background: #f1f1f1;
    height: 60px;
    line-height: 30px;
    margin: 0;
    overflow: none;
    width: auto;
  };  
`
// Unordered lists are used to build the "buttons"
// found in the navigation
export const NavUl = styled.ul`
  display: inline-block;
  list-style: none;
  padding-inline-start: 0px;
`

export const NavLi = styled.li`
  display: inline-block;
  padding-inline-end: 40px;
  padding-inline-start: 0px;
  &:hover { 
    color: #779ecb; 
    cursor: pointer;
  }
`