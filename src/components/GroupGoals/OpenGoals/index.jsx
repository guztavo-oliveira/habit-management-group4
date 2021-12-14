import { Button } from "@material-ui/core";

const AchievedGoals = ({
  openGoals,
  handleAlternate,
  deleteGoal,
  editGoal,
}) => {
  return (
    <>
      <Button onClick={handleAlternate}>Metas concluídas</Button>
      <ul>
        {openGoals.map((item, index) => {
          return (
            <li key={index}>
              <div>{item.title}</div>
              <div>{item.difficulty}</div>
              <div>Feito {item.how_much_achieved} vezes.</div>
              <Button onClick={() => deleteGoal(item.id)}>X</Button>
              <Button onClick={() => editGoal(item.id, item.achieved)}>
                ✓
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AchievedGoals;
