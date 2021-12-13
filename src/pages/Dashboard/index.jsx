import {
  Container,
  Header,
  MenuBar,
  ContainerHabits,
  ContainerGroups,
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

const Dashboard = () => {
  const [habits, setHabits] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { id, tokenBearer } = useAuth();

  // useEffect(() => {
  const getUserData = () => {
    api
      .get(`/users/${id}/`, tokenBearer)
      .then((response) => {
        console.log(response.data);
        const { username, email } = response.data;
        setUsername(username);
        setEmail(email);
      })
      .catch((err) => console.log(err));
  };
  // getUserData();
  // }, []);

  return (
    <Container>
      <Header>
        <div className="header__icon">
          <BiUser />
        </div>
        <div className="content">
          <div className="username">
            <p>{username}</p>
            <p>{email}</p>
          </div>
          {/* <BsGear className="gear"> */}
          <ModalPopover ele={"teste"}>
            <Profile username={username} email={email} id={id} />
            {getUserData()}
          </ModalPopover>
          {/* </BsGear> */}
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

const Profile = ({ username, email }) => {
  const [newUser, setNewUser] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const { tokenBearer, id } = useAuth();

  const submit = () => {
    const data = {
      username: newUser || username,
      email: newEmail || email,
    };
    console.log(data, id);
    api
      .patch(`/users/${id}/`, tokenBearer, data)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={submit} action="#">
      {/* {errors && toast.error(errors)} */}

      <TextField
        label="Nome"
        variant="filled"
        defaultValue={username}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <TextField
        label="E-mail"
        variant="filled"
        defaultValue={email}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <Button type="submit" children="Atualizar" />
    </form>
  );
};
