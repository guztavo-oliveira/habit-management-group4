import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--card-background);
  margin-bottom: 90px;

  .scrollInfinite {
    justify-content: center;
    align-items: center;
    height: 400px;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    justify-content: flex-start;
    ::-webkit-scrollbar-track {
      background-color: var(--light-blue);
    }
    ::-webkit-scrollbar {
      width: 12px;
      background: blue;
    }
    ::-webkit-scrollbar-thumb {
      background: blue;
      border-radius: 15px 15px;
    }
  }

  .headerPesquisaGroups {
    display: flex;
    justify-content: space-around;
    width: 100%;
    flex-direction: column;
  }

  .meusGrupos {
    overflow-y: auto;
    height: 400px;

    ::-webkit-scrollbar-track {
      background-color: var(--light-blue);
    }
    ::-webkit-scrollbar {
      width: 12px;
      background: blue;
    }
    ::-webkit-scrollbar-thumb {
      background: blue;
      border-radius: 15px 15px;
    }
  }

  .containerCriarGrupo {
    display: flex;
    justify-content: space-between;
  }
`;
