import { Container } from "./styles";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { CgTrash } from "react-icons/cg";
import { ModalPopover } from "../ModalPopover";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHabits } from "../../providers/HabitsContext";
import { useState } from "react";

const HabitsCard = ({ elemente }) => {
  //desconstruindo o elemeto que vai vir como parametro
  const { id, category, difficulty, frequency, title, how_much_achieved } =
    elemente;

  //funções de adicionar e remover habitos vem do provider
  const { removeHabits, editHabits, fechar, setFechar } = useHabits();

  const schema = yup.object().shape({
    title: yup.string().required("Required field"),
    category: yup.string().required("Required field"),
    difficulty: yup.string().required("Required field"),
    frequency: yup.string().required("Required field"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //fucao de editar o habito precisa do id do habito
  const editFunc = (data) => {
    editHabits(id, data);
    reset();
  };

  //fução de de editar habito concluido
  const updateAchievemente = (type) => {
    //acesso o how_much_achieved
    const value = how_much_achieved;

    //comparo o tipo se vai adicionar ou remover
    if (type === "add") {
      const add = {
        achieved: true,
        how_much_achieved: value + 1,
      };
      editHabits(id, add);
      console.log("add");
    } else if (value > 0) {
      const sub = {
        achieved: true,
        how_much_achieved: value - 1,
      };
      editHabits(id, sub);
    }
  };
  // const callBack = () => {

  // }

  return (
    <Container>
      <div>
        <h4>Titulo: {title}</h4>
        <h4>Categoria: {category}</h4>
        <h4>Frequencia: {frequency}</h4>
        <h4>Dificuldade: {difficulty}</h4>
      </div>

      <div className="edit">
        <ModalPopover ele={"editar"} fechar={fechar} setFechar={setFechar}>
          <h3>Register New Habits</h3>
          <form onSubmit={handleSubmit(editFunc)}>
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

            <Button type="submit">Editar</Button>
          </form>
        </ModalPopover>
        <h3>{how_much_achieved}</h3>
        <CgTrash onClick={() => removeHabits(id)} />
      </div>
      <div className="controls">
        <IoMdAdd onClick={() => updateAchievemente("add")} />
        <IoMdRemove onClick={() => updateAchievemente("sub")} />
      </div>
    </Container>
  );
};
export default HabitsCard;
