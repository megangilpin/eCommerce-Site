import styled from 'styled-components'

// Style the search input
export const SearchInput = styled.input`
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
  border: 1px solid #efefef;
  box-sizing : border-box;
  font-size: 12pt;
  margin: 20px 0 0 0;
  padding: 10px;
  width: 100%;
  &:focus {
    border:1px solid #779ecb;
    outline: none;
  }
`

// Once a search is initiated create a container div 
// that sits below the search input 
export const SearchContainer = styled.div`
  display: inline-block;
  line-height: 50px;
`

// Use an unordered list to keep track of each item
export const SearchUl = styled.ul`
  list-style: none;
  list-style-position: inside;
  margin: 0;
  padding: 0;
`

// Style the item list and on the last item
// round the corners 
export const SearchLi = styled.li`
  border-bottom: 1px solid #f1f1f1;
  border-left: 1px solid #f1f1f1;
  border-right: 1px solid #f1f1f1;
  list-style: none;
  list-style-position: inside;
  margin: 0;
  padding: 10px 20px;
  &:last-child { 
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin: 0 0 20px 0;
  };
  &:hover {
    background: #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    border-left: 1px solid #f1f1f1;
    border-right: 1px solid #f1f1f1;
    color: #000;
    cursor: pointer;
  };
`

// In order to size up the image lets place this in a container 
// so its sizing can be relative
export const SearchImgContainer = styled.div`
  float: left;
  max-height: 50px;
  padding: 0 40px 0 0;
`

export const SearchImg = styled.img`
  max-height: 50px;
`

// Style the item description text
export const SearchText = styled.div`
  float: left;
  padding: 0 40px 0 0;
`
