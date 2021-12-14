import styled from "styled-components";

export const Container = styled.section``;
export const ModalContainer = styled.section`
  div {
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    button {
      height: 30px;
      width: 120px;
    }
  }
`;
export const Contente = styled.section`
  background-color: var(--white);
  border-radius: var(--border-radius);
  margin-bottom: var(--margin);
  align-self: stretch;
  padding-bottom: 30px;
`;
