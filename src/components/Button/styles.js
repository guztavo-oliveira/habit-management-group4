import styled from "styled-components";

export const Container = styled.button`
  width: 100%;
  max-width: 150px;
  height: 40px;
  border-radius: 10px;
  padding: 0 10px;
  font-family: "Nova Round", cursive;
  border: none;
  font-size: 18px;
  margin: 10px 0;
  //default-color
  color: var(--white);

  //btn-red
  background-color: ${({ red }) => red && "var(--red)"};

  //btn-dark-blue
  background-color: ${({ darkBlue }) => darkBlue && "var(--dark-blue)"};

  //btn-light-blue
  background-color: ${({ lightBlue }) => lightBlue && "var(--light-blue)"};

  //btn-green
  background-color: ${({ green }) => green && "var(--green)"};

  //btn-gray-schema
  background-color: ${({ white }) => white && "var(--card-background)"};
  color: ${(props) => props.white && "var(--gray)"};

  transition: 2s both;

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }

  &:active {
    filter: brightness(0.9);
  }
`;

// import styled from "styled-components";
// export const Container = styled.button`
//   border: none;
//   padding: 15px;
//   background-color: var(--dark-blue);
//   cursor: pointer;
//   width: 100%;
//   margin-top: 24px;
//   border-radius: 2px;
//   font-family: "Nova Round", cursive;
//   color: var(--white);
//   font-size: 18px;

//   &:hover {
//     filter: brightness(1.1);
//   }
// `;
