import { useEffect, useState } from "react";
import { DialogStyled } from "./styles.js";
import Button from "../Button";

export const ModalDialog = ({
  children,
  ele,
  msg = "fechar",
  msgButton = false,
  callback,
  fechar = true, //teste
  classe,
  icon,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const abriModal = () => {
    setOpen(!open);
  };
  useEffect(() => {
    fechar === "fechar" && abriModal()
  },[fechar])
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
      >
        {ele ? ele : icon}
      </div>
  
        <DialogStyled open={open} onClose={abriModal}>
          {children}
          {msgButton && (
            <div className="buttons">
              <Button
                {...rest}
                onClick={() => {
                  callback();
                }}
              >
                {msgButton[0]}
              </Button>
              {msgButton.includes("Cancelar") && (
                <Button red onClick={abriModal}>
                  {msgButton.find((e) => e.includes("Cancelar"))}
                </Button>
              )}
            </div>
          )}
        </DialogStyled>
    </>
  );
};
