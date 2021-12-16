import { Box } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 150px;
  box-sizing: border-box;
  min-width: 290px;
  width: 100%;
  background: var(--card-background);
  border: 1px var(--light-blue) solid;
  border-radius: 10px;
  justify-content: space-between;
  box-shadow: 1px 3px 10px var(--gray);
  cursor: pointer;

  .group-icon {
    width: 50px;
    height: 50px;
    background-image: url(${(props) => props.groupIcon});
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
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-end;
  height: 100%;
  box-sizing: content-box;
  /* width: 270px; */
  width: 140px;

  h2 {
    width: 80%;
    font-family: "infoFont", sans-serif;
    color: var(--dark-blue);
    font-size: 26px;
    margin: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    width: 80%;

    margin: 0;
    color: var(--gray);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  span {
    margin: 0 5px;
    color: var(--light-blue);
    font-size: 16px;
    font-family: "infoFont", sans-serif;
  }

  @media (min-width: 1024px) {
    min-width: 100%;
  }
`;

export const ButtonGroup = styled.button`
  border: none;
  align-self: flex-end;
  height: auto;
  width: 80px;
  font-size: 16px;
  color: var(--gray);
  margin-right: 5px;
  border-bottom: 1px solid var(--light-blue);
  background-color: transparent;
  font-family: "Nova Round", cursive;
  &:hover {
    cursor: pointer;
  }
`;

export const ListsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
`;

export const ContainerOneGroup = styled.section`
  .containerEditar {
    margin-top: 25px;
    display: flex;
    justify-content: space-around;
    button {
      font-size: 14px;
      width: 130px;
    }
  }
  .containerTituloEditar {
    display: flex;
    justify-content: space-between;
    span {
      display: flex;
      align-items: center;
      width: 30%;
      justify-content: space-between;
    }
  }
  .informacoesGrupo {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    .info {
      display: flex;
      flex-direction: column;
    }
  }
  .group-icon {
    width: 50px;
    height: 50px;
    background-image: url(${(props) => props.groupIcon});
    background-size: contain;
    background-repeat: no-repeat;
    color: var(--dark-blue);
    background-color: var(--neon-blue);
    border-radius: 10px;
  }
`;

export const ContainerEditarGrupo = styled.div`
  border-radius: 15px;
  h2 {
    height: 50px;
    background: var(--dark-blue);
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: white;
  }
  .bodyEditarGrupo {
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 280px;
    justify-content: space-around;
    align-content: space-between;
    padding: 15px;
  }
  .containerEditarGrupoButtons {
    display: flex;
  }
`;

export const GroupProfileContainer = styled.div`
  .group-icon {
    width: 100px;
    height: 100px;
    background-image: url(${(props) => props.groupIcon});
    background-size: contain;
    background-repeat: no-repeat;
    color: var(--dark-blue);
    background-color: var(--neon-blue);
    border-radius: 10px;
  }
`;
