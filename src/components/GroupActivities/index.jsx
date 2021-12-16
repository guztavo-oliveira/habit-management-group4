import { useState } from "react";
import api from "../../services/api";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, TextField } from "@material-ui/core";
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
  AtvHeader,
  AtvTitle,
} from "../GroupGoals/styles";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";

const GroupActivities = ({ groupId, activities }) => {
  const { tokenBearer, refresh, setRefresh } = useAuth();
  const [userInput, setUserInput] = useState("");
  const [close, setClose] = useState(false);
  const { handleSubmit, control } = useForm();

  const addActiv = (data) => {
    data = { ...data, group: `${groupId}` };
    api
      .post("/activities/", data, tokenBearer)
      .then((response) => {
        toast.success("Tudo certo!", "Atividade adicionada com sucesso.");
        refresh === true ? setRefresh(false) : setRefresh(true);
        setClose("fechar");
      })
      .catch((err) => {
        toast.error("Oops!", "Se o erro persistir, faça login novamente.");
        setClose(false);
      });
  };

  const deleteActiv = (activId) => {
    api
      .delete(`/activities/${activId}/`, tokenBearer)
      .then((response) => {
        toast.success("Tudo certo!", "A atividade foi removida com sucesso.");
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        toast.error("Oops!", "Caso o erro persista, faça login novamente.");
      });
  };

  const editActiv = (activId, data) => {
    let newData = { title: data };

    api
      .patch(`activities/${activId}/`, newData, tokenBearer)
      .then((_) => {
        toast.success("A atividade foi modificada com sucesso.");
        refresh === true ? setRefresh(false) : setRefresh(true);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CardsContainer boxShadow={3}>
      <AtvHeader>
        <AtvTitle>Atividades</AtvTitle>
        <ModalPopover
          callback={handleSubmit(addActiv)}
          classe="AddActivForm"
          msgButton={{ atualizar: "Adicionar", cancelar: "cancelar" }}
          setFechar={setClose}
          fechar={close}
          ele={<AddButton variant="contained">+</AddButton>}
          darkBlue
        >
          <AddActivForm
          >
            <span>Alterar título</span>
            <Controller
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Título da atividade"
                  variant="outlined"
                  type="text"
                  sx={{ width: "100%", backgroundColor: "black" }}
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
                  helperText="Data limite"
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

          </AddActivForm>
        </ModalPopover>
      </AtvHeader>
      <CardsList>
        {activities.map((item, index) => {
          const editRequest = () =>{
            return editActiv(item.id, userInput)
          }
          return (
            <Card key={index}>
              <CardInfo>
                <h1>{item.title}</h1>
                <h2>
                  {new Date(item.realization_time).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </h2>
              </CardInfo>
              <CardButtons>
                <ModalPopover
                  callback={editRequest}
                  msgButton={{ atualizar: "atualizar", cancelar: "cancelar" }}
                  setFechar={setClose}
                  fechar={close}
                  classe="EditActivForm"
                  ele={<RiEdit2Fill fill="var(--dark-blue)" />}
                  anchorReference="anchorPosition"
                  anchorPosition={{ top: 200, left: 200 }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  darkBlue
                >
                  <EditActivForm>
                    <TextField
                      label="Editar título"
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.currentTarget.value)}
                    />

                  </EditActivForm>
                </ModalPopover>
                <Button onClick={() => deleteActiv(item.id)}>
                  <RiDeleteBin6Line fill="#ff5252" />
                </Button>
              </CardButtons>
            </Card>
          );
        })}
      </CardsList>
    </CardsContainer>
  );
};

export default GroupActivities;
