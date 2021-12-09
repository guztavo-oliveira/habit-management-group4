import { useState } from "react";
import { api } from "../../services/api";
import { useForm, Controller } from "react-router-dom";
import Toastify from "toastify";
import { Button, TextField, Popover } from "@material-ui/core";

import { GoalsContainer, EditGoalsForm } from ".";

export const GroupGoals = ({ groupId, refresh, setRefresh }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [goals, setGoals] = useState([]);
  const { handleSubmit, control } = useForm();

  const getGoals = () => {
    api
      .get(`/activities/?grupo=${groupId}`)
      .then((response) => {
        setGoals(response.data.results);
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteGoal = (goalId) => {
    api
      .delete(`/goals/${goalId}`, {
        headers: {
          Authorization: `Bearer: ${JSON.parse(
            localStorage.getItem("@habits:token")
          )}`,
        },
      })
      .then((response) => {
        Toastify.success("Tudo certo!", "Meta removida com sucesso.");
      })
      .catch((err) => {
        Toastify.error("Oops!", "Caso o erro persista, faça login novamente.");
      });
  };

  const editGoal = (goalId, achieved) => {
    let data = "";
    achieved === false ? (data = "achieved: true") : (data = "achieved: false");
    api
      .patch(`goals/${goalId}`, data, {
        headers: {
          Authorization: `Bearer: ${JSON.parse(
            localStorage.getItem("@habits:token")
          )}`,
        },
      })
      .then((response) => {
        data === "achieved: true"
          ? Toastify.success("Meta concluída!")
          : Toastify.success("Meta reativada.");
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <GoalsContainer>
      {goals.map((item) => {
        return (
          <>
            <div>{item.title}</div>
            <div>{item.difficulty}</div>
            <div>Feito {item.how_much_achieved} vezes.</div>
            <button onClick={() => deleteGoal(item.id)}>X</button>
            <button onClick={editGoal(item.id, item.achieved)}>
              {item.achieved === false ? "✓" : "✗"}
            </button>
          </>
        );
      })}
    </GoalsContainer>
  );
};
