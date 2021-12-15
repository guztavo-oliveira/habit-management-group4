import { Button } from "@material-ui/core";
import { GoChecklist } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Card, CardButtons, CardInfo, CardsList } from "../styles";

const AchievedGoals = ({ achievedGoals, deleteGoal, editGoal }) => {
  return (
    <>
      <CardsList>
        {achievedGoals.map((item, index) => {
          return (
            <Card component="li" key={index}>
              <CardInfo>
                <h1>{item.title}</h1>
                <h2>Dificuldade: {item.difficulty}</h2>
                <h3>Feito {item.how_much_achieved} vezes.</h3>
              </CardInfo>
              <CardButtons>
                <Button onClick={() => deleteGoal(item.id)}>
                  <RiDeleteBin6Line fill="#ff5252" />
                </Button>
                <Button onClick={() => editGoal(item.id, item.achieved)}>
                  <GoChecklist fill="#2111ff" />
                </Button>
              </CardButtons>
            </Card>
          );
        })}
      </CardsList>
    </>
  );
};

export default AchievedGoals;
