import { useState, createContext, useContext } from "react";
import api from "../services/api";

const HabitsContext = createContext({});

const useHabits = () => {
  const context = useContext(HabitsContext);
  return context;
};

const HabitsProvider = ({ children }) => {
  const [access] = useState(
    JSON.parse(localStorage.getItem("@gestaodehabitos:access"))
  );

  const authorization = {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };

  //atualiza quando entra
  const [habits, setHabits] = useState(() => {
    api
      .get("/habits/personal/", authorization)
      .then((response) => setHabits(response.data))
      .catch((error) => console.log(error));
  }, []);

  //atualiza o state faz a requisição
  const getHabits = () => {
    api
      .get("/habits/personal/", authorization)
      .then((response) => setHabits(response.data))
      .catch((error) => console.log(error));
  };

  //adicionar novo habito
  const addHabits = (data) => {
    api
      .post("/habits/", data, authorization)
      .then((response) => {
        console.log(response.data);
        console.log("add");
        getHabits();
      })
      .catch((_) => console.log("error"));
  };

  //remover habito
  const removeHabits = (id) => {
    api
      .delete(`/habits/${id}/`, authorization)
      .then((response) => {
        console.log("remove");
        getHabits();
      })
      .catch((_) => console.log("error"));
  };

  //editar habito
  const editHabits = (id, data) => {
    api
      .patch(`/habits/${id}/`, data, authorization)
      .then((response) => {
        console.log(response.data);
        console.log("completed");
        getHabits();
      })
      .catch((_) => console.log("error"));
  };

  return (
    <HabitsContext.Provider
      value={{ habits, setHabits, addHabits, removeHabits, editHabits }}
    >
      {children}
    </HabitsContext.Provider>
  );
};

export { HabitsProvider, useHabits };
