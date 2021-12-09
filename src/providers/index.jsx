import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";

const Providers = ({ children }) => {
  return (
    <ModalProvider>
      <AuthProvider>{children}</AuthProvider>
    </ModalProvider>
  );
};

export default Providers;
