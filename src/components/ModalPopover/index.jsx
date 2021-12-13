import { useState } from "react";
import { Container, PopoverStyled } from "./styles.js";

export const ModalPopover = ({
  children,
  ele,
  msg = "enviar",
  msgButton = false,
  icon,
  callback,
  classe
}) => {
  const [open, setOpen] = useState(false);
  const [alvo, setAlvo] = useState("");
  const abriModal = (e) => {
    setOpen(!open);
  };
  const selecionado = (e) => {
    setAlvo(e.currentTarget);
  };
  return (
    <Container>
      <div
        onClick={(e) => {
          setOpen(true);
          selecionado(e);
        }}
      >
        {ele ? ele : icon}
      </div>
      {open && (
        <PopoverStyled
          id={open && "simple-popover"}
          open={open}
          anchorEl={alvo}
          onClose={abriModal}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className={classe}>
            <div>
              {msg} <span onClick={abriModal}>X</span>
            </div>
            {children}
            {msgButton && <button onClick={() => {abriModal();callback()}}>{msgButton}</button>}
          </div>
        </PopoverStyled>
      )}
    </Container>
  );
};
