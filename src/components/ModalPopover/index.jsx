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
  fechar = true, //teste
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [alvo, setAlvo] = useState("");
  const abriModal = () => {
    setOpen(!open);
    console.log(open);
  };
  const selecionado = (e) => {
    setAlvo(e.currentTarget);
  };
  useEffect(() => {
    fechar === "fechar" && abriModal();
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
    </Container>
  );
};
