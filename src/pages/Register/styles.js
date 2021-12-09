import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--background);
  padding-top: 125px;
`;

export const InputContainer = styled.div`
  width: 300px;
  /* height: 450px; */
  margin: 0 auto;
  /* border: 2px solid chartreuse; */
  border-radius: 5px;
  background: var(--card-background);
  display: flex;
  justify-content: center;
  font-family: "Nova Round", cursive;
  box-shadow: 7px 7px 15px -9px rgba(0, 0, 0, 0.25);

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    padding: 20px;
    gap: 25px;
    /* margin-top: 50px; */
  }

  a {
    text-decoration: none;
    color: var(--light-blue);
    font-size: 18px;
  }

  h2 {
    font-family: logoFont;
  }
`;
