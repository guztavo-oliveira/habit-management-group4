import styled from "styled-components";
import { Popover } from "@mui/material";

export const Container = styled.div``;

export const PopoverStyled = styled(Popover)`
  .MuiPopover-paper {
    border-radius: 10px 10px 0 0;
  }
  .userProfile {
    background-color: var(--background);
    height: 170px;
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      font-size: 18px;
      color: #333;
      margin: 0 0 5px 5px;
      padding: 5px 0;
    }

    #exitButton {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: red;
      cursor: pointer;
      p {
        margin: 0;
        color: var(--white);
      }
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
