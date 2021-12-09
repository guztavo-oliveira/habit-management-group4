import styled from "styled-components";

export const Container = styled.button`
  border: none;
  padding: 15px;
  background-color: var(--dark-blue);
  cursor: pointer;
  width: 100%;
  margin-top: 24px;
  border-radius: 2px;
  font-family: "Nova Round", cursive;
  color: var(--white);
  font-size: 18px;

  &:hover {
    filter: brightness(1.1);
  }
`;
