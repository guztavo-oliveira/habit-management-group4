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
import {FiUser} from 'react-icons/fi'
import { toast } from "react-toastify";
const EditGroup = () => {
  
  const formSchema = yup.object().shape({
    description: yup.string().required("Campo Obrigatório"),
    name: yup.string().required("Campo Obrigatório"),
    category: yup.string().required("Campo Obrigatório")
  });

  // description: yup.string(),
  //   name: yup.string(),
  //   category: yup.string(),
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const submit = () => {
    api.patch(`/groups/:group_id/`);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {/* {errors && toast.error(errors)} */}

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

const CardGroups = ({props,updateGroup}) => {
  const { id,tokenBearer } = useAuth();
  // const {updateGroup} = useGroup()
  // console.log(props, id, "teste")

  // const [isIntegrant, setIsIntegrant] = useState(false);

  const usersQuantity = props.users_on_group.length;
  
  // useEffect(() => {
  //   setIsIntegrant(props.users_on_group.includes((obj) => obj.id === id));
  //   if (props.creator.id === id) {
  //     setIsCreator(true);
  //   }
  // }, []);

  const unsubscribe = () => {
      // api.post(`/groups/${props.id}/subscribe`);
    // } else {
    //   api.delete(`/groups/${props.id}/unsubscribe`);
    // }
    toast("Wow so easy!")
    api.delete(`/groups/${props.id}/unsubscribe/`, tokenBearer).then(() => updateGroup()).catch(err => console.log(err))
    
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
          <span>Integrantes: </span> {usersQuantity}
        </p>
      </Content>
      </div>
      <div className="containerEditar">
      {props.creator.id === id && 
        <ButtonGroup>
          <ModalDialog ele={"Editar"}>
            <EditGroup/>
          </ModalDialog>
        </ButtonGroup>
      }
      <ButtonGroup onClick={unsubscribe}>
        Sair do grupo
      </ButtonGroup>
      </div>
    </Container>
  );
};

export default CardGroups;

//selecionar imagens e renderizar de acordo com a categoria do grupo (assets, objeto contendo todas as imagens  e suas descricoes)

//requisicao para edicao do grupo (esta incrito????)
