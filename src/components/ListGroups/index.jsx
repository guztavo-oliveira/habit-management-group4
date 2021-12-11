import { useEffect } from "react";
import { useGroup } from "../../providers/JsonGroups";
import CardGroups from "../CardGroups";
import { Container } from "./styles";
const ListGroups = () => {
    const { myGroups, updateGroup } = useGroup();
    useEffect(() => {
      updateGroup();
    }, []);

  return (
    <Container>
      <ul>
        {myGroups.map((ele, ind) => (
          <CardGroups props={ele} updateGroup={updateGroup} key={ind} />
        ))}
      </ul>

    </Container>
  );
};
export default ListGroups;
