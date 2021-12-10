import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext({});

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

const AuthProvider = ({ children }) => {
    const [access, setAccess] = useState(localStorage.getItem("@gestaodehabitos:access"))
    const [id, setId] = useState(localStorage.getItem("@gestaodehabitos:id"))
    const atulizarToken = () => {
      setId(localStorage.getItem("@gestaodehabitos:id") || "")
      setAccess(localStorage.getItem("@gestaodehabitos:access"))
    }
    const tokenBearer = {
      headers: {
        Authorization: `Bearer: ${access}`,
      },
    };
    console.log(access, "este e o acesso")
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
        atulizarToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
