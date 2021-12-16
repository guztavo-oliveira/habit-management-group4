import styled from "styled-components";
import logoPreto from "../../assets/images/simbolo-preto.png";
import logoBranco from "../../assets/images/logoBranco.svg";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  background: rgb(52, 133, 255);
  background: linear-gradient(
    180deg,
    rgba(52, 133, 255, 1) 0%,
    rgba(84, 225, 255, 1) 100%
  );

  @media (min-width: ${({ width }) => `${width}px`}) {
    flex-direction: row;
  }
`;

export const ContainerColumns = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  /* height: 50px; */
  display: flex;
  align-items: center;

  @media (min-width: 800px) {
    background: rgba(196, 196, 196, 0.01);
    box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.3);
  }

  .header__icon {
    width: 36px;
    height: 36px;
  }
  .logo {
    /* background-color: var(--light-blue); */
    background-image: url(${logoBranco});
    background-size: contain;
    background-repeat: no-repeat;
    width: 70px;
    height: 86px;

    /* position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: -10px; */
  }

  svg {
    font-size: 36px;
    background-color: var(--light-blue);
    border-radius: 50%;
    color: var(--white);
    padding: 7px;
  }

  .content {
    width: 100%;
    display: flex;
    margin-left: 10px;
    justify-content: space-between;
    align-items: center;
  }

  .gear {
    background-color: var(--white);
    color: black;
    /* margin-left: 120px; */
    cursor: pointer;
  }

  .username {
    display: flex;
    flex-direction: column;
  }
`;

export const MenuBar = styled.div`
  width: 100%;
  height: 3px;
  position: fixed;
  bottom: 40px;
  background-color: var(--dark-blue);
  display: flex;
  justify-content: center;

  svg {
    font-size: 55px;
    background-color: var(--white);
    border-radius: 50%;
    color: var(--dark-blue);
    padding: 7px;
    cursor: pointer;
    outline: 3px solid var(--dark-blue);
  }

  .icons {
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
  }

  .adjustDivModal {
    height: 55px;
  }
`;

export const ContainerHabits = styled.div`
  width: 90%;
  height: 100%;
  /* border: 1px solid red; */
`;

export const ContainerGroups = styled.div`
  width: 90%;
  height: 100%;
  /* border: 1px solid red; */
`;

export const ContainerEditUser = styled.div`
  /* border: 1px solid chartreuse; */
  margin: 10px;
  border-radius: 10px;

  .header {
    display: flex;
    align-items: center;
    height: 50px;
    color: var(--white);
    background-color: var(--dark-blue);
    margin-bottom: 10px;
    border-radius: 10px 10px 0 0;

    h3 {
      font-family: "Nova round";
      margin-left: 5px;
    }
  }

  .edit {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    background-color: red;
  }

  button {
    margin-top: 10px;
    max-width: 100%;
  }
`;
