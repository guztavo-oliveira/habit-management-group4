import { useState, createContext, useContext } from "react";
import api from "../../services/api";
import jwt_decode from "jwt_decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@habit:token");
    const { user_id } = jwt_decode(token);
  });
};
