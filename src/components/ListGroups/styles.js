import styled from "styled-components";

export const Container = styled.div`
  width: 95%;
  display: flex;
  padding: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  .containerCardGroups{
    width: 450px;
  }
  background: var(--background);
  margin-bottom: 90px;
  h2{
    font-family: "Nova Round", cursive;
  }
  #scrollInfinite {
    justify-content: center;
    align-items: center;
    height: 400px;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 25px;
    overflow-x: hidden ;
  }
  .infinite-scroll-component{
      overflow-x: hidden ;
  }
  .containerPesquisa {
    width: 100%;
    overflow: hidden;
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
    width: 500px;
    height: 617px;
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
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
    #scrollInfinite {
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
    .containerPesquisa {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    /* .infinite-scroll-component__outerdiv{
      width: 450px;
    } */
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
