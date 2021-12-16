import { Container, ModalContainer, Contente } from "./styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@material-ui/core";
import HabitsCard from "../HabitsCard";
import { useEffect } from "react";
import { useAuth } from "../../providers/AuthContext";
import { useHabits } from "../../providers/HabitsContext";
import { Difficulties, Frequency } from "../../utils";
import { useState } from "react";
import SelectInput from "../SelectInput";
import Button from "../Button";
import { ModalDialog } from "../ModalDialog";
import api from "../../services/api";
import { toast } from "react-toastify";

const Habits = () => {
  const [difficulty, setDifficulty] = useState("");
  const [frequency, setFrequency] = useState("");
  const [cardModal, setCardModal] = useState(false);

  const { id } = useAuth();
  const { habits } = useHabits();

  const schema = yup.object().shape({
    title: yup.string().required("Required field"),
    category: yup.string().required("Required field"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      achieved: true,
      how_much_achieved: 1,
      user: id,
    },
  });

  const onSubmitFunc = (data) => {
    const newData = { ...data, difficulty, frequency };
    addHabits(newData);
    setDifficulty("");
    setFrequency("");
    reset();
  };

  const { tokenBearer } = useAuth();
  const { getHabits } = useHabits();

  const addHabits = (data) => {
    api
      .post("/habits/", data, tokenBearer)
      .then((_) => {
        setCardModal("fechar");
        getHabits();
        return toast.success("added");
      })
      .catch((_) => {
        setCardModal(false);
        return toast.error("Unexpected error");
      });
  };

  //Monta a lista de habitos
  useEffect(() => {
    getHabits();
  }, []);

  return (
    <Container>
      <ModalContainer>
        <ModalDialog
          ele={
            <div>
              <h2>Habits</h2>
              <Button darkBlue>Add new</Button>
            </div>
          }
          msgButton={{
            atualizar: "Atualizar",
            cancelar: "Cancelar",
          }}
          fechar={cardModal}
          setFechar={setCardModal}
          callback={handleSubmit(onSubmitFunc)}
          classe="editUserModal"
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
              onchange={setDifficulty}
              value={difficulty}
            />
            <SelectInput
              label={"Frequency"}
              options={Frequency}
              onchange={setFrequency}
              value={frequency}
            />
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
