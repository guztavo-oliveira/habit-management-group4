import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

const AuthProvider = ({ children }) => {
  const [access, setAccess] = useState(
    localStorage.getItem("@gestaodehabitos:access")
  );
  const [id, setId] = useState(
    Number(localStorage.getItem("@gestaodehabitos:id"))
  );

  const atualizarToken = () => {
    setId(Number(localStorage.getItem("@gestaodehabitos:id")));
    setAccess(localStorage.getItem("@gestaodehabitos:access"));
  };
  const tokenBearer = {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };
  const signOut = () => {
    localStorage.removeItem("@gestaodehabitos:id");
    localStorage.removeItem("@gestaodehabitos:access");
  };

  const [refresh, setRefresh] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        access,
        id,
        tokenBearer,
        atualizarToken,
        refresh,
        setRefresh,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
