import styled from "styled-components";
import logo from "../../assets/images/simbolo-color.png";
import logoPreto from "../../assets/images/simbolo-preto.png";

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

  .header__icon {
    width: 36px;
    height: 36px;
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
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: var(--light-blue);
  display: flex;
  justify-content: center;

  svg {
    font-size: 36px;
    background-color: var(--white);
    border-radius: 50%;
    color: var(--dark-blue);
    padding: 7px;
    margin-left: 10px;
    cursor: pointer;
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
    background-image: url(${logoPreto});
    background-size: contain;
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    border-radius: 50% 50% 0 0;
    position: absolute;
    left: 100px;
    bottom: -10px;
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
