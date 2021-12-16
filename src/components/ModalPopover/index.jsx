import { useEffect, useState } from "react";
import { Container, PopoverStyled } from "./styles.js";
import Button from "../Button";

export const ModalPopover = ({
  children,
  ele,
  msg = "enviar",
  msgButton = false,
  icon,
  callback,
  classe,
  fechar = true,
  setFechar,
  transformOrigin, //altera a posição do modal
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  },
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [alvo, setAlvo] = useState("");
  const abriModal = () => {
    setOpen(!open);
  };
  const selecionado = (e) => {
    setAlvo(e.currentTarget);
  };
  useEffect(() => {
    if (fechar === "fechar") {
      setFechar(false);
      setOpen(false)
    }
  }, [fechar]);

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

      <PopoverStyled
        id={open && "simple-popover"}
        open={open}
        anchorEl={alvo}
        onClose={abriModal}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <div className={classe}>
          {children}
          {msgButton && (
            <div className="buttons">
              <Button
                {...rest}
                onClick={() => {
                  callback();
                }}
              >
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
      </PopoverStyled>
    </Container>
  );
};
