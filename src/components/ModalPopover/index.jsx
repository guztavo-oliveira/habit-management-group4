import { Popover } from "@material-ui/core";
import { useState } from "react";
import "./styles.css";
export const ModalPopover = ({
  children,
  ele,
  msg = "enviar",
  msgButton = false,
}) => {
  const [open, setOpen] = useState(false);
  const [alvo, setAlvo] = useState("");
  const abriModal = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };
  const selecionado = (e) => {
    setAlvo(e.currentTarget);
  };
  return (
    <div>
      <button
        onClick={(e) => {
          setOpen(true);
          selecionado(e);
        }}
      >
        {ele}
      </button>
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
    </div>
  );
};
