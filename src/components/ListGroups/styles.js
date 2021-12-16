import styled from "styled-components";

export const Container = styled.div`
  width: 95%;
  display: flex;
  padding: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: var(--background);
  margin-bottom: 90px;

  .scrollInfinite {
    justify-content: center;
    align-items: center;
    height: 400px;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 25px;
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
    margin-top: 20px;
    width: 100%;
  }

  .containerCriarGrupo {
    display: flex;
    justify-content: space-between;
  }
  .inputCriarGrupo {
    width: 95%;
  }
  @media (min-width: 1024px) {
    width: 550px;
    height: 70vh;
    display: flex;
    overflow-y: auto;
    justify-content: flex-start;
    .meusGrupos {
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
    .scrollInfinite {
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
  }
`;
export const ModalCriarGrupo = styled.div`
  h2 {
    height: 50px;
    background: var(--dark-blue);
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: white;
  }
  .bodyModalCriarGrupo {
    padding: 15px;
    min-width: 300px;
    height: 310px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .containerCriarGrupoButtons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
