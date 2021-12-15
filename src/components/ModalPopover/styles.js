import styled from "styled-components";
import { Popover } from "@mui/material";

export const Container = styled.div``;

export const PopoverStyled = styled(Popover)`
  .MuiPopover-paper {
    border-radius: 10px 10px 0 0;
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

      h3 {
        font-family: "Nova round";
        font-size: 20px;
        margin-left: 5px;
      }
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
`;
