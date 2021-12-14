import {
  Container,
  Header,
  MenuBar,
  ContainerHabits,
  ContainerGroups,
  ContainerEditUser,
} from "./styles";
import { BiUser, BiGroup } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../providers/AuthContext";
import ListGroups from "../../components/ListGroups";
import Habits from "../../components/Habits";
import { ModalPopover } from "../../components/ModalPopover";

import Button from "../../components/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [habits, setHabits] = useState(true);
  const [user, setUser] = useState({});
  const { id, tokenBearer } = useAuth();

  const getUserData = () => {
    api
      .get(`/users/${id}/`, tokenBearer)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <Header>
        <div className="header__icon">
          <BiUser />
        </div>
        <div className="content">
          <div className="username">
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
          <Profile
            username={user.username}
            email={user.email}
            getUserData={getUserData}
          />
        </div>
      </Header>
      {habits ? (
        <ContainerHabits>
          <h1>Hábitos</h1>
          <Habits />
        </ContainerHabits>
      ) : (
        <ContainerGroups>
          <h1>Groups</h1>
          <ListGroups />
        </ContainerGroups>
      )}

      <MenuBar>
        <div className="icons">
          <BiGroup onClick={() => setHabits(false)} />
          <div className="logo" />
          <BiUser onClick={() => setHabits(true)} />
        </div>
      </MenuBar>
    </Container>
  );
};
export default Dashboard;

const Profile = ({ username, email, getUserData }) => {
  const [newUser, setNewUser] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  const [fechar, setFechar] = useState(false);

  const { tokenBearer, id } = useAuth();
  const submit = () => {
    if (newUser === "" || newEmail === "") {
      return toast.error("Preencha todos os campos");
    }
    const data = {
      username: newUser || username,
      email: newEmail || email,
    };
    console.log(data, id);
    api
      .patch(`/users/${id}/`, data, tokenBearer)
      .then((response) => {
        toast.success("Usuario modificado com sucesso");
        getUserData();
        setFechar("fechar");
      })
      .catch((err) => {
        console.log(err);
        setFechar(false);
      });
  };

  return (
    <ContainerEditUser>
      <ModalPopover
        icon={<BsGear className="gear" />}
        msgButton={{
          atualizar: "Atualizar",
          cancelar: "Cancelar",
        }}
        fechar={fechar}
        setFechar={setFechar}
        callback={submit}
        classe="editUserModal"
        darkBlue
      >
        {/* {errors && toast.error(errors)} */}

        <div className="header">
          <h3>Alterar dados do usuário</h3>
        </div>

        <div className="edit">
          <TextField
            label="Nome"
            variant="outlined"
            defaultValue={username}
            onChange={(e) => setNewUser(e.target.value)}
          />
          <TextField
            label="E-mail"
            variant="outlined"
            defaultValue={email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
      </ModalPopover>
    </ContainerEditUser>
  );
};
