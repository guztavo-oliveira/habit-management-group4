import { Button } from "@material-ui/core";
import { GoCheck } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Card, CardButtons, CardInfo, CardsList } from "../styles";

const OpenGoals = ({ openGoals, deleteGoal, editGoal }) => {
  return (
    <>
      <CardsList>
        {openGoals.map((item, index) => {
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
                  <GoCheck fill="#2111ff" />
                </Button>
              </CardButtons>
            </Card>
          );
        })}
      </CardsList>
    </>
  );
};

export default OpenGoals;
