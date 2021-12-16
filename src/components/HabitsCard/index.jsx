import { Container, Controls } from "./styles";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { CgTrash } from "react-icons/cg";
import { ModalPopover } from "../ModalPopover";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHabits } from "../../providers/HabitsContext";
import SelectInput from "../SelectInput";
import { Difficulties, Frequency } from "../../utils";
import { useState } from "react";
import { useAuth } from "../../providers/AuthContext";
import api from "../../services/api";
import { toast } from "react-toastify";

const HabitsCard = ({ elemente }) => {
  //desconstruindo o elemeto que vai vir como parametro
  const { id, category, difficulty, frequency, title, how_much_achieved } =
    elemente;

  // //funções de adicionar e remover habitos vem do provider
  const { getHabits } = useHabits();

  ////modal Status
  const [cardModal, setCardModal] = useState(false);

  const [inputDifficulty, setInputDifficulty] = useState("");
  const [inputFrequency, setInputFrequency] = useState("");
  // const [inputTitle, setInputTitle] = useState("");
  // const [inputCategory, setInputCategory] = useState("");

  // const schema = yup.object().shape({
  //   title: yup.string(),
  //   category: yup.string(),
  // });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title,
      category: category,
      difficulty: difficulty,
      frequency: frequency,
    },
  });

  //fucao de editar o habito precisa do id do habito
  const editFunc = (data) => {
    const newData = {
      ...data,
      frequency: inputFrequency,
      difficulty: inputDifficulty,
    };
    console.log(data);
    editHabits(id, data);
    // setInputDifficulty("");
    // setInputFrequency("");
    // setInputTitle("");
    // setInputCategory("");
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
    } else if (value > 0) {
      const sub = {
        achieved: true,
        how_much_achieved: value - 1,
      };
      editHabits(id, sub);
    }
    getHabits();
  };

  ///token
  const { tokenBearer } = useAuth();

  //remove habit func
  const removeHabits = (id) => {
    api
      .delete(`/habits/${id}/`, tokenBearer)
      .then((_) => getHabits(), toast.success("deleted"))
      .catch((_) => console.log("error"));
  };

  //edit habit
  const editHabits = (id, data) => {
    console.log(data);
    api
      .patch(`/habits/${id}/`, data, tokenBearer)
      .then((_) => getHabits(), setCardModal("fechar"))
      .catch((_) => console.log("error"), setCardModal(false));
  };

  return (
    <Container>
      <div className="info">
        <h4>Title: {title}</h4>
        <h4>Category: {category}</h4>
        <h4>Frequency: {frequency}</h4>
      </div>

      <div className="edit">
        <ModalPopover
          icon={"Editar"}
          msgButton={{
            atualizar: "Atualizar",
            cancelar: "Cancelar",
          }}
          fechar={cardModal}
          setFechar={setCardModal}
          callback={handleSubmit(editFunc)}
          classe=""
          darkBlue
        >
          <h3>Register New Habits</h3>
          <form>
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
            <SelectInput
              label={"Difficulties"}
              options={Difficulties}
              onchange={setInputDifficulty}
              value={inputDifficulty}
            />
            <SelectInput
              label={"Frequency"}
              options={Frequency}
              onchange={setInputFrequency}
              value={inputFrequency}
            />
          </form>
        </ModalPopover>
        <CgTrash onClick={() => removeHabits(id)} />
        <h3>{how_much_achieved}</h3>
      </div>
      <Controls>
        <span onClick={() => updateAchievemente("add")}>
          <IoMdAdd />
        </span>
        <span onClick={() => updateAchievemente("sub")}>
          <IoMdRemove />
        </span>
      </Controls>
    </Container>
  );
};
export default HabitsCard;
