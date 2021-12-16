import { useEffect, useState } from "react";
import { DialogStyled } from "./styles";
import Button from "../Button";

export const ModalDialog = ({
  children,
  ele,
  msg = "fechar",
  msgButton = false,
  callback,
  fechar = true,
  setFechar,
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
      setFechar(false);
      setOpen(false)
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
        <div className={classe}>
          {children}
          {msgButton && (
            <div className="buttons">
              <Button {...rest} onClick={callback}>
                {msgButton.atualizar}
              </Button>
              {msgButton.cancelar && (
                <Button red onClick={abriModal}>
                  {msgButton.cancelar}
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogStyled>
    </>
  );
};
