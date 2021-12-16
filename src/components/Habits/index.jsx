import { Container, ModalContainer, Contente } from "./styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { ModalDialog } from "../ModalDialog";
import { Button, TextField } from "@material-ui/core";
import HabitsCard from "../HabitsCard";

import { useEffect } from "react";
import { useAuth } from "../../providers/AuthContext";
import { useHabits } from "../../providers/HabitsContext";

const Habits = () => {
  const schema = yup.object().shape({
    title: yup.string().required("Required field"),
    category: yup.string().required("Required field"),
    difficulty: yup.string().required("Required field"),
    frequency: yup.string().required("Required field"),
  });

  const { id } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { habits, addHabits, fechar, setFechar } = useHabits();

  const onSubmitFunc = (data) => {
    const newData = {
      ...data,
      achieved: true,
      how_much_achieved: 1,
      user: id,
    };
    addHabits(newData);
    reset();
  };

  const { getHabits } = useHabits();

  useEffect(() => {
    getHabits();
  }, []);

  return (
    <Container>
      <ModalContainer>
        <ModalDialog ele={<h2>Adicionar habito +</h2>} fechar={fechar} setFechar={setFechar} >
          <h3>Register New Habits</h3>
          <form onSubmit={handleSubmit(onSubmitFunc)}>
            <TextField
              id="outlined-basic"
              label="Title"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              helperText={errors.title?.message}
              {...register("title")}
              error={!!errors.title}
            />
            <TextField
              id="outlined-basic"
              label="Category"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              helperText={errors.category?.message}
              {...register("category")}
              error={!!errors.category}
            />
            <TextField
              id="outlined-basic"
              label="difficulty"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              helperText={errors.difficulty?.message}
              {...register("difficulty")}
              error={!!errors.difficulty}
            />
            <TextField
              id="outlined-basic"
              label="frequency"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              helperText={errors.frequency?.message}
              {...register("frequency")}
              error={!!errors.frequency}
            />
            <Button type="submit">Add Habits</Button>
          </form>
        </ModalDialog>
      </ModalContainer>

      <Contente>
        {habits && habits.map((e, i) => <HabitsCard key={i} elemente={e} />)}
      </Contente>
    </Container>
  );
};

export default Habits;
