import { Dialog } from "@material-ui/core";
import { useState } from "react";

export const ModalDialog = ({ children, ele }) => {
  const [open, setOpen] = useState(false);
  const abriModal = () => {
    setOpen(!open);
  };
  return (
    <div>
      <li onClick={abriModal}>{ele}
      {open && (
        <Dialog open={open} onClose={abriModal}>
          <div>
            Teste <span onClick={abriModal}>X</span>
          </div>
          {children}
        </Dialog>
      )}
      </li>
    </div>
  );
};
