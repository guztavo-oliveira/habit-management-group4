import { useState } from "react";
import api from "../../services/api";
import { useForm, Controller } from "react-hook-form";
import Toastify from "toastify";
import { Button, TextField, Popover } from "@material-ui/core";
import { useAuth } from "../../providers/AuthContext";
import { ModalDialog } from "../ModalDialog";
import { ActivitiesContainer } from "../GroupActivities/styles";
import { useModal } from "../../providers/ModalContext";

const GroupActivities = ({ refresh, setRefresh }) => {
  const { tokenBearer, groupId, activ } = useAuth();
  const [userInput, setUserInput] = useState("");
  const { abriModal, open } = useModal();

  //const [anchorEl, setAnchorEl] = useState(null);

  /*const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const edit = open ? "simple-popover" : undefined;
  const add = open ? "simple-popover" : undefined;*/

  const { handleSubmit, control } = useForm();

  /*const getActivities = () => {
    api
      .get(`/activities/?grupo=${groupId}`)
      .then((response) => {
        setActiv(response.data.results);
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };*/

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
    <ActivitiesContainer>
      {/* <ModalDialog exibirModal={abriModal} open={open}>
        <Button onClick={abriModal}>Teste</Button>
      </ModalDialog>
      <button onClick={abriModal}>exibir modal</button>
      <ModalDialog exibirModal={abriModal2} open={open2}>
        <Button onClick={abriModal2}>modal 2 fechar</Button>
      </ModalDialog>
      <button onClick={abriModal2}>exibir modal1</button> */}
      
      {[1,2,3].map((e, ind) => (
        <ModalDialog ele={e} key={ind}>
          <Button>{e}</Button>
        </ModalDialog>
      ))}

      <ModalDialog ele={"nome botao"}>
          <ul>
            <li>limao</li>
            <li>limao</li>
            <li>limao</li>
            <li>limao</li>
            <li>limao</li>
          </ul>
      </ModalDialog>
      <ModalDialog ele={"mostrar atividades"}>
          <ul>
            <li>caminhar</li>
            <li>ler</li>
            <li>escrever</li>
            <li>limao</li>
            <li>limao</li>
          </ul>
      </ModalDialog>
      {/*<Popover
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
            </Popover>*/}
      {/* {activ.map((item) => {
        return (
          <>
            <div>{item.title}</div>
            <div>{item.realization_time}</div>
            <button onClick={() => deleteActiv(item.id)}>X</button> */}
            {/*<button onClick={handleClick}>Edit</button>
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
            </Popover>*/}
          {/* </>
        );
      })} */}
    </ActivitiesContainer>
  );
};

export default GroupActivities;
