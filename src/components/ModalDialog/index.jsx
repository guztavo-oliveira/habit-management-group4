import { Dialog } from "@material-ui/core";
import { useState } from "react";

export const ModalDialog = ({ children, ele , msg="fechar"}) => {
  const [open, setOpen] = useState(false);
  const abriModal = (e) => {
    e.stopPropagation();
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
          </Dialog>
        )}
      </div>
  );
};
