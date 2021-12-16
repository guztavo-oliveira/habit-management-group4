import styled from "styled-components";

export const ContainerBuscar = styled.section`
  width: 95%;
  overflow-x: hidden;
  .scrollInfiniteGroups {
    margin-top: 25px;
  }
  h2{
    font-family: "Nova Round", cursive;
  }

  #scrollInfinite {
    justify-content: center;
    align-items: center;
    height: 400px;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 25px;
  }
  
  .infinite-scroll-component__outerdiv{
      width: 450px;
    }
 
`;
