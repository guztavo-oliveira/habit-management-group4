import { useState, createContext, useContext } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const HabitsContext = createContext({});

const useHabits = () => {
  const context = useContext(HabitsContext);
  return context;
};

const HabitsProvider = ({ children }) => {
  const { tokenBearer } = useAuth();

  //atualiza quando entra
  const [habits, setHabits] = useState([]);

  //atualiza o state faz a requisição
  const getHabits = () => {
    api
      .get("/habits/personal/", tokenBearer)
      .then((response) => setHabits(response.data))
      .catch((error) => console.log(error));
  };

  //adicionar novo habito
  const addHabits = (data) => {
    api
      .post("/habits/", data, tokenBearer)
      .then((response) => {
        console.log("add");

        getHabits();
      })
      .catch((_) => console.log("error"));
  };

  //remover habito
  const removeHabits = (id) => {
    api
      .delete(`/habits/${id}/`, tokenBearer)
      .then((response) => {
        console.log("remove");

        getHabits();
      })
      .catch((_) => console.log("error"));
  };

  //editar habito
  const editHabits = (id, data) => {
    api
      .patch(`/habits/${id}/`, data, tokenBearer)
      .then((response) => {
        console.log(response.data);
        console.log("completed");

        getHabits();
      })
      .catch((_) => console.log("error"));
  };

  return (
    <HabitsContext.Provider
      value={{
        habits,
        setHabits,
        addHabits,
        removeHabits,
        editHabits,
        getHabits,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};

export { HabitsProvider, useHabits };
