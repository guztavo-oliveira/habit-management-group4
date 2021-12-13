import styled from "styled-components";
import { Popover } from "@mui/material";
export const Container = styled.div``;

export const PopoverStyled = styled(Popover)`
  .modalPerfil {
    padding: 15px;
    display: flex;
    flex-direction: column;
    button {
      background: var(--dark-blue);
      color: white;
      height: 40px;
    }
  }
`;
