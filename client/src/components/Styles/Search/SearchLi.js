import styled from 'styled-components'

const SearchLi = styled.li`
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
export default SearchLi; 