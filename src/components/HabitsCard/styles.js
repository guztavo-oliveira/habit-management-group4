import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--card-background);
  border-radius: 15px;
  box-shadow: 5px 5px 15px 3px rgba(0, 0, 0, 0.58);
  border: 2px solid var(--light-blue);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  /* max-width: 350px; */
  overflow: hidden;
  margin-bottom: 15px;

  svg {
    width: 28px;
    height: 28px;

    &:hover {
      cursor: pointer;
      filter: brightness(1.3);
    }
  }

  &:hover {
    cursor: pointer;
    transition: 1s ease;
  }

  .info {
    width: 100%;
    height: 100px;
    text-align: start;
    overflow: hidden;
  }

  .info > h4 {
    padding: 5px 8px;
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

  .edit {
    height: 100%;
    width: 50px;
    text-align: center;

    svg {
      height: 25px;
      margin: 12px 0;
      color: gray;

      &:hover {
        transition: 1.5s ease;
      }
    }

    &:nth-child(2) > p {
      transform: translateY(-6px);
    }
  }
`;

export const Controls = styled.div`
  height: 100px;
  width: 50px;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-left: 5px;

  span {
    width: inherit;
    height: inherit;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &:hover {
      transition: 1s ease;
      filter: brightness(0.9);
      cursor: pointer;
    }
    &:active {
      transition: 0.5s ease;
      filter: brightness(1.2);
    }
  }
  svg {
    background: var(--white);
    border-radius: 5px;
    color: var(--dark-blue);
    padding: 2px;
  }
`;
