import { Box } from "@material-ui/core";
import styled from "styled-components";
import groupIcon from "../../assets/images/grupo-icone.png";

export const Container = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  min-height: 150px;
  min-width: 300px;
  max-width: 600px;
  background: var(--card-background);
  border: 1px var(--light-blue) solid;
  border-radius: 10px;
  box-shadow: 0px 0px 10px var(--light-blue);

  cursor: pointer;

  .group-icon {
    width: 100px;
    height: 100px;
    background-image: url(${groupIcon});
    background-size: contain;
    background-repeat: no-repeat;
    color: var(--dark-blue);
    background-color: var(--neon-blue);
    border-radius: 10px;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .containerEditar {
    display: flex;
    align-items: center;
    height: 130px;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Content = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-end;
  height: 100%;

  h2 {
    font-family: "logoFont", sans-serif;
    color: var(--dark-blue);
    font-size: 26px;
    margin: 10px;
  }
  p {
    margin: 0;
    color: var(--gray);
  }
  span {
    margin: 0 5px;
    color: var(--light-blue);
    font-size: 16px;
  }
`;
export const ButtonGroup = styled.button`
  border: none;
  align-self: flex-end;
  height: 40px;
  font-size: 16px;
  color: var(--gray);
  margin-right: 5px;
  border-bottom: 1px solid var(--light-blue);
  background-color: transparent;
  font-family: "Nova Round", cursive;
  &:hover {
    cursor: pointer;
  }

  border: none;
  align-self: flex-end;
  height: 40px;
`;

export const ListsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
`;
