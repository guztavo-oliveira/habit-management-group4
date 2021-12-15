import {
  Container,
  Header,
  MenuBar,
  ContainerHabits,
  ContainerGroups,
  ContainerEditUser,
} from "./styles";
import { BiUser, BiGroup } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { useEffect, useState, useLayoutEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../providers/AuthContext";
import ListGroups from "../../components/ListGroups";
import Habits from "../../components/Habits";
import { ModalPopover } from "../../components/ModalPopover";
import { ModalDialog } from "../../components/ModalDialog";

import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { Redirect, useHistory } from "react-router-dom";

const Dashboard = () => {
  const [habits, setHabits] = useState(true);
  const [user, setUser] = useState({});
  const [editProfile, setEditProfile] = useState(false);
  const { id, tokenBearer, signOut } = useAuth();

  const getUserData = () => {
    api
      .get(`/users/${id}/`, tokenBearer)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const history = useHistory();

  ////////////////////////////////////////////////////////// Profile

  const [newUser, setNewUser] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);

  const [fechar, setFechar] = useState(false);
  const [larguraTela] = useState(window.innerWidth)

  const submit = () => {
    if (!!newUser || !!newEmail) {
      return toast.error("Preencha todos os campos");
    }
    const data = {
      username: newUser || user.username,
      email: newEmail || user.email,
    };
    api
      .patch(`/users/${id}/`, data, tokenBearer)
      .then((response) => {
        toast.success("Usuario modificado com sucesso");
        getUserData();
        setFechar("fechar");
      })
      .catch((err) => {
        console.log(err);
        setFechar(false);
      });
  };
  console.log(larguraTela)
  //////////////////////////////////////////////////////////

  return (
    <Container>
      <button onClick={() => console.log(larguraTela)}>mostra</button>
      <Header></Header>
      {larguraTela >= 1024 ?
      <>
      <ContainerHabits>
          <h1>Hábitos</h1>
          <Habits />
        </ContainerHabits>
        <ContainerGroups>
          <h1>Groups</h1>
          <ListGroups />
        </ContainerGroups>
      </>
      
      : <>
      
      {habits ? (
        <ContainerHabits>
          <h1>Hábitos</h1>
          <Habits />
        </ContainerHabits>
      ) : (
        <ContainerGroups>
          <h1>Groups</h1>
          <ListGroups />
        </ContainerGroups>
      )}
      </>} 

      {/*Menu inferior*/}
      <MenuBar>
        <div className="icons">
          <BiGroup onClick={() => setHabits(false)} />

          {/*Editar perfil de usuário e sair */}
          <ModalPopover
            icon={<BiUser />}
            classe="userProfile"
            darkBlue
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            setFechar={setFechar}
            fechar={fechar}
          >
            <p>{user.username}</p>
            <p>{user.email}</p>

            <div className="editProfile">
              <ModalDialog
                ele={"Editar perfil"}
                msgButton={{
                  atualizar: "Atualizar",
                  cancelar: "Cancelar",
                }}
                fechar={fechar}
                setFechar={setFechar}
                callback={submit}
                classe="editUserModal"
                darkBlue
              >
                <div className="header">
                  <h3>Alterar dados do usuário</h3>
                </div>

                <div className="edit">
                  <TextField
                    label="Nome"
                    variant="outlined"
                    defaultValue={user.username}
                    onChange={(e) => setNewUser(e.target.value)}
                  />
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    defaultValue={user.email}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
              </ModalDialog>
            </div>

            <div
              id="exitButton"
              onClick={() => {
                signOut();
                
              }}
            >
              <p>Sair</p>
            </div>
          </ModalPopover>
        </div>
      </MenuBar>
    </Container>
  );
};
export default Dashboard;

// const Profile = ({ username, email, getUserData }) => {
//   const [newUser, setNewUser] = useState(username);
//   const [newEmail, setNewEmail] = useState(email);

//   const [fechar, setFechar] = useState(false);

//   const { tokenBearer, id } = useAuth();
//   const submit = () => {
//     if (newUser === "" || newEmail === "") {
//       return toast.error("Preencha todos os campos");
//     }
//     const data = {
//       username: newUser || username,
//       email: newEmail || email,
//     };
//     api
//       .patch(`/users/${id}/`, data, tokenBearer)
//       .then((response) => {
//         toast.success("Usuario modificado com sucesso");
//         getUserData();
//         setFechar("fechar");
//       })
//       .catch((err) => {
//         console.log(err);
//         setFechar(false);
//       });
//   };

//   return (
//     <ContainerEditUser>
//       <ModalDialog
//         // icon={<BsGear className="gear" />}
//         msgButton={{
//           atualizar: "Atualizar",
//           cancelar: "Cancelar",
//         }}
//         fechar={fechar}
//         setFechar={setFechar}
//         callback={submit}
//         classe="editUserModal"
//         darkBlue
//       >
//         {/* {errors && toast.error(errors)} */}

//         <div className="header">
//           <h3>Alterar dados do usuário</h3>
//         </div>

//         <div className="edit">
//           <TextField
//             label="Nome"
//             variant="outlined"
//             defaultValue={username}
//             onChange={(e) => setNewUser(e.target.value)}
//           />
//           <TextField
//             label="E-mail"
//             variant="outlined"
//             defaultValue={email}
//             onChange={(e) => setNewEmail(e.target.value)}
//           />
//         </div>
//       </ModalDialog>
//     </ContainerEditUser>
//   );
// };
