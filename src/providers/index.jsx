import { AuthProvider } from "./AuthContext";
import { GroupProvider } from "./JsonGroups";
import { HabitsProvider } from "./HabitsContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <HabitsProvider>
        <GroupProvider>{children}</GroupProvider>
      </HabitsProvider>
    </AuthProvider>
  );
};

export default Providers;
