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

const Dashboard = () => {
  const [habits, setHabits] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { id, tokenBearer } = useAuth();

  useEffect(() => {
    api
      .get(`/users/${id}/`, tokenBearer)
      .then((response) => {
        console.log(response.data);
        const { username, email } = response.data;
        setUsername(username);
        setEmail(email);
      })
      .catch((err) => console.log(err));
  }, []);

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
          <BsGear className="gear" />
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
