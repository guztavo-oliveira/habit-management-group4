import GroupActivities from "../../components/GroupActivities";
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
    </Container>
  );
};

export default Dashboard;
