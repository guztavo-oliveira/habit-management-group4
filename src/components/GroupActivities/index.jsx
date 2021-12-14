import { useState } from "react";
import api from "../../services/api";
import { useForm, Controller } from "react-hook-form";
import Toastify from "toastify";
import { Button, TextField, Grid } from "@material-ui/core";
import { useAuth } from "../../providers/AuthContext";
import { AddActivForm, EditActivForm } from "../GroupActivities/styles";
import { ModalPopover } from "../ModalPopover";
import {
  AddButton,
  Card,
  CardButtons,
  CardInfo,
  CardsContainer,
  CardsList,
  MainButtons,
} from "../GroupGoals/styles";
import { RiDeleteBin6Line } from "react-icons/ri";

const GroupActivities = ({ groupId, activities }) => {
  const { tokenBearer, refresh, setRefresh } = useAuth();
  const [userInput, setUserInput] = useState("");

  const { handleSubmit, control } = useForm();

  const addActiv = (data) => {
    data = { ...data, group: `${groupId}` };
    api
      .post("/activities/", data, tokenBearer)
      .then((response) => {
        Toastify.success("Tudo certo!", "Atividade adicionada com sucesso.");
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        Toastify.error("Oops!", "Se o erro persistir, faça login novamente.");
      });
  };

  const deleteActiv = (activId) => {
    api
      .delete(`/activities/${activId}`, tokenBearer)
      .then((response) => {
        Toastify.success(
          "Tudo certo!",
          "A atividade foi removida com sucesso."
        );
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        Toastify.error("Oops!", "Caso o erro persista, faça login novamente.");
      });
  };

  const editActiv = (activId, data) => {
    api
      .patch(`activities/${activId}`, data, {
        headers: {
          Authorization: `Bearer: ${JSON.parse(
            localStorage.getItem("@habits:token")
          )}`,
        },
      })
      .then((response) => {
        Toastify.success(
          "Tudo certo!",
          "A atividade foi modificada com sucesso."
        );
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CardsContainer boxShadow={3}>
      <MainButtons>
        <ModalPopover ele={<AddButton>ADD ATIVIDADE</AddButton>}>
          <AddActivForm onSubmit={handleSubmit(addActiv)}>
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
          </AddActivForm>
        </ModalPopover>
      </MainButtons>
      <CardsList>
        {activities.map((item, index) => {
          return (
            <Card key={index}>
              <CardInfo>
                <h1>{item.title}</h1>
                <h2>{item.realization_time}</h2>
              </CardInfo>
              <CardButtons>
                <Button onClick={() => deleteActiv(item.id)}>
                  <RiDeleteBin6Line fill="#ff5252" />
                </Button>

                <ModalPopover ele="Editar">
                  <EditActivForm>
                    <TextField
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.currentTarget.value)}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => editActiv(item.id, userInput)}
                    >
                      SALVAR
                    </Button>
                  </EditActivForm>
                </ModalPopover>
              </CardButtons>
            </Card>
          );
        })}
      </CardsList>
    </CardsContainer>
  );
};

export default GroupActivities;
