import { Content, Container, ButtonGroup } from "./style";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthContext";
import api from "../../services/api";
import { ModalDialog } from "../ModalDialog";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { toast } from "react-toastify";
import {FiUser} from 'react-icons/fi'
const editGroup = () => () => {
  const schema = yup.object().shape({
    description: yup.string(),
    name: yup.string(),
    category: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = () => {
    api.patch(`/groups/:group_id/`);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {errors && toast.error(errors)}

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

const CardGroups = () => {
  const props = {
    id: 849,
    name: "Grupo de leitura",
    description: "Somos um grupo de leitura focado em auto ajuda.",
    category: "Grupo atualizado",
    creator: {
      id: 673,
      username: "gabriel-kenzie",
      email: "gabriel@kenzie.com.br",
    },
    users_on_group: [
      {
        id: 673,
        username: "gabriel-kenzie",
        email: "gabriel@kenzie.com.br",
      },
    ],
    goals: [],
    activities: [],
  };
  const { id } = useAuth();

  const [isIntegrant, setIsIntegrant] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  const usersQuantity = props.users_on_group.length;
  
  useEffect(() => {
    setIsIntegrant(props.users_on_group.includes((obj) => obj.id === id));
    if (props.creator.id === id) {
      setIsCreator(true);
    }
  }, []);

  const subscribe = () => {
    if (isIntegrant) {
      api.delete(`/groups/${props.id}/subscribe`);
    } else {
      api.post(`/groups/${props.id}/unsubscribe`);
    }
  };

  return (
    <Container>
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
          <span>Integrantes: </span> {usersQuantity}
        </p>
      </Content>
      {isCreator && (
        <ButtonGroup onClick={() => <ModalDialog children={editGroup} />}>
          Editar
        </ButtonGroup>
      )}
      <ButtonGroup onClick={subscribe}>
        {isIntegrant ? "Sair do grupo" : "Participar do grupo"}
      </ButtonGroup>
    </Container>
  );
};

export default CardGroups;

//selecionar imagens e renderizar de acordo com a categoria do grupo (assets, objeto contendo todas as imagens  e suas descricoes)

//requisicao para edicao do grupo (esta incrito????)
