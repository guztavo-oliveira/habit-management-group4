import styled from "styled-components";
import { Popover } from "@mui/material";

export const Container = styled.div``;

export const PopoverStyled = styled(Popover)`
  .MuiPopover-paper {
    border-radius: 10px;
    width: 250px;
    padding-top: 20px;

    /* @media (min-width: 800px) {
      border-radius: 10px;
    } */
  }
  .userProfile {
    background-color: var(--background);
    height: 170px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 18px;
      color: #333;
      display: flex;
      gap: 10px;
    }

    .editProfile {
      width: 100%;

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        cursor: pointer;
        height: 40px;
        font-size: 18px;
      }
    }

    .exitButton {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--red-strong);
      cursor: pointer;
      width: 100%;
      height: 40px;

      p {
        color: var(--white);

        svg {
          font-size: 24px;
        }
      }
    }
  }

  .AddActivForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1vh;
    gap: 2vh;

    .buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-direction: center;
      gap: 2vh;
    }
  }
  .AddActivForm form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 2vh;

    span {
      font-family: "infoFont", sans-serif;
      font-size: 1.2rem;
    }
    div {
      width: 100%;
    }
  }

  .EditActivForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1vh;
    gap: 2vh;

    .buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 2vh;
    }
  }

  .AddGoalForm {
    width: 100%;
    padding: 2vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .buttons {
      display: flex;
      flex-direction: row;
      gap:20px;
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 2vh;
      gap: 2vh;
    }

    form span {
      text-align: center;
      font-family: "infoFont", sans-serif;
    }
  }
  .editHabitModal {
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: var(--white);
    margin-bottom: 10px;

    h3 {
      background-color: var(--dark-blue);
      transform: translateY(-10px);
      width: 105%;
      line-height: 50px;
      text-align: center;
    }

    form {
      padding: 10px;
    }

    .buttons {
      display: flex;
      gap: 20px;
    }
  }
`;
