import {
  Content,
  Container,
  ButtonGroup,
  ListsContainer,
  ContainerOneGroup,
  ContainerEditarGrupo,
  ContainerSairGrupo,
} from "./style";
import { useAuth } from "../../providers/AuthContext";
import api from "../../services/api";
import { ModalDialog } from "../ModalDialog";
import { TextField } from "@mui/material";
import Button from "../Button";
import { toast } from "react-toastify";
import { useGroup } from "../../providers/JsonGroups";
import { useEffect, useState } from "react";
import GroupActivities from "../GroupActivities";
import GroupGoals from "../GroupGoals";
import SelectInput from "../SelectInput";
import { useCategoryOptions } from "../../providers/CategoryOptions";
import groupIconDefault from "../../assets/images/grupo-icone.png";

const EditGroup = ({ groupid, updateGroup, setFechar, setAlvo }) => {
  const { categoryOptions } = useCategoryOptions();

  const { tokenBearer } = useAuth();

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const submit = () => {
    if (!(!!name && !!category && !!description)) {
      return toast.error("Algo deu errado ao tentar atualizar o grupo...");
    }
    const data = {
      name,
      description,
      category,
    };
    api
      .patch(`/groups/${groupid}/`, data, tokenBearer)
      .then((resp) => {
        toast.success("Grupo atualizado com sucesso!");
        updateGroup();
        setName("");
        setDescription("");
        setCategory("");
        setFechar("fechar");
        setAlvo(resp.data);
      })
      .catch((_) =>
        toast.error("Algo deu errado ao tentar atualizar o grupo...")
      );
  };

  return (
    <ContainerEditarGrupo>
      <h2>Editar grupo</h2>
      <div className="bodyEditarGrupo">
        <TextField
          onChange={(evt) => {
            setName(evt.target.value);
          }}
          value={name}
          label="name"
          variant="filled"
        />
        <SelectInput
          label="category"
          options={categoryOptions}
          onchange={setCategory}
          value={category}
        />

        <TextField
          onChange={(evt) => {
            setDescription(evt.target.value);
          }}
          value={description}
          label="description"
          variant="filled"
        />
        <span className="containerEditarGrupoButtons">
          <Button darkBlue onClick={() => submit()} children="Atualizar" />
          <Button red onClick={() => setFechar("fechar")}>
            Cancelar
          </Button>
        </span>
      </div>
    </ContainerEditarGrupo>
  );
};

const CardGroups = ({ group, updateGroup, setAlvo }) => {
  const { id, tokenBearer, refresh } = useAuth();
  const { myGroups } = useGroup();
  const { categoryImages } = useCategoryOptions();
  const groupIcon = categoryImages.find((item) => item.name === group.category);

  const subscribe = (e) => {
    e.stopPropagation();

    api
      .post(`/groups/${group.id}/subscribe/`, {}, tokenBearer)
      .then(() => {
        updateGroup();
        toast.success("Você se increveu no grupo");
      })
      .catch((err) =>
        toast.error("Algo deu errado ao tentar se increver no grupo...")
      );
  };

  const unsubscribe = (e) => {
    e.stopPropagation();
    api
      .delete(`/groups/${group.id}/unsubscribe/`, tokenBearer)
      .then(() => {
        updateGroup();
        toast.success("Você saiu do grupo!");
      })
      .catch((err) =>
        toast.error("Algo deu errado ao tentar sair do grupo...")
      );
  };

  return (
    <Container
      groupIcon={!!groupIcon ? groupIcon.image : groupIconDefault}
      onClick={() => {
        if (myGroups.some((item) => item.name === group.name)) {
          setAlvo(group);
        } else {
          toast.error("É necessário entrar no grupo para abrir a page...");
        }
      }}
    >
      <div className="image-button">
        <div className="group-icon" />
        <ButtonGroup
          onClick={
            myGroups.some((item) => item.id === group.id)
              ? unsubscribe
              : subscribe
          }
        >
          {myGroups.some((item) => item.id === group.id)
            ? "Sair do grupo"
            : "Entrar no grupo"}
        </ButtonGroup>
      </div>

      <Content>
        <h2>{group.name} </h2>
        <p>
          <span>Categoria: </span>
          {group.category}
        </p>

        <p>
          <span> Criador:</span> {group.creator.username}
        </p>
        <p>
          <span>Descrição:</span> {group.description}
        </p>
        <p>
          <span>Integrantes: </span> {group.users_on_group.length} membros
        </p>
      </Content>
    </Container>
  );
};

