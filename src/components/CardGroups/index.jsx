import { Content, Container, ButtonGroup } from "./style";
import { useAuth } from "../../providers/AuthContext";
import api from "../../services/api";
import { ModalDialog } from "../ModalDialog";
import { TextField } from "@mui/material";
import Button from "../Button";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { useGroup } from "../../providers/JsonGroups";
import { useEffect, useState } from "react";

const EditGroup = ({ id, updateGroup }) => {
  const { tokenBearer } = useAuth();

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [data,setData] = useState({});


  useEffect(()=>{
    if(!!name){
      setData({...data, name: name })
    }
    if(!!category){
      setData({...data, category: category })
    }
    if(!!description){
      setData({...data, description: description })
    }
  },[name, category, description])


  const submit = () => {
          api
        .patch(`/groups/${id}/`,data, tokenBearer)
        .then((_) => {
          toast.success("Grupo atualizado com sucesso!");
          updateGroup();
          setData({});
        })
        .catch((_) =>
          toast.error("Algo deu errado ao tentar atualizar o grupo...")
        );
  
  };

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        submit();
      }}
    >
      <TextField
        onChange={(evt) => {
          setName(evt.target.value);
        }}
        value={name}
        label="name"
        variant="filled"
      />
            <TextField
        onChange={(evt) => {
          setCategory(evt.target.value);
        }}
        value={category}
        label="category"
        variant="filled"
      />
      <TextField
        onChange={(evt) => {
          setDescription(evt.target.value);
        }}
        value={description}
        label="description"
        variant="filled"
      />

      <Button type="submit" children="Atualizar" />
    </form>
  );
};

const CardGroups = ({ props, updateGroup }) => {
  const { id, tokenBearer } = useAuth();

  const { myGroups } = useGroup();

  const subscribe = () => {
    api
      .post(`/groups/${props.id}/subscribe`, tokenBearer)
      .then(() => {
        updateGroup();
        toast("Você se increveu no grupo");
      })
      .catch((err) =>
        toast("Algo deu erradoao tentar se increver no grupo...")
      );
  };

  const unsubscribe = () => {
    api
      .delete(`/groups/${props.id}/unsubscribe/`, tokenBearer)
      .then(() => {
        updateGroup();
        toast("Você saiu do grupo!");
      })
      .catch((err) => toast("Algo deu errado ao tentar sair do grupo..."));
  };

  return (
    <Container>
      <div className="container">
        <FiUser size={60} />
        <Content>
          <div>
            <h2>{props.name}</h2>
            <span> {props.category}</span>
          </div>
          <p>
            <span> Criador:</span> {props.creator.username}
          </p>
          <p>
            <span>Descrição:</span> {props.description}
          </p>
          <p>
            <span>Integrantes: </span> {props.users_on_group.length}
          </p>
        </Content>
      </div>
      <div className="containerEditar">
        {props.creator.id === id && (
          <ButtonGroup>
            <ModalDialog ele={"Editar"}>
              <EditGroup id={props.id} updateGroup={updateGroup} />
            </ModalDialog>
          </ButtonGroup>
        )}
        <ButtonGroup
          onClick={
            myGroups.some((group) => group.id === props.id)
              ? unsubscribe
              : subscribe
          }
        >
          {myGroups.some((group) => group.id === props.id)
            ? "Sair do grupo"
            : "Entrar no grupo"}
        </ButtonGroup>
      </div>
    </Container>
  );
};

export default CardGroups;
