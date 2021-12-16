import { css, keyframes } from "styled-components";
import styled from "styled-components";
import loginLogo from "../../assets/images/login-logo.png";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--dark-blue);
  /* padding-top: 125px; */
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

// const hideScroll = keyframes`
// from, to{ overflow: hidden; }

// `;

const appearFromTop = keyframes`

  from {
    transform: translateY(-100%);
    overflow: hidden;
  }
  to {
    transform: translateY(0);
    overflow:hidden;
  }

`;

export const Bar = styled.div`
  @media (min-width: 510px) {
    width: calc(20% + 150px);
    height: 100%;
    z-index: 1;
    animation: ${appearFromTop} 1s;
    position: absolute;
    background-color: var(--card-background);
    left: 0;
  }
`;

const logoFromRight = keyframes`
  from {
    transform: translate(100%, -50%);
    opacity: 0;
    
  }
  to {
    transform: translate(-50%,-50%);
    opacity: 1;
    
  }


`;

export const LoginLogo = styled.div`
  @media (min-width: 1000px) {
    width: 55%;
    height: 55%;
    background: url(${loginLogo}) no-repeat center;
    background-size: contain;
    animation: ${logoFromRight} 1s;
    position: absolute;
    z-index: 1;
    right: 0;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 70%;
  }
`;

export const InputContainer = styled.div`
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
  border-radius: 15px;
  background: var(--background);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nova Round", cursive;
  box-shadow: 15px 15px 20px 4px rgba(0, 0, 0, 0.26);

  @media (min-width: 510px) {
    position: absolute;
    z-index: 2;
    left: 20%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    padding: 20px;
    gap: 30px;
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
