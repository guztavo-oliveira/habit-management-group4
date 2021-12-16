import { useState } from "react";
import api from "../../services/api";
import { useForm, Controller } from "react-hook-form";
import Toastify from "toastify";
import { Button, TextField } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useAuth } from "../../providers/AuthContext";
import {
  AddButton,
  AddGoalsForm,
  MainButtons,
  ShowOpen,
  ShowAchieved,
  CardsContainer,
  CardsHeader,
  GoalTitle,
} from "./styles";
import { ModalPopover } from "../ModalPopover";
import OpenGoals from "./OpenGoals";
import AchievedGoals from "./AchievedGoals";

const GroupGoals = ({ groupId, openGoals, achievedGoals }) => {
  const [difficultyValue, setDifficultyValue] = useState("Fácil");
  const { tokenBearer, refresh, setRefresh } = useAuth();
  const [data, setData] = useState("");
  const [alternate, setAlternate] = useState(true);
  const { handleSubmit, control } = useForm();

  const handleAlternate = () => {
    alternate === true ? setAlternate(false) : setAlternate(true);
  };
  const handleChange = (event, newValue) => {
    setDifficultyValue(newValue);
  };
  const deleteGoal = (goalId) => {
    api
      .delete(`/goals/${goalId}/`, tokenBearer)
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
      .patch(`goals/${goalId}/`, data, tokenBearer)
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
    <CardsContainer boxShadow={3}>
      <CardsHeader>
        <GoalTitle>Metas</GoalTitle>
        <MainButtons>
          {alternate === true ? (
            <ShowAchieved variant="contained" onClick={handleAlternate}>
              METAS CONCLUÍDAS
            </ShowAchieved>
          ) : (
            <ShowOpen variant="contained" onClick={handleAlternate}>
              METAS ATUAIS
            </ShowOpen>
          )}
          <ModalPopover ele={<AddButton variant="contained">+</AddButton>}>
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
        </MainButtons>
      </CardsHeader>
      {alternate === true ? (
        <OpenGoals
          openGoals={openGoals}
          handleAlternate={handleAlternate}
          editGoal={editGoal}
          deleteGoal={deleteGoal}
        />
      ) : (
        <AchievedGoals
          achievedGoals={achievedGoals}
          handleAlternate={handleAlternate}
          editGoal={editGoal}
          deleteGoal={deleteGoal}
        />
      )}
    </CardsContainer>
  );
};

export default GroupGoals;
