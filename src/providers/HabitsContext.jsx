import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const HabitsContext = createContext({});
const useHabits = () => {
  const context = useContext(HabitsContext);
  return context;
};
const HabitsProvider = ({ children }) => {
  //token
  const { tokenBearer } = useAuth();

  //Lista de habitos
  const [habits, setHabits] = useState([]);

  //atualiza o state faz a requisição
  const getHabits = () => {
    api
      .get("/habits/personal/", tokenBearer)
      .then((response) => setHabits(response.data))
      .catch((_) => toast.error("Unexpected error"));
  };

  return (
    <HabitsContext.Provider
      value={{
        habits,
        setHabits,
        getHabits,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};

export { HabitsProvider, useHabits };
