import styled from "styled-components";

export const Container = styled.section``;
export const ModalContainer = styled.section``;
export const Contente = styled.section`
  background-color: #eaeff5;
  /* background-color: var(--white); */
  border-radius: var(--border-radius);
  margin-bottom: var(--margin);
  align-self: stretch;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    button {
      height: 30px;
      width: 120px;
    }
  }
`;
