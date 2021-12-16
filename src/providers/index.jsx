import { AuthProvider } from "./AuthContext";
import { GroupProvider } from "./JsonGroups";
import { HabitsProvider } from "./HabitsContext";
import { CategoryOptionsProvider } from "./CategoryOptions";
const Providers = ({ children }) => {
  return (
    <CategoryOptionsProvider>
      <AuthProvider>
        <HabitsProvider>
          <GroupProvider>{children}</GroupProvider>
        </HabitsProvider>
      </AuthProvider>
    </CategoryOptionsProvider>
  );
};

export default Providers;
