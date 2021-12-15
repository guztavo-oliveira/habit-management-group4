import styled from "styled-components";
import logoPreto from "../../assets/images/simbolo-preto.png";

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--card-background);
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
  height: 45px;
  position: fixed;
  bottom: 0;
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
    outline: 5px solid var(--dark-blue);
  }

  .icons {
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 22px;
  }

  .adjustDivModal {
    height: 55px;
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
    transform: translateX(-50%);
    left: 50%;
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
