import { createContext, useContext, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const GroupContext = createContext({});

const useGroup = () => {
  const context = useContext(GroupContext);
  return context;
};

const GroupProvider = ({ children }) => {
  const [myGroups, setMyGroups] = useState([]);
  const {tokenBearer} = useAuth()
  const updateGroup = () => {
    api
      .get("/groups/subscriptions/", tokenBearer)
      .then((response) => {
        setMyGroups(response.data);
      })
      .catch((err) => {console.log(err)});
  };

  return (
    <GroupContext.Provider
      value={{
        myGroups,
        updateGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export { GroupProvider, useGroup };
