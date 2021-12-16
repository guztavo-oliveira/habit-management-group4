import styled from "styled-components";

export const Container = styled.section`
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.58);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-self: stretch;
  padding: 20px;
`;

export const Contente = styled.section`
  /* background-color: var(--white);
  border-radius: 10px;
  box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.58);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-self: stretch; */
`;

export const ModalContainer = styled.section`
  > div {
    border-radius: 10px;
    margin-bottom: 10px;
    border: 2px solid;
    text-align: right;

    button {
      display: inline;
      height: 30px;
      width: 120px;
    }
  }
`;
