import GroupActivities from "../../components/GroupActivities";
<<<<<<< HEAD
import ListGroups from "../../components/ListGroups";
import { Container } from "./styles";
const Dashboard = () => {
  return (
    <Container>
      <GroupActivities />
      <ListGroups />
=======
import ListGroups from "../../components/ListGroups"
import { Container, Header, MenuBar, ContainerHabits } from "./styles";
import { BiUser, BiGroup } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
const Dashboard = () => {
  return (
    <Container>
      <Header>
        <BiUser />
        <div className="content">
          <div className="username">
            <p>username</p>
            <p>email</p>
          </div>
          <BsGear className="gear" />
        </div>
      </Header>
      <ContainerHabits />
      {/* <GroupActivities /> */}
      {/*<ListGroups/>*/}

      <MenuBar>
        <div className="icons">
          <BiGroup />
          <div className="logo" />
          <BiUser />
        </div>
      </MenuBar>
>>>>>>> ee0f0a2dfc10d758f59d8d338614490f7971ba90
    </Container>
  );
};
export default Dashboard;
