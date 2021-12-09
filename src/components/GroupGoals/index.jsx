import { useState } from "react";
import { api } from "../../services/api";
import { useForm, Controller } from "react-router-dom";
import Toastify from "toastify";
import { Button, TextField, Popover } from "@material-ui/core";
import { useAuth } from "../../providers/AuthContext";

import { GoalsContainer, AddGoalsForm } from ".";

export const GroupGoals = ({ refresh, setRefresh }) => {
  const { tokenBearer, goals, groupId } = useAuth();
  const [data, setData] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { handleSubmit, control } = useForm();

  /*const getGoals = () => {
    api
      .get(`/activities/?grupo=${groupId}`, tokenBearer)
      .then((response) => {
        setGoals(response.data.results);
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };*/

  const deleteGoal = (goalId) => {
    api
      .delete(`/goals/${goalId}`, tokenBearer)
      .then((response) => {
        Toastify.success("Tudo certo!", "Meta removida com sucesso.");
      })
      .catch((err) => {
        Toastify.error("Oops!", "Caso o erro persista, faça login novamente.");
      });
  };

  const editGoal = (goalId, achieved) => {
    achieved === false ? setData("achieved: true") : setData("achieved: false");
    api
      .patch(`goals/${goalId}`, data, tokenBearer)
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

  const addGoal = (data) => {
    api
      .post("/goals/", data, tokenBearer)
      .then((response) => {
        Toastify.success("Tudo certo!", "Meta adicionada com sucesso.");
      })
      .catch((err) => {
        Toastify.error("Oops!", "Caso o erro permaneça, faça login novamente.");
      });
  };

  return (
    <GoalsContainer>
      <Button onClick={handleClick}>+</Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <AddGoalsForm onSubmit={handleSubmit(addGoal)}>
          <Controller
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Título da atividade"
                variant="outlined"
                type="text"
                sx={{ width: "80%" }}
                {...field}
              />
            )}
            name="title"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Data limite"
                variant="outlined"
                type="datetime-local"
                required
                sx={{ width: "80%" }}
                {...field}
              />
            )}
            name="realization_time"
            control={control}
            defaultValue=""
          />
          <Button variant="contained" type="submit">
            ADICIONAR
          </Button>
        </AddGoalsForm>
      </Popover>
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
