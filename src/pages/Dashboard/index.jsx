import GroupActivities from "../../components/GroupActivities";
import ListGroups from "../../components/ListGroups";
import Habits from "../Habits";

const Dashboard = () => {
  return (
    <>
      <Habits />
      <GroupActivities />
      <ListGroups />
    </>
  );
};

export default Dashboard;
