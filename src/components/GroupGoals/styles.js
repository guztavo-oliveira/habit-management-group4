import styled from "styled-components";
import { Box, Button } from "@material-ui/core";

export const GoalsContainer = styled.div`
  width: 90%;
  height: 20%;
  border: none;
  border-radius: 5px;
  display: flex;
`;

export const AddGoalsForm = styled.form``;

export const ShowOpen = styled(Button)`
  background-color: var(--light-blue);
  font-size: 0.8rem;
  cursor: pointer;
  height: 100%;
  width: 70%;
  font-weight: bold;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
  color: var(--white);
`;

export const ShowAchieved = styled(Button)`
  background-color: var(--dark-blue);
  font-size: 0.8rem;
  cursor: pointer;
  height: 100%;
  width: 70%;
  font-weight: bold;

  text-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
  color: var(--white);
`;

export const MainButtons = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 7vh;
  padding: 1vh;
  align-items: center;
  justify-content: space-around;
  margin-top: 1vh;
`;

export const CardsContainer = styled(Box)`
  width: 100%;
  align-self: center;
  justify-self: center;
  height: 45vh;
  background-color: var(--card-background);
  display: flex;
  flex-direction: column;
  margin-bottom: 2vh;
  border-radius: 4px;
  border-bottom: 2px solid var(--dark-blue);
`;

export const Card = styled.li`
  width: 90%;
  height: 15vh;
  background-color: var(--white);
  margin-bottom: 1vh;
  margin-top: 1vh;
  -webkit-box-shadow: 1px 1px 4px 1px var(--gray);
  box-shadow: 1px 1px 4px 1px var(--gray);
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  border: 2px solid var(--dark-blue);
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  height: 100%;
  padding: 1vh;
  padding-left: 2vh;
  width: 80%;

  h1 {
    color: var(--dark-blue);
    font-size: 1.4rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "infoFont", sans-serif;
    font-weight: bold;

    //text-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
  }

  h2 {
    color: var(--gray);
    font-size: 1rem;
    line-clamp: 1;
    font-weight: lighter;
  }
  h3 {
    color: var(--light-blue);
    font-size: 1rem;
    line-clamp: 1;
  }
`;

export const CardButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 20%;
  padding: 1vh;
  gap: 2vh;
`;

export const CardsList = styled.ul`
  overflow: auto;
  height: 85%;
  margin-bottom: 1vh;
  padding-left: 2vh;
`;

export const AddButton = styled(Button)`
  background-color: var(--background);
  border: none;
  font-weight: bolder;
  color: var(--dark-blue);
  //text-shadow: 2px 2px 3px rgba(0, 0, 0, 1);
  padding: 0.8vh;
  padding-left: 0vh;
  padding-right: 0vh;
`;

export const CardsHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2vh;
`;

export const AtvHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 2vh;
`;

export const AtvTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  font-family: "titleFont", sans-serif;
  color: var(--dark-blue);
  padding-left: 20%;
`;

export const GoalTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  font-family: "titleFont", sans-serif;
  color: var(--dark-blue);
`;
