import { Dialog } from "@material-ui/core";
import { useState } from "react";

export const ModalDialog = ({ children, ele , msg="fechar",msgButton , callBack}) => {
  const [open, setOpen] = useState(false);
  const abriModal = (e) => {
   
    setOpen(!open);
  };

  return (
      <div onClick={() => {setOpen(true)}}>
        {ele}
        {open && (
          <Dialog open={open} onClose={abriModal}>
            <div>
              {msg} <span onClick={abriModal}>X</span>
            </div>
            {children}
            {msgButton && <button onClick={() => {abriModal();callBack()}}>{msgButton}</button>}
          </Dialog>
        )}
      </div>
  );
};
