import { Content, Container, ButtonGroup, ListsContainer } from "./style";
import { useAuth } from "../../providers/AuthContext";
import api from "../../services/api";
import { ModalDialog } from "../ModalDialog";
import { TextField, Grid } from "@mui/material";
import Button from "../Button";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { useGroup } from "../../providers/JsonGroups";
import { useEffect, useState } from "react";
import GroupActivities from "../GroupActivities";
import GroupGoals from "../GroupGoals";

const EditGroup = ({ groupid, updateGroup }) => {
  const { tokenBearer } = useAuth();

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    if (!!name) {
      setData({ ...data, name: name });
    }
    if (!!category) {
      setData({ ...data, category: category });
    }
    if (!!description) {
      setData({ ...data, description: description });
    }
  }, [name, category, description]);

  const submit = () => {
    api
      .patch(`/groups/${groupid}/`, data, tokenBearer)
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

const CardGroups = ({ group, updateGroup, setAlvo }) => {
  const { id, tokenBearer } = useAuth();
  const [visibleGroup, setVisibleGroup] = useState(false);
  const { myGroups } = useGroup();

  const subscribe = () => {
    
    api
      .post(`/groups/${group.id}/subscribe/`, {}, tokenBearer)
      .then(() => {
        updateGroup();
        toast("Você se increveu no grupo");
      })
      .catch((err) =>
        toast("Algo deu errado ao tentar se increver no grupo...")
      );
  };

  const unsubscribe = (e) => {
    e.stopPropagation()
    api
      .delete(`/groups/${group.id}/unsubscribe/`, tokenBearer)
      .then(() => {
        updateGroup();
        toast("Você saiu do grupo!");
      })
      .catch((err) => toast("Algo deu errado ao tentar sair do grupo..."));
  };

  return (
    <Container
      onClick={() => {
        !!setAlvo && setAlvo(group);
      }}
    >
      <div className="container">
        <FiUser size={60} />
        <Content>
          <div>
          </div>
          <p>
            <span> Nome:</span> {group.name}
          </p>
          <span> {group.category}</span>
          <p>
            <span> Criador:</span> {group.creator.username}
          </p>
          <p>
            <span>Descrição:</span> {group.description}
          </p>
          <p>
            <span>Integrantes: </span> {group.users_on_group.length}
          </p>
        </Content>
      </div>
      <div className="containerEditar">
        {group.creator.id === id && (
          <ButtonGroup onClick={(e) => e.stopPropagation()}>
            <ModalDialog ele={"Editar"}>
              <EditGroup id={group.id} updateGroup={updateGroup} />
            </ModalDialog>
          </ButtonGroup>
        )}
        <ButtonGroup
          onClick={myGroups.some((item) => item.id === group.id)
              ? unsubscribe
              : subscribe
          }
        >
          {myGroups.some((item) => item.id === group.id)
            ? "Sair do grupo"
            : "Entrar no grupo"}
        </ButtonGroup>
      </div>
    </Container>
  );
};

export const RenderOneGroup = ({ group, setAlvo }) => {
  const { id, tokenBearer, refresh } = useAuth();
  const { updateGroup } = useGroup();
  const [achievedGoals, setAchievedGoals] = useState([]);
  const [openGoals, setOpenGoals] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api
      .get(`/activities/?grupo=${group.id}/`, tokenBearer)
      .then((response) => {
        setActivities(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get(`/goals/?grupo=${group.id}/`, tokenBearer)
      .then((response) => {
        setAchievedGoals(
          response.data.results.filter((e) => {
            return e.achieved === true;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .get(`/goals/?grupo=${group.id}/`, tokenBearer)
      .then((response) => {
        setOpenGoals(
          response.data.results.filter((e) => {
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
    <>
      <div className="container">
        <FiUser size={60} />
        <Content>
          <div>
            <button onClick={() => setAlvo("")}>Voltar</button>
          </div>
          <p>
            <span> Nome:</span> {group.name}
          </p>
          <span> {group.category}</span>
          <p>
            <span> Criador:</span> {group.creator.username}
          </p>
          <p>
            <span>Descrição:</span> {group.description}
          </p>
          <p>
            <span>Integrantes: </span> {group.users_on_group.length}
          </p>
        </Content>
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
        {group.creator.id === id && (
          <ButtonGroup>
            <ModalDialog ele={"Editar"}>
              <EditGroup id={group.id} updateGroup={updateGroup} />
            </ModalDialog>
          </ButtonGroup>
        )}
        <ButtonGroup
          onClick={() => {
            unsubscribe();
            setAlvo("");
          }}
        >
          Sair do grupo
        </ButtonGroup>
      </div>
    </>
  );
};

export default CardGroups;
