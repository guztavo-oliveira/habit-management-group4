import { Content, Container, ButtonGroup } from "./style";
import { useAuth } from "../../providers/AuthContext";
import api from "../../services/api";
import { ModalDialog } from "../ModalDialog";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { useGroup } from "../../providers/JsonGroups";

const EditGroup = ({ id }) => {
  const { tokenBearer } = useAuth();

  const formSchema = yup.object().shape({
    description: yup.string(),
    name: yup.string(),
    category: yup.string(),
  });

  const {
    register,
    handleSubmit,
    
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const submit = (data) => {
    if (data.name === "" && data.description === "" && data.category === "") {
      toast.error("Preencha ao menos um campo para atualizar!");
    } else {
      console.log(data);
      api.patch(`/groups/${id}/`, tokenBearer).catch((err) => console.log(err));
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <TextField {...register("name")} label="name" variant="filled" />
      <TextField
        {...register("description")}
        label="description"
        variant="filled"
      />
      <TextField {...register("category")} label="category" variant="filled" />
      <Button type="submit" children="Atualizar" />
    </form>
  );
};

const CardGroups = ({ props, updateGroup }) => {
  const { id, tokenBearer } = useAuth();

  const { myGroups } = useGroup();
  
  const subscribe = () =>{
    api.post(`/groups/${props.id}/subscribe`, tokenBearer)
    .then(() => {
      updateGroup();
      toast("Você se increveu no grupo");
    })
    .catch((err) => toast("Algo deu erradoao tentar se increver no grupo..."));
  }

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
              <EditGroup id={props.id} />
            </ModalDialog>
          </ButtonGroup>
        )}
        <ButtonGroup onClick={myGroups.some((group)=> group.id === props.id) ? unsubscribe : subscribe}>{myGroups.some((group)=> group.id === props.id) ? 'Sair do grupo' : 'Entrar no grupo' }</ButtonGroup>
      </div>
    </Container>
  );
};

export default CardGroups;
