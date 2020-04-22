import styled from 'styled-components'

const SearchInput = styled.input`
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
export default SearchInput; 