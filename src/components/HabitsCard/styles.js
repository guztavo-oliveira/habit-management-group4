import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--card-background);
  border-radius: 10px;
  border: 2px solid;

  &:hover {
    cursor: pointer;
    transition: 1s ease;
  }

  > div {
    width: 100%;
    height: 120px;
    text-align: start;
    overflow: hidden;

    h4 {
      margin-bottom: 10px;
      color: var(--gray);
      font: "Inter";
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .edit {
    min-height: 100%;
    width: 60px;
    text-align: center;

    svg {
      height: 50px;
      margin: 5px 0;

      &:hover {
        transition: 1.5s ease;
      }
    }
  }

  .controls {
    color: gray;
    min-height: 100%;
    width: 70px;
    display: flex;
    flex-flow: column;
    align-items: center;

    svg {
      flex: 1;
      margin: 5px 0;
      background-color: var(--dark-blue);

      &:hover {
        transition: 1.5s ease;
      }
    }
  }
`;
