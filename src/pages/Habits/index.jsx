import { Container, ModalContainer, Contente } from "./styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHabits } from "../../providers/HabitsContext";
import { ModalDialog } from "../../components/ModalDialog";
import { Button, TextField } from "@material-ui/core";
import HabitsCard from "../../components/HabitsCard";
import { useAuth } from "../../providers/AuthContext";

const Habits = () => {
  const schema = yup.object().shape({
    title: yup.string().required("Required field"),
    category: yup.string().required("Required field"),
    difficulty: yup.string().required("Required field"),
    frequency: yup.string().required("Required field"),
    // achieved: yup.boolean().required("Required field"),
    // how_much_achieved: yup.number().required("Required field"),
    // user: yup.number().required("Required field"),
  });

  const { userId } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { habits, addHabits } = useHabits();

  const onSubmitFunc = (data) => {
    const newData = {
      ...data,
      achieved: true,
      how_much_achieved: 1,
      user: userId,
    };
    addHabits(newData);
    reset();
  };

  return (
    <Container>
      <ModalContainer>
        <h2>Habitos</h2>
        <ModalDialog ele={<h2>Adicionar habito +</h2>}>
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
            {/* <TextField
              id="outlined-basic"
              label="achieved"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              helperText={errors.achieved?.message}
              {...register("achieved")}
              error={!!errors.achieved}
            />
            <TextField
              id="outlined-basic"
              label="how_much_achieved"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              helperText={errors.how_much_achieved?.message}
              {...register("how_much_achieved")}
              error={!!errors.how_much_achieved}
            />
            <TextField
              id="outlined-basic"
              label="user"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              helperText={errors.user?.message}
              {...register("user")}
              error={!!errors.user}
            /> */}
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
