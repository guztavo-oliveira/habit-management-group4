import GroupActivities from "../../components/GroupActivities";
import ListGroups from "../../components/ListGroups";
import { Container } from "./styles";
const Dashboard = () => {
  return (
    <Container>
      <GroupActivities />
      <ListGroups />
    </Container>
  );
};
export default Dashboard;
