import { AuthProvider } from "./AuthContext";
import { GroupProvider } from "./JsonGroups";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <GroupProvider>{children}</GroupProvider>
    </AuthProvider>
  );
};

export default Providers;
