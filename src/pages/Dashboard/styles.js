import styled from "styled-components";
import logo from "../../assets/images/login-logo.png";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 90%;
  height: 50px;

  margin-top: 10px;
  display: flex;
  align-items: center;

  svg {
    font-size: 36px;
    background-color: var(--light-blue);
    border-radius: 50%;
    color: var(--white);
    padding: 7px;
    margin-left: 10px;
  }

  .content {
    display: flex;
    margin-left: 10px;
  }

  .gear {
    background-color: var(--white);
    color: black;
    margin-left: 120px;
    cursor: pointer;
  }

  .username {
    display: flex;
    flex-direction: column;
  }
`;

export const MenuBar = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: var(--light-blue);
  display: flex;
  justify-content: center;

  svg {
    font-size: 36px;
    background-color: var(--dark-blue);
    border-radius: 50%;
    color: var(--white);
    padding: 7px;
    margin-left: 10px;
  }

  .icons {
    height: 100%;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    background-color: var(--light-blue);
    width: 100px;
    height: 100px;
    border-radius: 50% 50% 0 0;
  }
`;

export const ContainerHabits = styled.div`
  width: 90%;
  height: 100%;
  border: 1px solid red;
`;
