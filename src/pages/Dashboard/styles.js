import styled from "styled-components";
import logoPreto from "../../assets/images/simbolo-preto.png";
import logoBranco from "../../assets/images/logoBranco.svg";
import logoBrancoCompleto from "../../assets/images/logoBrancoCompleto.svg";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  flex-direction: column;

  background: rgb(52, 133, 255);
  background: linear-gradient(
    180deg,
    rgba(52, 133, 255, 1) 0%,
    rgba(84, 225, 255, 1) 100%
  );

  @media (min-width: ${({ width }) => `${width}px`}) {
    flex-direction: column;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
`;

export const ContainerHabits = styled.div`
  flex: 1;
  padding: 20px;
  height: 100%;
  max-width: 500px;
`;

export const ContainerGroups = styled.div`
  flex: 1;
  padding: 20px;
  height: 100%;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: all ease 0.5s;

  @media (min-width: ${({ width }) => `${width}px`}) {
    background: rgba(196, 196, 196, 0.01);
    box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 60px;
    transition: all ease 0.5s;

    .adjustDivModal {
      height: 36px;
      transition: all ease 0.5s;
    }
  }

  .header__icon {
    width: 36px;
    height: 36px;
  }

  .logo {
    background-image: url(${logoBranco});
    background-size: contain;
    background-repeat: no-repeat;
    width: 70px;
    height: 80px;

    @media (min-width: ${({ width }) => `${width}px`}) {
      background-image: url(${logoBrancoCompleto});
      background-size: contain;
      background-repeat: no-repeat;
      width: 240px;
      height: 80px;
    }
  }

  svg {
    font-size: 36px;
    border-radius: 50%;
    outline: 2px solid var(--white);
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
    transition: all ease 0.5s;
  }
`;

export const ContainerEditUser = styled.div`
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
