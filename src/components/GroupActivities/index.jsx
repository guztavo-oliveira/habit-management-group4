import { useState } from "react";
import { api } from "../../services/api";
import { useForm, Controller } from "react-router-dom";
import Toastify from "toastify";
import { Button, TextField, Popover } from "@material-ui/core";

import { ActivitiesContainer, EditActivForm, AddActivForm } from ".";

export const GroupActivities = ({ groupId, refresh, setRefresh }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const edit = open ? "simple-popover" : undefined;
  const add = open ? "simple-popover" : undefined;

  const [activ, setActiv] = useState([]);
  const { handleSubmit, control } = useForm();

  const getActivities = () => {
    api
      .get(`/activities/?grupo=${groupId}`)
      .then((response) => {
        setActiv(response.data.results);
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addActiv = (data) => {
    data = { ...data, group: `${groupId}` };
    api
      .post("/activities/", data, {
        headers: {
          Authorization: `Bearer: ${JSON.parse(
            localStorage.getItem("@habits:token")
          )}`,
        },
      })
      .then((response) => {
        Toastify.success("Tudo certo!", "Atividade adicionada com sucesso.");
        refresh === true ? setRefresh(false) : setRefresh(true);
      });
  };

  const deleteActiv = (activId) => {
    api
      .delete(`/activities/${activId}`, {
        headers: {
          Authorization: `Bearer: ${JSON.parse(
            localStorage.getItem("@habits:token")
          )}`,
        },
      })
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
    <ActivitiesContainer>
      <Button onClick={handleClick}>+</Button>
      <Popover
        id={add}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
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
      </Popover>
      {activ.map((item) => {
        return (
          <>
            <div>{item.title}</div>
            <div>{item.realization_time}</div>
            <button onClick={() => deleteActiv(item.id)}>X</button>
            <button onClick={handleClick}>Edit</button>
            <Popover
              id={edit}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <EditActivForm onSubmit={handleSubmit(editActiv)}>
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
                  activId={item.id}
                  control={control}
                  defaultValue=""
                />
                <Button variant="contained" type="submit">
                  SALVAR
                </Button>
              </EditActivForm>
            </Popover>
          </>
        );
      })}
    </ActivitiesContainer>
  );
};
