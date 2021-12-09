import { Popover } from "@material-ui/core";
import { useState } from "react";

export const ModalPopover = ({ children, ele }) => {
  const [open, setOpen] = useState(false);
  const [alvo, setAlvo] = useState("")
  const abriModal = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };
  const selecionado = (e) => {
    setAlvo(e.currentTarget)
  }
  return (
    <div>
      <button onClick={(e) => {setOpen(true);selecionado(e)}}>{ele}</button>
        {open && (
          <Popover
          id={open && 'simple-popover'}
          open={open}
          anchorEl={alvo}
          onClose={abriModal}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div>
            Teste <span onClick={abriModal}>X</span>
          </div>
          {children}
        </Popover>
        )}
    </div>
  );
};
