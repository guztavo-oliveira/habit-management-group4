import { useEffect } from "react";
import { useGroup } from "../../providers/JsonGroups";

const ListGroups = () => {
  const {myGroups,updateGroup} = useGroup()
  useEffect(() => {
    updateGroup()
  },[])
  return (
    <>
      <ul>
        {myGroups.map((ele, ind) => (
          <li key={ind}>{ele.name}</li>
        ))}
      </ul>
    </>
  );
};
export default ListGroups;
