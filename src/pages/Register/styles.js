import { css, keyframes } from "styled-components";
import styled from "styled-components";
import registerLogo from "../../assets/images/register-logo.png";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--dark-blue);
  padding-top: 125px;
  position: relative;
`;

const appearFromTop = keyframes`

  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }

`;

export const Bar = styled.div`
  @media (min-width: 510px) {
    width: 40%;
    height: 100%;
    z-index: 1;
    animation: ${appearFromTop} 1s;
    position: absolute;
    background-color: #eaeff5;
    right: 0;
  }
`;

const logoFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity:1;
  }


`;

export const RegisterLogo = styled.div`
  @media (min-width: 1000px) {
    width: 40%;
    height: 40%;
    background: url(${registerLogo}) no-repeat center;
    background-size: contain;
    animation: ${logoFromLeft} 1s;
    position: absolute;
    z-index: 1;
    top: 210px;
  }
`;

export const InputContainer = styled.div`
  width: 90%;
  max-width: 415px;
  margin: 0 auto;
  border-radius: 15px;
  background: var(--background);
  display: flex;
  justify-content: center;
  font-family: "Nova Round", cursive;
  box-shadow: -15px 15px 20px rgba(0, 0, 0, 0.25);

  @media (min-width: 510px) {
    position: absolute;
    z-index: 2;
    right: 20%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    padding: 20px;
    gap: 15px;
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
