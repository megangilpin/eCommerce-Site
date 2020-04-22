import styled from 'styled-components'

const Container = styled.div`
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
export default Container;