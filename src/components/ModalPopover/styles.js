import styled from "styled-components";
import { Popover } from "@mui/material";

export const Container = styled.div``;

export const PopoverStyled = styled(Popover)`
  .MuiPopover-paper {
    border-radius: 10px 10px 0 0;
  }

  h3 {
    font-family: "Nova round";
    font-size: 20px;
    margin-left: 5px;
  }

  .editUserModal {
    display: flex;
    flex-direction: column;

    display: flex;
    align-items: center;
    flex-direction: column;

    /* height: 50px; */
    color: var(--white);
    /* background-color: var(--dark-blue); */
    margin-bottom: 10px;

    &:first-child {
      color: red;
      /* background-color: var(--dark-blue); */
    }

    .header {
      display: flex;
      align-items: center;
      height: 50px;
      color: var(--white);
      background-color: var(--dark-blue);
      margin-bottom: 10px;
      width: 100%;
    }

    .edit {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 20px;
    }

    .buttons {
      display: flex;
      gap: 20px;
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
