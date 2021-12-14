import { useState } from "react";
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
  fechar = true, //teste
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [alvo, setAlvo] = useState("");
  const abriModal = (e) => {
    setOpen(!open);
  };
  const selecionado = (e) => {
    setAlvo(e.currentTarget);
  };
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
      {open && (
        <PopoverStyled
          id={open && "simple-popover"}
          open={open}
          anchorEl={alvo}
          onClose={abriModal}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className={classe}>
            {children}
            {msgButton && (
              <div className="buttons">
                <Button
                  {...rest}
                  onClick={() => {
                    callback();
                    fechar && abriModal();
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
          </div>
        </PopoverStyled>
      )}
    </Container>
  );
};
