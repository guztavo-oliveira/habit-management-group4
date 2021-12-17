import {
  Container,
  Header,
  MenuBar,
  ContainerHabits,
  ContainerGroups,
  ContainerEditUser,
  Wrapper,
} from "./styles";
import { BiUser, BiGroup } from "react-icons/bi";
import { GoHome, GoPerson, GoSearch } from "react-icons/go";
import { MdOutlineExitToApp } from "react-icons/md";
import { useEffect, useState, useLayoutEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../providers/AuthContext";
import ListGroups from "../../components/ListGroups";
import Habits from "../../components/Habits";
import { ModalPopover } from "../../components/ModalPopover";
import { ModalDialog } from "../../components/ModalDialog";

import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import SearchGroups from "../../components/SearchGroups";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [choose, setChoose] = useState("home");

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

  ////////////////////////////////////////////////////////// Profile

  const [newUser, setNewUser] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);

  const [fechar, setFechar] = useState(false);
  const [larguraTela] = useState(window.innerWidth);

  const submit = () => {
    if (!!!newUser || !!!newEmail) {
      return toast.error("Preencha todos os campos");
    }
    const data = {
      username: newUser || user.username,
      email: newEmail || user.email,
    };
    api
      .patch(`/users/${id}/`, data, tokenBearer)
      .then((_) => {
        toast.success("Usuario modificado com sucesso");
        getUserData();
        setFechar("fechar");
      })
      .catch((err) => {
        console.log(err);
        setFechar(false);
      });
  };
  //////////////////////////////////////////////////////////

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  function ShowWindowDimensions(props) {
    return useWindowSize();
  }

  const [width] = ShowWindowDimensions();
  const resize = 800;

  return (
    <>
      {width >= resize ? (
        <Container width={resize}>
          <Header width={resize}>
            <div className="logo" />
            <div className="adjustDivModal">
              <ModalPopover
                icon={<BiUser />}
                classe="userProfile"
                darkBlue
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                anchorOrigin={{
                  vertical: "bottom",
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
                  className="exitButton"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <p>
                    Sair <MdOutlineExitToApp />
                  </p>
                </div>
              </ModalPopover>
            </div>
          </Header>
          <Wrapper>
            <ContainerHabits>
              <Habits />
            </ContainerHabits>
            <ContainerGroups>
              <ListGroups />
            </ContainerGroups>
          </Wrapper>
        </Container>
      ) : (
        <Container>
          <Header width={resize}>
            <div className="logo" />
          </Header>
          {(choose.includes("home") && (
            <ContainerHabits>
              <h1>Hábitos</h1>
              <Habits />
            </ContainerHabits>
          )) ||
            (choose.includes("groups") && (
              <ContainerGroups>
                <ListGroups />
              </ContainerGroups>
            )) ||
            (choose.includes("search") && <SearchGroups />)}

          {/*Menu inferior*/}
          <MenuBar>
            <div className="icons">
              <GoHome
                onClick={() => {
                  setChoose("home");
                }}
              />

              <GoSearch
                onClick={() => {
                  setChoose("search");
                }}
              />

              <BiGroup onClick={() => setChoose("groups")} />

              {/*Editar perfil de usuário e sair */}
              <div className="adjustDivModal">
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
                    className="exitButton"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <p>
                      Sair <MdOutlineExitToApp />
                    </p>
                  </div>
                </ModalPopover>
              </div>
            </div>
          </MenuBar>
        </Container>
      )}
    </>
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