export const RenderOneGroup = ({ group, setAlvo }) => {
  const { id, tokenBearer, refresh } = useAuth();
  const { updateGroup } = useGroup();
  const [achievedGoals, setAchievedGoals] = useState([]);
  const [openGoals, setOpenGoals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [fechar, setFechar] = useState(false);

  const { categoryImages } = useCategoryOptions();
  const groupIcon = categoryImages.find((item) => item.name === group.category);

  useEffect(() => {
    api
      .get(`/groups/${group.id}/`, tokenBearer)
      .then((response) => {
        setActivities(response.data.activities);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get(`/groups/${group.id}/`, tokenBearer)
      .then((response) => {
        setAchievedGoals(
          response.data.goals.filter((e) => {
            return e.achieved === true;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .get(`/groups/${group.id}/`, tokenBearer)
      .then((response) => {
        setOpenGoals(
          response.data.goals.filter((e) => {
            return e.achieved === false;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const unsubscribe = () => {
    api
      .delete(`/groups/${group.id}/unsubscribe/`, tokenBearer)
      .then(() => {
        updateGroup();
        toast("Você saiu do grupo!");
      })
      .catch((err) => toast("Algo deu errado ao tentar sair do grupo..."));
  };
  return (
    <ContainerOneGroup
      groupIcon={!!groupIcon ? groupIcon.image : groupIconDefault}
    >
      <div className="container">
        <div className="containerTituloEditar">
          <div className="group-icon" />
          <span>
            <h2>{group.name} </h2>
          </span>

          {group.creator.id === id && (
            <ModalDialog
              ele={<Button darkBlue>Editar</Button>}
              fechar={fechar}
              setFechar={setFechar}
            >
              <EditGroup
                id={group.id}
                updateGroup={updateGroup}
                setFechar={setFechar}
                setAlvo={setAlvo}
              />
            </ModalDialog>
          )}
        </div>
        <div className="informacoesGrupo">
          <div className="info">
            <p>
              <span>Descrição:</span> {group.description}
            </p>
            <p>
              <span> Categoria:</span> {group.category}
            </p>
          </div>
          <div className="info">
            <p>
              <span> Criador:</span> {group.creator.username}
            </p>
            <p>
              <span>Integrantes: </span> {group.users_on_group.length} membros
            </p>
          </div>
        </div>

        <ListsContainer>
          <GroupActivities activities={activities} groupId={group.id} />
          <GroupGoals
            openGoals={openGoals}
            achievedGoals={achievedGoals}
            groupId={group.id}
          />
        </ListsContainer>
      </div>
      <div className="containerEditar">
        <ModalDialog
          ele={<Button red>Sair do grupo</Button>}
          fechar={fechar}
          setFechar={setFechar}
        >
          <ContainerSairGrupo>
            <h2>Voce tem certeza que deseja sair?</h2>
            <div className="ContainerSairGrupoButtons">
              <Button
                green
                onClick={() => {
                  unsubscribe();
                  setAlvo("");
                }}
              >
                Sim
              </Button>
              <Button red onClick={() => setFechar("fechar")}>
                Não
              </Button>
            </div>
          </ContainerSairGrupo>
        </ModalDialog>
        <Button green onClick={() => setAlvo("")}>
          Voltar
        </Button>
      </div>
    </ContainerOneGroup>
  );
};

export default CardGroups;
