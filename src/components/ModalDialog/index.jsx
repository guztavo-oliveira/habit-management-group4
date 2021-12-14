import { useEffect, useState } from "react";
import { DialogStyled } from "./styles.js";
import Button from "../Button";

export const ModalDialog = ({
  children,
  ele,
  msg = "fechar",
  msgButton = false,
  callback,
  fechar = true,
  setFechar, //teste
  classe,
  icon,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const abriModal = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (fechar === "fechar") {
      abriModal();
      setFechar(false);
    }
  }, [fechar]);
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
