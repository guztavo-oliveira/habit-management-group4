import { useState, createContext, useContext } from "react";
import jwt_decode from "jwt-decode";
import api from "../services/api";

const AuthContext = createContext({});

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const id = localStorage.getItem("@gestaodehabitos:id");
    const access = localStorage.getItem("@gestaodehabitos:access");

    if (id && access) {
      return { access, id };
    }

    return {};
  });

  const [token] = useState(
    JSON.parse(localStorage.getItem("@gestaohabitos:access"))
  );

  const tokenBearer = {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  };

  const signIn = async (data) => {
    const response = await api.post("/sessions/", data);

    const { access } = response.data;

    const { user_id } = jwt_decode(access);

    localStorage.setItem("@gestaodehabitos:id", JSON.stringify(user_id));
    localStorage.setItem("@gestaodehabitos:access", JSON.stringify(access));

    setData({ user_id, access });
  };

  const signOut = () => {
    localStorage.removeItem("@gestaodehabitos:id");
    localStorage.removeItem("@gestaodehabitos:access");

    setData({});
  };

  return (
    <AuthContext.Provider
      value={{
        access: data.access,
        id: data.id,
        signIn,
        signOut,
        tokenBearer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
