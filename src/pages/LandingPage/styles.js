import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(8, 246, 255, 1) 50%,
    rgba(52, 133, 255, 1) 100%
  );
`;

export const ImagemM = styled.img`
  width: 100vw;
  align-items: center;
  max-width: 320px;
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const ImagemD = styled.img`
  width: 100vw;
  align-items: center;
  max-width: 1200px;
  margin-top: 100px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const SectionB = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  @media (min-width: 1024px) {
    flex-direction: row;
    button {
      margin: 37px;
    }
  }
  button {
    width: 198px;
    border-radius: 8px;
    color: white;
    border: 2px solid #fff;
    font-size: 18px;
    background-color: #0870ff;
    &:nth-child(2) {
      background-color: #08afff;
    }
  }
`;
