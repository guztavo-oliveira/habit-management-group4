import { Dialog } from "@material-ui/core";
import { useState } from "react";
import { useModal } from "../../providers/ModalContext";

export const ModalDialog = ({ children }) => {
  const { open, handleClickOpen } = useModal();

  return (
    <Dialog open={open} onClose={handleClickOpen}>
      {children}
    </Dialog>
  );
};
