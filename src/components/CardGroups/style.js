import styled from "styled-components";

export const Container = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 150px;
  min-width: 300px;
  width: 30%;
  max-width: 600px;
`;

export const Content = styled.div`
    margin-left:10px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-end;
  height: 100%;

  h2 {
    color: var(--dark-blue);

    margin: 0;
  }
  p {
    margin: 0;
    color: grey;
  }
  span {
    margin: 0;
    font-weight: bold;
    color: var(--dark-blue);
  }
`;
export const ButtonGroup = styled.button`
  border: none;
  align-self: flex-end;
  height: 40px;
`;
