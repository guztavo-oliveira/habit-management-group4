import { useState } from "react";
import { api } from "../../services/api";
import { useForm, Controller } from "react-router-dom";
import Toastify from "toastify";
import { Button, TextField, Grid } from "@material-ui/core";
import { useAuth } from "../../providers/AuthContext";

<<<<<<< HEAD
import { GoalsContainer, } from ".";
=======
import { AddGoalsForm } from ".";
import { ModalPopover } from "../ModalPopover";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
>>>>>>> 7db2b482472ef1d1f07df3a595ebaddaed2ebbf4

const GroupGoals = ({ groupId, goals }) => {
  const [difficultyValue, setDifficultyValue] = useState("Fácil");
  const { tokenBearer, refresh, setRefresh } = useAuth();
  const [data, setData] = useState("");

  const { handleSubmit, control } = useForm();

  const handleChange = (event, newValue) => {
    setDifficultyValue(newValue);
  };
  const deleteGoal = (goalId) => {
    api
      .delete(`/goals/${goalId}`, tokenBearer)
      .then((response) => {
        Toastify.success("Tudo certo!", "Meta removida com sucesso.");
        refresh === true ? setRefresh(false) : setRefresh(true);
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
    data = {
      ...data,
      how_much_achieved: 0,
      achieved: false,
      group: `${groupId}`,
    };
    api
      .post("/goals/", data, tokenBearer)
      .then((response) => {
        Toastify.success("Tudo certo!", "Meta adicionada com sucesso.");
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        Toastify.error("Oops!", "Caso o erro permaneça, faça login novamente.");
      });
  };

  return (
    <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
      <ModalPopover ele="Adicionar meta">
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
              <ToggleButtonGroup
                component="input"
                required
                exclusive
                value={difficultyValue}
                onChange={handleChange}
                sx={{ width: "80%" }}
                {...field}
              >
                <ToggleButton value="Fácil" key="1">
                  Fácil
                </ToggleButton>
                <ToggleButton value="Médio" key="2">
                  Médio
                </ToggleButton>
                <ToggleButton value="Difícil" key="3">
                  Difícil
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            name="difficulty"
            control={control}
            defaultValue=""
          />

          <Button variant="contained" type="submit">
            ADICIONAR
          </Button>
        </AddGoalsForm>
      </ModalPopover>
      <ul>
        {goals.map((item, index) => {
          return (
            <li key={index}>
              <div>{item.title}</div>
              <div>{item.difficulty}</div>
              <div>Feito {item.how_much_achieved} vezes.</div>
              <button onClick={() => deleteGoal(item.id)}>X</button>
              <button onClick={() => editGoal(item.id, item.achieved)}>
                {item.achieved === false ? "✓" : "✗"}
              </button>
            </li>
          );
        })}
      </ul>
    </Grid>
  );
};

export default GroupGoals;
