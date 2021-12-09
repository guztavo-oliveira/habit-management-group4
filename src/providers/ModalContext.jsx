import { useState, createContext, useContext } from "react";

const ModalContext = createContext({});
const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <ModalContext.Provider
      value={{
        handleClickOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, useModal };
