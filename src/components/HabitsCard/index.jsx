import { Container, Controls } from "./styles";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { CgTrash } from "react-icons/cg";
import { ModalPopover } from "../ModalPopover";
import { TextField } from "@material-ui/core";
import { useHabits } from "../../providers/HabitsContext";
import SelectInput from "../SelectInput";
import { Frequency } from "../../utils";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthContext";
import api from "../../services/api";
import { toast } from "react-toastify";

const HabitsCard = ({ elemente }) => {
  //desconstruindo o elemeto que vai vir como parametro
  const { id, category, frequency, title, how_much_achieved } = elemente;

  // //funções de adicionar e remover habitos vem do provider
  const { getHabits } = useHabits();

  ////modal Status
  const [cardModal, setCardModal] = useState(false);

  //states
  const [inputTitle, setInputTitle] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [inputFrequency, setInputFrequency] = useState("");
  const [newData, setNewData] = useState({});

  useEffect(() => {
    if (inputTitle) {
      setNewData({ ...newData, title: inputTitle });
    }
    if (inputCategory) {
      setNewData({ ...newData, category: inputCategory });
    }
    if (inputFrequency) {
      setNewData({ ...newData, frequency: inputFrequency });
    }
  }, [inputTitle, inputCategory, inputFrequency]);

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
      toast.success("habit conclued");
    } else if (value > 0) {
      const sub = {
        achieved: true,
        how_much_achieved: value - 1,
      };
      editHabits(id, sub);
      toast.success("habit conclued");
    }
    getHabits();
  };

  //fucao de editar o habito precisa do id do habito
  const editFunc = () => {
    editHabits(id, newData);
    setCardModal("fechar");
    setInputTitle("");
    setInputCategory("");
    setInputFrequency("");
    setNewData({});
    toast.success("edited");
  };

  //edit habit
  const editHabits = (id, newData) => {
    api
      .patch(`/habits/${id}/`, newData, tokenBearer)
      .then((_) => {
        getHabits();
      })
      .catch((_) => toast.error("error"), setCardModal(false));
  };

  ///token
  const { tokenBearer } = useAuth();

  //remove habit func
  const removeHabits = (id) => {
    api
      .delete(`/habits/${id}/`, tokenBearer)
      .then((_) => getHabits(), toast.success("deleted"))
      .catch((_) => toast.error("error"));
  };
  // const callBack = () => {

  // }

  return (
    <Container>
      <div className="info">
        <h4>Title: {title}</h4>
        <h4>Category: {category}</h4>
        <h4>Frequency: {frequency}</h4>
      </div>

      <div className="edit">
        <ModalPopover
          icon={<p>Editar</p>}
          msgButton={{
            atualizar: "Atualizar",
            cancelar: "Cancelar",
          }}
          fechar={cardModal}
          setFechar={setCardModal}
          callback={editFunc}
          classe=""
          darkBlue
        >
          <h3>Register New Habits</h3>
          <div>
            <TextField
              id="outlined-basic"
              label="Title"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              onChange={(e) => setInputTitle(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Category"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              onChange={(e) => setInputCategory(e.target.value)}
            />
            <SelectInput
              label={"Frequency"}
              options={Frequency}
              onchange={setInputFrequency}
              value={inputFrequency}
            />
          </div>
        </ModalPopover>
        <CgTrash onClick={() => removeHabits(id)} />
        <p>{how_much_achieved}</p>
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
