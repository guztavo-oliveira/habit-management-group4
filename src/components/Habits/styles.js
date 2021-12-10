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
    padding: 12px;
    margin-bottom: 10px;

    svg {
      width: 28px;
      height: 28px;

      &:hover {
        cursor: pointer;
        filter: brightness(1.3);
      }
    }
  }
`;
