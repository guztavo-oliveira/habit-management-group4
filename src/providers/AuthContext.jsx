import { createContext, useContext } from "react";


const AuthContext = createContext({});

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

const AuthProvider = ({ children }) => {
  const id = localStorage.getItem("@gestaodehabitos:id") || "";
  const access = localStorage.getItem("@gestaodehabitos:access") || false;

  const tokenBearer = {
    headers: {
      Authorization: `Bearer: ${access}`,
    },
  };

  

  const signOut = () => {
    localStorage.removeItem("@gestaodehabitos:id");
    localStorage.removeItem("@gestaodehabitos:access");
  };

  return (
    <AuthContext.Provider
      value={{
        access,
        id,
        tokenBearer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
