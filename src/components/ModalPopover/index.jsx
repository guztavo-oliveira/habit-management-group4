import { Popover } from "@material-ui/core";
import { Component, useState } from "react";
import { Container } from "./styles.js";
export const ModalPopover = ({
  children,
  ele,
  msg = "enviar",
  msgButton = false,
  icon,
}) => {
  const [open, setOpen] = useState(false);
  const [alvo, setAlvo] = useState("");
  const abriModal = (e) => {
    // e.stopPropagation();
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
        <Popover
          id={open && "simple-popover"}
          open={open}
          anchorEl={alvo}
          onClose={abriModal}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="modalPopover">
            <div>
              {msg} <span onClick={abriModal}>X</span>
            </div>
            {children}
            {msgButton && <button onClick={abriModal}>{msgButton}</button>}
          </div>
        </Popover>
      )}
    </Container>
  );
};
