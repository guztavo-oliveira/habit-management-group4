import { useState } from "react";
import api from "../../services/api";
import { useForm, Controller } from "react-hook-form";
import Toastify from "toastify";
import { Button, TextField, Grid } from "@material-ui/core";
import { useAuth } from "../../providers/AuthContext";
import { ModalDialog } from "../ModalDialog";
import { AddActivForm, EditActivForm } from "../GroupActivities/styles";
import { ModalPopover } from "../ModalPopover";

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
    <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
      <ModalDialog ele="Adicionar atividade">
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
      </ModalDialog>
      <ul>
        {activities.map((item, index) => {
          return (
            <li key={index}>
              <div>{item.title}</div>
              <div>{item.realization_time}</div>
              <button onClick={() => deleteActiv(item.id)}>X</button>

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
            </li>
          );
        })}
      </ul>
    </Grid>
  );
};

export default GroupActivities;
