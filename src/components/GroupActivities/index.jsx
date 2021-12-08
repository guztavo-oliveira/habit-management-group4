import { useState } from "react";
import { api } from "../../services/api";
import { useForm, Controller } from "react-router-dom";

import { ActivitiesContainer } from ".";

export const GroupActivities = ({ groupId, refresh, setRefresh }) => {
  const [activ, setActiv] = useState([]);
  const { handleSubmit, control } = useForm();

  const getActivities = () => {
    api
      .get(`/activities/?grupo=${groupId}`)
      .then((response) => {
        setActiv(response.data.results);
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteActiv = (id) => {
    api
      .delete(`/activities/${id}`, {
        headers: {
          Authorization: `Bearer: ${JSON.parse(
            localStorage.getItem("@Habits:token")
          )}`,
        },
      })
      .then((response) => {
        console.log("Atividade removida com sucesso");
      });
  };

  const editActiv = (id, data) => {
    api
      .patch(`activities/${id}`, data, {
        headers: {
          Authorization: `Bearer: ${JSON.parse(
            localStorage.getItem("@Habits:token")
          )}`,
        },
      })
      .then((response) => {
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ActivitiesContainer>
      {activ.map((item) => {
        return (
          <>
            <div>{item.title}</div>
            <div>{item.realization_time}</div>
            <button onClick={() => deleteActiv(item.id)}>X</button>
            <button onClick={() => editActiv()}></button>
          </>
        );
      })}
    </ActivitiesContainer>
  );
};
